
-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_type TEXT NOT NULL CHECK (user_type IN ('buyer', 'seller')),
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view and update their own profile
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
  
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create seller_submissions table
CREATE TABLE IF NOT EXISTS public.seller_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  listing_type TEXT CHECK (listing_type IN ('standard', 'premium')),
  payment_status TEXT DEFAULT 'Not Required',
  business_name TEXT,
  business_category TEXT,
  revenue TEXT,
  profit TEXT,
  asking_price TEXT,
  summary TEXT,
  uploaded_docs JSONB,
  listing_status TEXT DEFAULT 'Draft' CHECK (listing_status IN ('Draft', 'Under Review', 'Approved', 'Rejected', 'Published')),
  assigned_admin TEXT,
  form_data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security for seller_submissions
ALTER TABLE public.seller_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for seller submissions
CREATE POLICY "Users can view their own submissions" ON public.seller_submissions
  FOR SELECT USING (auth.uid() = user_id);
  
CREATE POLICY "Users can update their own submissions" ON public.seller_submissions
  FOR UPDATE USING (auth.uid() = user_id);
  
CREATE POLICY "Users can insert their own submissions" ON public.seller_submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policy for admins to view all submissions
CREATE POLICY "Admins can view all submissions" ON public.seller_submissions
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));
  
-- Create policy for admins to update all submissions
CREATE POLICY "Admins can update all submissions" ON public.seller_submissions
  FOR UPDATE USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Function to create a profile for new users
CREATE OR REPLACE FUNCTION public.create_profile_for_user(
  user_id UUID,
  user_type TEXT
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.profiles (id, user_type)
  VALUES (user_id, user_type);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
