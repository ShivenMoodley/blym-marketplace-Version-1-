
import { Database } from '@/integrations/supabase/types';

// Extend the profile type to include role and user_type
export interface ExtendedProfile extends Database['public']['Tables']['profiles']['Row'] {
  role?: 'user' | 'admin';
  user_type?: 'buyer' | 'seller';
}

// Define seller submission type
export interface SellerSubmission {
  id: string;
  user_id: string;
  email: string;
  listing_type: 'standard' | 'premium';
  payment_status: string;
  business_name: string;
  business_category: string;
  revenue: string;
  profit: string;
  asking_price: string;
  summary: string;
  uploaded_docs: any[];
  listing_status: 'Draft' | 'Under Review' | 'Approved' | 'Rejected' | 'Published';
  assigned_admin: string | null;
  form_data: any;
  created_at: string;
  updated_at: string;
}
