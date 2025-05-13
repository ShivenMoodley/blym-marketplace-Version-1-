
import { supabase } from '@/integrations/supabase/client';
import { SellerSubmission } from '@/types/app';

/**
 * Type-safe wrapper for Supabase operations that works around TypeScript limitations
 * by using type assertions for tables not defined in the generated types
 */
export const supabaseHelper = {
  /**
   * Access any table in the Supabase database with proper type casting
   */
  from: (table: string) => ({
    select: (columns = '*') => {
      return supabase.from(table as any).select(columns);
    },
    insert: (data: any) => {
      return supabase.from(table as any).insert(data);
    },
    update: (data: any) => {
      return supabase.from(table as any).update(data);
    },
    upsert: (data: any) => {
      return supabase.from(table as any).upsert(data);
    },
    delete: () => {
      return supabase.from(table as any).delete();
    }
  }),
  
  /**
   * Specifically typed helper for seller_submissions table
   */
  sellerSubmissions: {
    select: () => {
      return supabase.from('seller_submissions' as any).select('*');
    },
    
    insert: (data: Partial<SellerSubmission>) => {
      return supabase.from('seller_submissions' as any).insert(data);
    },
    
    update: (data: Partial<SellerSubmission>) => {
      return supabase.from('seller_submissions' as any).update(data);
    },
    
    upsert: (data: Partial<SellerSubmission>) => {
      return supabase.from('seller_submissions' as any).upsert(data);
    }
  }
};
