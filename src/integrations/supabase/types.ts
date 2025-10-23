export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_activity_logs: {
        Row: {
          action_type: string
          admin_user_id: string
          created_at: string
          id: string
          new_values: Json | null
          notes: string | null
          old_values: Json | null
          target_id: string | null
          target_table: string | null
        }
        Insert: {
          action_type: string
          admin_user_id: string
          created_at?: string
          id?: string
          new_values?: Json | null
          notes?: string | null
          old_values?: Json | null
          target_id?: string | null
          target_table?: string | null
        }
        Update: {
          action_type?: string
          admin_user_id?: string
          created_at?: string
          id?: string
          new_values?: Json | null
          notes?: string | null
          old_values?: Json | null
          target_id?: string | null
          target_table?: string | null
        }
        Relationships: []
      }
      business_details: {
        Row: {
          business_id: string
          created_at: string
          description: string
          id: string
          ideal_buyer_profile: string | null
          post_sale_support: string
          reason_for_selling: string
          updated_at: string
        }
        Insert: {
          business_id: string
          created_at?: string
          description: string
          id?: string
          ideal_buyer_profile?: string | null
          post_sale_support: string
          reason_for_selling: string
          updated_at?: string
        }
        Update: {
          business_id?: string
          created_at?: string
          description?: string
          id?: string
          ideal_buyer_profile?: string | null
          post_sale_support?: string
          reason_for_selling?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_details_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      business_documents: {
        Row: {
          admin_notes: string | null
          business_id: string
          created_at: string
          document_type: string
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          verification_status: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          admin_notes?: string | null
          business_id: string
          created_at?: string
          document_type: string
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          verification_status?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          admin_notes?: string | null
          business_id?: string
          created_at?: string
          document_type?: string
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          verification_status?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_documents_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      business_metrics: {
        Row: {
          business_id: string
          created_at: string
          customer_type: string | null
          id: string
          inventory_asset_value: number | null
          monthly_profit: number
          monthly_revenue: number
          owner_involvement: string
          updated_at: string
        }
        Insert: {
          business_id: string
          created_at?: string
          customer_type?: string | null
          id?: string
          inventory_asset_value?: number | null
          monthly_profit: number
          monthly_revenue: number
          owner_involvement: string
          updated_at?: string
        }
        Update: {
          business_id?: string
          created_at?: string
          customer_type?: string | null
          id?: string
          inventory_asset_value?: number | null
          monthly_profit?: number
          monthly_revenue?: number
          owner_involvement?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_metrics_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      businesses: {
        Row: {
          asking_price: number
          business_location: string
          business_name: string
          business_sector: string
          business_tagline: string
          created_at: string
          deal_type: string
          id: string
          is_featured: boolean
          is_premium: boolean
          is_visible: boolean
          listing_status: string
          premium_expires_at: string | null
          seller_id: string
          updated_at: string
          years_in_operation: number
        }
        Insert: {
          asking_price: number
          business_location: string
          business_name: string
          business_sector: string
          business_tagline: string
          created_at?: string
          deal_type: string
          id?: string
          is_featured?: boolean
          is_premium?: boolean
          is_visible?: boolean
          listing_status?: string
          premium_expires_at?: string | null
          seller_id: string
          updated_at?: string
          years_in_operation: number
        }
        Update: {
          asking_price?: number
          business_location?: string
          business_name?: string
          business_sector?: string
          business_tagline?: string
          created_at?: string
          deal_type?: string
          id?: string
          is_featured?: boolean
          is_premium?: boolean
          is_visible?: boolean
          listing_status?: string
          premium_expires_at?: string | null
          seller_id?: string
          updated_at?: string
          years_in_operation?: number
        }
        Relationships: [
          {
            foreignKeyName: "businesses_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "sellers"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_preferences: {
        Row: {
          allow_whatsapp_contact: boolean
          business_id: string
          created_at: string
          enable_buyer_messages: boolean
          id: string
          is_verified: boolean
          listing_type: string
          updated_at: string
        }
        Insert: {
          allow_whatsapp_contact?: boolean
          business_id: string
          created_at?: string
          enable_buyer_messages?: boolean
          id?: string
          is_verified?: boolean
          listing_type: string
          updated_at?: string
        }
        Update: {
          allow_whatsapp_contact?: boolean
          business_id?: string
          created_at?: string
          enable_buyer_messages?: boolean
          id?: string
          is_verified?: boolean
          listing_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_preferences_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          contact_number: string | null
          created_at: string | null
          full_name: string
          id: string
          updated_at: string | null
          user_type: string | null
        }
        Insert: {
          contact_number?: string | null
          created_at?: string | null
          full_name: string
          id: string
          updated_at?: string | null
          user_type?: string | null
        }
        Update: {
          contact_number?: string | null
          created_at?: string | null
          full_name?: string
          id?: string
          updated_at?: string | null
          user_type?: string | null
        }
        Relationships: []
      }
      saved_businesses: {
        Row: {
          business_id: string
          business_name: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          business_id: string
          business_name: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          business_id?: string
          business_name?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_businesses_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      sellers: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          id_or_cipc_number: string | null
          is_verified: boolean
          linkedin_or_website_url: string | null
          mobile_number: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          id_or_cipc_number?: string | null
          is_verified?: boolean
          linkedin_or_website_url?: string | null
          mobile_number: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          id_or_cipc_number?: string | null
          is_verified?: boolean
          linkedin_or_website_url?: string | null
          mobile_number?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      success_fees: {
        Row: {
          business_id: string
          buyer_user_id: string | null
          collected_at: string | null
          created_at: string
          fee_amount: number | null
          fee_percentage: number
          id: string
          invoice_url: string | null
          payment_notes: string | null
          payment_reference: string | null
          payment_status: string
          sale_price: number
          seller_id: string
          updated_at: string
        }
        Insert: {
          business_id: string
          buyer_user_id?: string | null
          collected_at?: string | null
          created_at?: string
          fee_amount?: number | null
          fee_percentage?: number
          id?: string
          invoice_url?: string | null
          payment_notes?: string | null
          payment_reference?: string | null
          payment_status?: string
          sale_price: number
          seller_id: string
          updated_at?: string
        }
        Update: {
          business_id?: string
          buyer_user_id?: string | null
          collected_at?: string | null
          created_at?: string
          fee_amount?: number | null
          fee_percentage?: number
          id?: string
          invoice_url?: string | null
          payment_notes?: string | null
          payment_reference?: string | null
          payment_status?: string
          sale_price?: number
          seller_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "success_fees_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "success_fees_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "sellers"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          assigned_admin_id: string | null
          business_id: string | null
          created_at: string
          description: string
          id: string
          priority: string
          reporter_user_id: string | null
          resolution_notes: string | null
          resolved_at: string | null
          seller_id: string | null
          status: string
          subject: string
          ticket_type: string
          updated_at: string
        }
        Insert: {
          assigned_admin_id?: string | null
          business_id?: string | null
          created_at?: string
          description: string
          id?: string
          priority?: string
          reporter_user_id?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          seller_id?: string | null
          status?: string
          subject: string
          ticket_type: string
          updated_at?: string
        }
        Update: {
          assigned_admin_id?: string | null
          business_id?: string | null
          created_at?: string
          description?: string
          id?: string
          priority?: string
          reporter_user_id?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          seller_id?: string | null
          status?: string
          subject?: string
          ticket_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "sellers"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "user" | "admin" | "super_admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["user", "admin", "super_admin"],
    },
  },
} as const
