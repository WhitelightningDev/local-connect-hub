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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      availability_slots: {
        Row: {
          created_at: string
          day_of_week: number
          end_time: string
          id: string
          is_available: boolean | null
          provider_id: string
          start_time: string
        }
        Insert: {
          created_at?: string
          day_of_week: number
          end_time: string
          id?: string
          is_available?: boolean | null
          provider_id: string
          start_time: string
        }
        Update: {
          created_at?: string
          day_of_week?: number
          end_time?: string
          id?: string
          is_available?: boolean | null
          provider_id?: string
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "availability_slots_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          booking_date: string
          commission_amount: number
          created_at: string
          customer_address: string | null
          customer_id: string | null
          customer_notes: string | null
          end_time: string
          id: string
          provider_id: string | null
          provider_notes: string | null
          provider_payout: number
          service_id: string | null
          start_time: string
          status: Database["public"]["Enums"]["booking_status"] | null
          total_amount: number
          updated_at: string
        }
        Insert: {
          booking_date: string
          commission_amount: number
          created_at?: string
          customer_address?: string | null
          customer_id?: string | null
          customer_notes?: string | null
          end_time: string
          id?: string
          provider_id?: string | null
          provider_notes?: string | null
          provider_payout: number
          service_id?: string | null
          start_time: string
          status?: Database["public"]["Enums"]["booking_status"] | null
          total_amount: number
          updated_at?: string
        }
        Update: {
          booking_date?: string
          commission_amount?: number
          created_at?: string
          customer_address?: string | null
          customer_id?: string | null
          customer_notes?: string | null
          end_time?: string
          id?: string
          provider_id?: string | null
          provider_notes?: string | null
          provider_payout?: number
          service_id?: string | null
          start_time?: string
          status?: Database["public"]["Enums"]["booking_status"] | null
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      disputes: {
        Row: {
          admin_notes: string | null
          booking_id: string
          created_at: string
          description: string | null
          id: string
          raised_by_user_id: string | null
          reason: string
          resolution: string | null
          resolved_at: string | null
          status: Database["public"]["Enums"]["dispute_status"] | null
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          booking_id: string
          created_at?: string
          description?: string | null
          id?: string
          raised_by_user_id?: string | null
          reason: string
          resolution?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["dispute_status"] | null
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          booking_id?: string
          created_at?: string
          description?: string | null
          id?: string
          raised_by_user_id?: string | null
          reason?: string
          resolution?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["dispute_status"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "disputes_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          booking_id: string | null
          commission_amount: number
          created_at: string
          id: string
          paid_at: string | null
          payment_method: string | null
          payment_reference: string | null
          payout_amount: number
          released_at: string | null
          status: Database["public"]["Enums"]["payment_status"] | null
        }
        Insert: {
          amount: number
          booking_id?: string | null
          commission_amount: number
          created_at?: string
          id?: string
          paid_at?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          payout_amount: number
          released_at?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
        }
        Update: {
          amount?: number
          booking_id?: string | null
          commission_amount?: number
          created_at?: string
          id?: string
          paid_at?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          payout_amount?: number
          released_at?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          city: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          phone: string | null
          suburb: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          phone?: string | null
          suburb?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          suburb?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      providers: {
        Row: {
          average_rating: number | null
          bio: string | null
          business_name: string
          city: string
          commission_rate: number | null
          cover_image_url: string | null
          created_at: string
          id: string
          is_featured: boolean | null
          profile_image_url: string | null
          service_radius_km: number | null
          suburb: string | null
          total_bookings: number | null
          total_reviews: number | null
          updated_at: string
          user_id: string
          verification_status:
            | Database["public"]["Enums"]["verification_status"]
            | null
        }
        Insert: {
          average_rating?: number | null
          bio?: string | null
          business_name: string
          city: string
          commission_rate?: number | null
          cover_image_url?: string | null
          created_at?: string
          id?: string
          is_featured?: boolean | null
          profile_image_url?: string | null
          service_radius_km?: number | null
          suburb?: string | null
          total_bookings?: number | null
          total_reviews?: number | null
          updated_at?: string
          user_id: string
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
        }
        Update: {
          average_rating?: number | null
          bio?: string | null
          business_name?: string
          city?: string
          commission_rate?: number | null
          cover_image_url?: string | null
          created_at?: string
          id?: string
          is_featured?: boolean | null
          profile_image_url?: string | null
          service_radius_km?: number | null
          suburb?: string | null
          total_bookings?: number | null
          total_reviews?: number | null
          updated_at?: string
          user_id?: string
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          booking_id: string | null
          comment: string | null
          created_at: string
          customer_id: string | null
          id: string
          is_visible: boolean | null
          provider_id: string | null
          rating: number
        }
        Insert: {
          booking_id?: string | null
          comment?: string | null
          created_at?: string
          customer_id?: string | null
          id?: string
          is_visible?: boolean | null
          provider_id?: string | null
          rating: number
        }
        Update: {
          booking_id?: string | null
          comment?: string | null
          created_at?: string
          customer_id?: string | null
          id?: string
          is_visible?: boolean | null
          provider_id?: string | null
          rating?: number
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      service_categories: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          icon: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          slug?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          category_id: string | null
          created_at: string
          description: string | null
          duration_minutes: number
          id: string
          is_active: boolean | null
          name: string
          price: number
          provider_id: string
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          is_active?: boolean | null
          name: string
          price: number
          provider_id: string
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          is_active?: boolean | null
          name?: string
          price?: number
          provider_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string
          ends_at: string
          id: string
          is_active: boolean | null
          price_paid: number
          provider_id: string
          starts_at: string
          type: Database["public"]["Enums"]["subscription_type"]
        }
        Insert: {
          created_at?: string
          ends_at: string
          id?: string
          is_active?: boolean | null
          price_paid: number
          provider_id: string
          starts_at?: string
          type: Database["public"]["Enums"]["subscription_type"]
        }
        Update: {
          created_at?: string
          ends_at?: string
          id?: string
          is_active?: boolean | null
          price_paid?: number
          provider_id?: string
          starts_at?: string
          type?: Database["public"]["Enums"]["subscription_type"]
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
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
      get_provider_id: { Args: { _user_id: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "customer" | "provider" | "admin"
      booking_status:
        | "pending"
        | "confirmed"
        | "in_progress"
        | "completed"
        | "cancelled"
        | "disputed"
      dispute_status: "open" | "investigating" | "resolved" | "closed"
      payment_status: "pending" | "held" | "released" | "refunded" | "failed"
      subscription_type: "featured" | "verified_badge" | "zero_commission"
      verification_status: "pending" | "verified" | "rejected"
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
      app_role: ["customer", "provider", "admin"],
      booking_status: [
        "pending",
        "confirmed",
        "in_progress",
        "completed",
        "cancelled",
        "disputed",
      ],
      dispute_status: ["open", "investigating", "resolved", "closed"],
      payment_status: ["pending", "held", "released", "refunded", "failed"],
      subscription_type: ["featured", "verified_badge", "zero_commission"],
      verification_status: ["pending", "verified", "rejected"],
    },
  },
} as const
