
import { supabase } from '@/integrations/supabase/client';
import { SellerSubmission } from '@/types/app';

/**
 * Helper function to access the seller_submissions table
 * This works around TypeScript limitations by using type assertions
 */
export const sellerSubmissionsTable = {
  select: () => {
    return supabase
      .from('seller_submissions')
      .select('*') as unknown as ReturnType<typeof supabase.from>['select'];
  },
  
  insert: (data: Partial<SellerSubmission>) => {
    return supabase
      .from('seller_submissions')
      .insert(data as any);
  },
  
  update: (data: Partial<SellerSubmission>) => {
    return supabase
      .from('seller_submissions')
      .update(data as any);
  },
  
  upsert: (data: Partial<SellerSubmission>) => {
    return supabase
      .from('seller_submissions')
      .upsert(data as any);
  }
};
