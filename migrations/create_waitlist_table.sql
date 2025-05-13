
-- Create waitlist table
CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  interest TEXT NOT NULL CHECK (interest IN ('buying', 'selling', 'financing')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add comment to table
COMMENT ON TABLE public.waitlist IS 'Table to store waitlist registrations';
