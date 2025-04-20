export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      buyer_business_models: {
        Row: {
          business_model: Database["public"]["Enums"]["business_model"]
          buyer_id: string | null
          id: string
        }
        Insert: {
          business_model: Database["public"]["Enums"]["business_model"]
          buyer_id?: string | null
          id?: string
        }
        Update: {
          business_model?: Database["public"]["Enums"]["business_model"]
          buyer_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "buyer_business_models_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "buyer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      buyer_industry_interests: {
        Row: {
          buyer_id: string | null
          id: string
          industry: string
        }
        Insert: {
          buyer_id?: string | null
          id?: string
          industry: string
        }
        Update: {
          buyer_id?: string | null
          id?: string
          industry?: string
        }
        Relationships: [
          {
            foreignKeyName: "buyer_industry_interests_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "buyer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      buyer_profiles: {
        Row: {
          buyer_type: Database["public"]["Enums"]["buyer_type"]
          company_website: string | null
          created_at: string
          id: string
          is_verified: boolean | null
          linkedin_url: string | null
          max_budget: number | null
          max_revenue: number | null
          min_budget: number | null
          min_revenue: number | null
          preferred_deal_type: string | null
          preferred_location: string[] | null
          proof_of_funds_url: string | null
          updated_at: string
        }
        Insert: {
          buyer_type: Database["public"]["Enums"]["buyer_type"]
          company_website?: string | null
          created_at?: string
          id: string
          is_verified?: boolean | null
          linkedin_url?: string | null
          max_budget?: number | null
          max_revenue?: number | null
          min_budget?: number | null
          min_revenue?: number | null
          preferred_deal_type?: string | null
          preferred_location?: string[] | null
          proof_of_funds_url?: string | null
          updated_at?: string
        }
        Update: {
          buyer_type?: Database["public"]["Enums"]["buyer_type"]
          company_website?: string | null
          created_at?: string
          id?: string
          is_verified?: boolean | null
          linkedin_url?: string | null
          max_budget?: number | null
          max_revenue?: number | null
          min_budget?: number | null
          min_revenue?: number | null
          preferred_deal_type?: string | null
          preferred_location?: string[] | null
          proof_of_funds_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          updated_at: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Insert: {
          created_at?: string
          id: string
          updated_at?: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
          user_type?: Database["public"]["Enums"]["user_type"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_profile_for_user: {
        Args: { user_id: string; user_type: string }
        Returns: undefined
      }
    }
    Enums: {
      business_model:
        | "subscription"
        | "one_time"
        | "agency"
        | "marketplace"
        | "ecommerce"
        | "other"
      buyer_type:
        | "individual"
        | "investor"
        | "private_equity"
        | "corporate_acquirer"
      user_type: "buyer" | "seller"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      business_model: [
        "subscription",
        "one_time",
        "agency",
        "marketplace",
        "ecommerce",
        "other",
      ],
      buyer_type: [
        "individual",
        "investor",
        "private_equity",
        "corporate_acquirer",
      ],
      user_type: ["buyer", "seller"],
    },
  },
} as const
