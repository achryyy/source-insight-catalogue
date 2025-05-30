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
      activity_logs: {
        Row: {
          action: string
          description: string | null
          id: string
          source_id: string | null
          timestamp: string | null
          user_name: string | null
        }
        Insert: {
          action: string
          description?: string | null
          id?: string
          source_id?: string | null
          timestamp?: string | null
          user_name?: string | null
        }
        Update: {
          action?: string
          description?: string | null
          id?: string
          source_id?: string | null
          timestamp?: string | null
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "data_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      data_points: {
        Row: {
          activity_code: boolean | null
          activity_description: boolean | null
          address: boolean | null
          capital: boolean | null
          company_name: boolean | null
          company_registration_date: boolean | null
          company_shares: boolean | null
          contact_details: boolean | null
          created_at: string | null
          director_address: boolean | null
          director_dob: boolean | null
          director_name: boolean | null
          director_nationality: boolean | null
          director_position: boolean | null
          full_financials: boolean | null
          id: string
          legal_form: boolean | null
          number_of_employees: boolean | null
          partial_financials: boolean | null
          register_expiry_date: boolean | null
          register_issue_date: boolean | null
          register_status: boolean | null
          shareholder_address: boolean | null
          shareholder_dob: boolean | null
          shareholder_name: boolean | null
          shareholder_nationality: boolean | null
          shareholder_shares: boolean | null
          shareholder_uin: boolean | null
          source_id: string | null
          trade_name: boolean | null
          uin: boolean | null
          uin_chamber: boolean | null
          uin_commercial_register: boolean | null
          uin_license: boolean | null
          uin_others: boolean | null
          uin_vat_no: boolean | null
        }
        Insert: {
          activity_code?: boolean | null
          activity_description?: boolean | null
          address?: boolean | null
          capital?: boolean | null
          company_name?: boolean | null
          company_registration_date?: boolean | null
          company_shares?: boolean | null
          contact_details?: boolean | null
          created_at?: string | null
          director_address?: boolean | null
          director_dob?: boolean | null
          director_name?: boolean | null
          director_nationality?: boolean | null
          director_position?: boolean | null
          full_financials?: boolean | null
          id?: string
          legal_form?: boolean | null
          number_of_employees?: boolean | null
          partial_financials?: boolean | null
          register_expiry_date?: boolean | null
          register_issue_date?: boolean | null
          register_status?: boolean | null
          shareholder_address?: boolean | null
          shareholder_dob?: boolean | null
          shareholder_name?: boolean | null
          shareholder_nationality?: boolean | null
          shareholder_shares?: boolean | null
          shareholder_uin?: boolean | null
          source_id?: string | null
          trade_name?: boolean | null
          uin?: boolean | null
          uin_chamber?: boolean | null
          uin_commercial_register?: boolean | null
          uin_license?: boolean | null
          uin_others?: boolean | null
          uin_vat_no?: boolean | null
        }
        Update: {
          activity_code?: boolean | null
          activity_description?: boolean | null
          address?: boolean | null
          capital?: boolean | null
          company_name?: boolean | null
          company_registration_date?: boolean | null
          company_shares?: boolean | null
          contact_details?: boolean | null
          created_at?: string | null
          director_address?: boolean | null
          director_dob?: boolean | null
          director_name?: boolean | null
          director_nationality?: boolean | null
          director_position?: boolean | null
          full_financials?: boolean | null
          id?: string
          legal_form?: boolean | null
          number_of_employees?: boolean | null
          partial_financials?: boolean | null
          register_expiry_date?: boolean | null
          register_issue_date?: boolean | null
          register_status?: boolean | null
          shareholder_address?: boolean | null
          shareholder_dob?: boolean | null
          shareholder_name?: boolean | null
          shareholder_nationality?: boolean | null
          shareholder_shares?: boolean | null
          shareholder_uin?: boolean | null
          source_id?: string | null
          trade_name?: boolean | null
          uin?: boolean | null
          uin_chamber?: boolean | null
          uin_commercial_register?: boolean | null
          uin_license?: boolean | null
          uin_others?: boolean | null
          uin_vat_no?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "data_points_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "data_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      data_sources: {
        Row: {
          added_value: string | null
          adip_refresh_frequency: string | null
          adip_source: boolean | null
          approved: boolean | null
          approved_at: string | null
          approved_by: string | null
          auto_populated: boolean | null
          captcha_requirements: boolean | null
          compliance_status:
            | Database["public"]["Enums"]["compliance_status"]
            | null
          country: string
          crawled: boolean | null
          created_at: string | null
          data_extraction_format:
            | Database["public"]["Enums"]["data_extraction_format"]
            | null
          data_usage_limitations: string | null
          discovery_method:
            | Database["public"]["Enums"]["discovery_method"]
            | null
          due_date: string | null
          expected_companies: number | null
          file_hyperlink: string | null
          id: string
          language_of_data: string | null
          last_crawled_date: string | null
          needs_review: boolean | null
          page_display_limitation: number | null
          recommendation_score: number | null
          reviewer: string | null
          search_input_required: boolean | null
          source_grade: string | null
          source_hyperlink: string | null
          source_name: string
          source_type: Database["public"]["Enums"]["source_type"]
          status: Database["public"]["Enums"]["source_status"] | null
          terms_conditions: string | null
          update_frequency: string | null
          updated_at: string | null
        }
        Insert: {
          added_value?: string | null
          adip_refresh_frequency?: string | null
          adip_source?: boolean | null
          approved?: boolean | null
          approved_at?: string | null
          approved_by?: string | null
          auto_populated?: boolean | null
          captcha_requirements?: boolean | null
          compliance_status?:
            | Database["public"]["Enums"]["compliance_status"]
            | null
          country: string
          crawled?: boolean | null
          created_at?: string | null
          data_extraction_format?:
            | Database["public"]["Enums"]["data_extraction_format"]
            | null
          data_usage_limitations?: string | null
          discovery_method?:
            | Database["public"]["Enums"]["discovery_method"]
            | null
          due_date?: string | null
          expected_companies?: number | null
          file_hyperlink?: string | null
          id?: string
          language_of_data?: string | null
          last_crawled_date?: string | null
          needs_review?: boolean | null
          page_display_limitation?: number | null
          recommendation_score?: number | null
          reviewer?: string | null
          search_input_required?: boolean | null
          source_grade?: string | null
          source_hyperlink?: string | null
          source_name: string
          source_type: Database["public"]["Enums"]["source_type"]
          status?: Database["public"]["Enums"]["source_status"] | null
          terms_conditions?: string | null
          update_frequency?: string | null
          updated_at?: string | null
        }
        Update: {
          added_value?: string | null
          adip_refresh_frequency?: string | null
          adip_source?: boolean | null
          approved?: boolean | null
          approved_at?: string | null
          approved_by?: string | null
          auto_populated?: boolean | null
          captcha_requirements?: boolean | null
          compliance_status?:
            | Database["public"]["Enums"]["compliance_status"]
            | null
          country?: string
          crawled?: boolean | null
          created_at?: string | null
          data_extraction_format?:
            | Database["public"]["Enums"]["data_extraction_format"]
            | null
          data_usage_limitations?: string | null
          discovery_method?:
            | Database["public"]["Enums"]["discovery_method"]
            | null
          due_date?: string | null
          expected_companies?: number | null
          file_hyperlink?: string | null
          id?: string
          language_of_data?: string | null
          last_crawled_date?: string | null
          needs_review?: boolean | null
          page_display_limitation?: number | null
          recommendation_score?: number | null
          reviewer?: string | null
          search_input_required?: boolean | null
          source_grade?: string | null
          source_hyperlink?: string | null
          source_name?: string
          source_type?: Database["public"]["Enums"]["source_type"]
          status?: Database["public"]["Enums"]["source_status"] | null
          terms_conditions?: string | null
          update_frequency?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      source_discovery_logs: {
        Row: {
          analyzed_at: string | null
          approved_at: string | null
          approved_by: string | null
          confidence_score: number | null
          discovered_url: string | null
          id: string
          needs_review: boolean | null
          notes: string | null
          search_criteria: string | null
          status: string | null
        }
        Insert: {
          analyzed_at?: string | null
          approved_at?: string | null
          approved_by?: string | null
          confidence_score?: number | null
          discovered_url?: string | null
          id?: string
          needs_review?: boolean | null
          notes?: string | null
          search_criteria?: string | null
          status?: string | null
        }
        Update: {
          analyzed_at?: string | null
          approved_at?: string | null
          approved_by?: string | null
          confidence_score?: number | null
          discovered_url?: string | null
          id?: string
          needs_review?: boolean | null
          notes?: string | null
          search_criteria?: string | null
          status?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      compliance_status: "Compliant" | "Under Review" | "Non-Compliant"
      data_extraction_format: "HTML" | "PDF" | "API" | "Excel" | "CSV"
      discovery_method: "Manual" | "Automated"
      source_status: "Active" | "Inactive" | "Under Maintenance"
      source_type:
        | "Governmental"
        | "Ministry"
        | "Stock Exchange"
        | "Chamber"
        | "Non-governmental"
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
      compliance_status: ["Compliant", "Under Review", "Non-Compliant"],
      data_extraction_format: ["HTML", "PDF", "API", "Excel", "CSV"],
      discovery_method: ["Manual", "Automated"],
      source_status: ["Active", "Inactive", "Under Maintenance"],
      source_type: [
        "Governmental",
        "Ministry",
        "Stock Exchange",
        "Chamber",
        "Non-governmental",
      ],
    },
  },
} as const
