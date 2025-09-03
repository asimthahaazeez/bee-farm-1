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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      environmental_data: {
        Row: {
          air_quality_index: number | null
          created_at: string
          date: string
          humidity: number | null
          id: string
          location: string
          pollen_count: Json | null
          precipitation: number | null
          regional_disease_alerts: Json | null
          temperature_high: number | null
          temperature_low: number | null
          uv_index: number | null
          weather_conditions: string | null
          wind_speed: number | null
        }
        Insert: {
          air_quality_index?: number | null
          created_at?: string
          date: string
          humidity?: number | null
          id?: string
          location: string
          pollen_count?: Json | null
          precipitation?: number | null
          regional_disease_alerts?: Json | null
          temperature_high?: number | null
          temperature_low?: number | null
          uv_index?: number | null
          weather_conditions?: string | null
          wind_speed?: number | null
        }
        Update: {
          air_quality_index?: number | null
          created_at?: string
          date?: string
          humidity?: number | null
          id?: string
          location?: string
          pollen_count?: Json | null
          precipitation?: number | null
          regional_disease_alerts?: Json | null
          temperature_high?: number | null
          temperature_low?: number | null
          uv_index?: number | null
          weather_conditions?: string | null
          wind_speed?: number | null
        }
        Relationships: []
      }
      financial_transactions: {
        Row: {
          amount: number
          category: string
          created_at: string
          currency: string
          description: string | null
          hive_id: string | null
          id: string
          metadata: Json | null
          receipt_url: string | null
          subcategory: string | null
          tags: string[] | null
          tax_deductible: boolean | null
          transaction_date: string
          transaction_type: string
          updated_at: string
          user_id: string
          vendor_name: string | null
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          currency?: string
          description?: string | null
          hive_id?: string | null
          id?: string
          metadata?: Json | null
          receipt_url?: string | null
          subcategory?: string | null
          tags?: string[] | null
          tax_deductible?: boolean | null
          transaction_date: string
          transaction_type: string
          updated_at?: string
          user_id: string
          vendor_name?: string | null
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          currency?: string
          description?: string | null
          hive_id?: string | null
          id?: string
          metadata?: Json | null
          receipt_url?: string | null
          subcategory?: string | null
          tags?: string[] | null
          tax_deductible?: boolean | null
          transaction_date?: string
          transaction_type?: string
          updated_at?: string
          user_id?: string
          vendor_name?: string | null
        }
        Relationships: []
      }
      fraud_detection_logs: {
        Row: {
          created_at: string
          detection_type: string
          flags: Json | null
          id: string
          resolved_at: string | null
          reviewer_id: string | null
          reviewer_notes: string | null
          risk_score: number | null
          status: string
          transaction_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          detection_type: string
          flags?: Json | null
          id?: string
          resolved_at?: string | null
          reviewer_id?: string | null
          reviewer_notes?: string | null
          risk_score?: number | null
          status?: string
          transaction_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          detection_type?: string
          flags?: Json | null
          id?: string
          resolved_at?: string | null
          reviewer_id?: string | null
          reviewer_notes?: string | null
          risk_score?: number | null
          status?: string
          transaction_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      hive_analyses: {
        Row: {
          analysis_date: string
          analysis_metadata: Json | null
          brood_pattern_score: number | null
          confidence_score: number | null
          created_at: string
          environmental_factors: Json | null
          health_score: number
          hive_id: string
          honey_stores_level: string | null
          id: string
          image_path: string | null
          image_url: string | null
          issues_detected: Json | null
          population_estimate: number | null
          processing_progress: number | null
          processing_status: string
          queen_status: string | null
          recommendations: string[] | null
          risk_factors: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          analysis_date?: string
          analysis_metadata?: Json | null
          brood_pattern_score?: number | null
          confidence_score?: number | null
          created_at?: string
          environmental_factors?: Json | null
          health_score: number
          hive_id: string
          honey_stores_level?: string | null
          id?: string
          image_path?: string | null
          image_url?: string | null
          issues_detected?: Json | null
          population_estimate?: number | null
          processing_progress?: number | null
          processing_status?: string
          queen_status?: string | null
          recommendations?: string[] | null
          risk_factors?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          analysis_date?: string
          analysis_metadata?: Json | null
          brood_pattern_score?: number | null
          confidence_score?: number | null
          created_at?: string
          environmental_factors?: Json | null
          health_score?: number
          hive_id?: string
          honey_stores_level?: string | null
          id?: string
          image_path?: string | null
          image_url?: string | null
          issues_detected?: Json | null
          population_estimate?: number | null
          processing_progress?: number | null
          processing_status?: string
          queen_status?: string | null
          recommendations?: string[] | null
          risk_factors?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      hive_health_scores: {
        Row: {
          brood_score: number | null
          contributing_factors: Json | null
          created_at: string
          health_trend: string | null
          hive_id: string
          id: string
          overall_score: number
          population_score: number | null
          predictions: Json | null
          queen_score: number | null
          risk_level: string | null
          score_date: string
          updated_at: string
          user_id: string
          valid_until: string | null
        }
        Insert: {
          brood_score?: number | null
          contributing_factors?: Json | null
          created_at?: string
          health_trend?: string | null
          hive_id: string
          id?: string
          overall_score: number
          population_score?: number | null
          predictions?: Json | null
          queen_score?: number | null
          risk_level?: string | null
          score_date?: string
          updated_at?: string
          user_id: string
          valid_until?: string | null
        }
        Update: {
          brood_score?: number | null
          contributing_factors?: Json | null
          created_at?: string
          health_trend?: string | null
          hive_id?: string
          id?: string
          overall_score?: number
          population_score?: number | null
          predictions?: Json | null
          queen_score?: number | null
          risk_level?: string | null
          score_date?: string
          updated_at?: string
          user_id?: string
          valid_until?: string | null
        }
        Relationships: []
      }
      hives: {
        Row: {
          created_at: string
          hive_type: string | null
          id: string
          installation_date: string | null
          is_active: boolean | null
          location: string | null
          name: string
          notes: string | null
          queen_color: string | null
          queen_marked: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          hive_type?: string | null
          id?: string
          installation_date?: string | null
          is_active?: boolean | null
          location?: string | null
          name: string
          notes?: string | null
          queen_color?: string | null
          queen_marked?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          hive_type?: string | null
          id?: string
          installation_date?: string | null
          is_active?: boolean | null
          location?: string | null
          name?: string
          notes?: string | null
          queen_color?: string | null
          queen_marked?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      inspection_logs: {
        Row: {
          brood_pattern: string | null
          created_at: string
          hive_id: string
          honey_stores: string | null
          id: string
          inspection_date: string
          notes: string | null
          population_estimate: string | null
          queen_status: string | null
          temperament: string | null
          temperature_f: number | null
          updated_at: string
          user_id: string
          weather_conditions: string | null
        }
        Insert: {
          brood_pattern?: string | null
          created_at?: string
          hive_id: string
          honey_stores?: string | null
          id?: string
          inspection_date?: string
          notes?: string | null
          population_estimate?: string | null
          queen_status?: string | null
          temperament?: string | null
          temperature_f?: number | null
          updated_at?: string
          user_id: string
          weather_conditions?: string | null
        }
        Update: {
          brood_pattern?: string | null
          created_at?: string
          hive_id?: string
          honey_stores?: string | null
          id?: string
          inspection_date?: string
          notes?: string | null
          population_estimate?: string | null
          queen_status?: string | null
          temperament?: string | null
          temperature_f?: number | null
          updated_at?: string
          user_id?: string
          weather_conditions?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inspection_logs_hive_id_fkey"
            columns: ["hive_id"]
            isOneToOne: false
            referencedRelation: "hives"
            referencedColumns: ["id"]
          },
        ]
      }
      predictive_alerts: {
        Row: {
          alert_type: string
          confidence_score: number | null
          created_at: string
          description: string
          hive_id: string | null
          id: string
          metadata: Json | null
          predicted_date: string | null
          recommendations: string[] | null
          severity: string
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          alert_type: string
          confidence_score?: number | null
          created_at?: string
          description: string
          hive_id?: string | null
          id?: string
          metadata?: Json | null
          predicted_date?: string | null
          recommendations?: string[] | null
          severity: string
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          alert_type?: string
          confidence_score?: number | null
          created_at?: string
          description?: string
          hive_id?: string | null
          id?: string
          metadata?: Json | null
          predicted_date?: string | null
          recommendations?: string[] | null
          severity?: string
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          experience_level: string | null
          full_name: string | null
          id: string
          location: string | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          experience_level?: string | null
          full_name?: string | null
          id?: string
          location?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          experience_level?: string | null
          full_name?: string | null
          id?: string
          location?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profit_loss_reports: {
        Row: {
          created_at: string
          end_date: string
          expense_breakdown: Json | null
          generated_at: string
          id: string
          net_profit: number
          report_data: Json
          report_period: string
          revenue_breakdown: Json | null
          start_date: string
          tax_summary: Json | null
          total_expenses: number
          total_revenue: number
          user_id: string
        }
        Insert: {
          created_at?: string
          end_date: string
          expense_breakdown?: Json | null
          generated_at?: string
          id?: string
          net_profit?: number
          report_data: Json
          report_period: string
          revenue_breakdown?: Json | null
          start_date: string
          tax_summary?: Json | null
          total_expenses?: number
          total_revenue?: number
          user_id: string
        }
        Update: {
          created_at?: string
          end_date?: string
          expense_breakdown?: Json | null
          generated_at?: string
          id?: string
          net_profit?: number
          report_data?: Json
          report_period?: string
          revenue_breakdown?: Json | null
          start_date?: string
          tax_summary?: Json | null
          total_expenses?: number
          total_revenue?: number
          user_id?: string
        }
        Relationships: []
      }
      security_audit_logs: {
        Row: {
          created_at: string
          description: string
          event_category: string
          event_metadata: Json | null
          event_type: string
          id: string
          ip_address: unknown | null
          resource_accessed: string | null
          session_id: string | null
          severity: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description: string
          event_category: string
          event_metadata?: Json | null
          event_type: string
          id?: string
          ip_address?: unknown | null
          resource_accessed?: string | null
          session_id?: string | null
          severity: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          event_category?: string
          event_metadata?: Json | null
          event_type?: string
          id?: string
          ip_address?: unknown | null
          resource_accessed?: string | null
          session_id?: string | null
          severity?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      weather_cache: {
        Row: {
          cached_at: string
          expires_at: string
          forecast_data: Json | null
          id: string
          location: string
          weather_data: Json
        }
        Insert: {
          cached_at?: string
          expires_at?: string
          forecast_data?: Json | null
          id?: string
          location: string
          weather_data: Json
        }
        Update: {
          cached_at?: string
          expires_at?: string
          forecast_data?: Json | null
          id?: string
          location?: string
          weather_data?: Json
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
      [_ in never]: never
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
    Enums: {},
  },
} as const
