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
      accommodations: {
        Row: {
          address: string
          amenities: string[]
          bathrooms: number
          bedrooms: number
          created_at: string
          description: string
          gallery_images: string[]
          id: number
          image_url: string
          max_guests: number
          price_per_night: number
          rating: number
          short_description: string
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          address: string
          amenities?: string[]
          bathrooms: number
          bedrooms: number
          created_at?: string
          description: string
          gallery_images?: string[]
          id?: number
          image_url: string
          max_guests: number
          price_per_night: number
          rating: number
          short_description: string
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          address?: string
          amenities?: string[]
          bathrooms?: number
          bedrooms?: number
          created_at?: string
          description?: string
          gallery_images?: string[]
          id?: number
          image_url?: string
          max_guests?: number
          price_per_night?: number
          rating?: number
          short_description?: string
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          accommodation_id: number | null
          created_at: string
          end_date: string
          guests: number
          id: number
          payment_method: string | null
          payment_status: string
          special_requests: string | null
          start_date: string
          status: string
          total_price: number
          tour_id: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          accommodation_id?: number | null
          created_at?: string
          end_date: string
          guests: number
          id?: number
          payment_method?: string | null
          payment_status: string
          special_requests?: string | null
          start_date: string
          status: string
          total_price: number
          tour_id?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          accommodation_id?: number | null
          created_at?: string
          end_date?: string
          guests?: number
          id?: number
          payment_method?: string | null
          payment_status?: string
          special_requests?: string | null
          start_date?: string
          status?: string
          total_price?: number
          tour_id?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_accommodation_id_fkey"
            columns: ["accommodation_id"]
            isOneToOne: false
            referencedRelation: "accommodations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string
          created_at: string
          description: string
          dimensions: string | null
          featured: boolean | null
          gallery: string[] | null
          id: number
          image_url: string
          name: string
          price: number
          status: string
          stock: number
          updated_at: string
          weight: number | null
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          dimensions?: string | null
          featured?: boolean | null
          gallery?: string[] | null
          id?: number
          image_url: string
          name: string
          price: number
          status?: string
          stock?: number
          updated_at?: string
          weight?: number | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          dimensions?: string | null
          featured?: boolean | null
          gallery?: string[] | null
          id?: number
          image_url?: string
          name?: string
          price?: number
          status?: string
          stock?: number
          updated_at?: string
          weight?: number | null
        }
        Relationships: []
      }
      tours: {
        Row: {
          category: string
          created_at: string
          description: string
          difficulty: string
          duration: string
          excludes: string[]
          gallery_images: string[]
          id: number
          image_url: string
          includes: string[]
          max_participants: number
          meeting_point: string | null
          min_participants: number
          notes: string[]
          price: number
          rating: number
          schedule: string[]
          short_description: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          difficulty: string
          duration: string
          excludes?: string[]
          gallery_images?: string[]
          id?: number
          image_url: string
          includes?: string[]
          max_participants: number
          meeting_point?: string | null
          min_participants?: number
          notes?: string[]
          price: number
          rating: number
          schedule?: string[]
          short_description: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          difficulty?: string
          duration?: string
          excludes?: string[]
          gallery_images?: string[]
          id?: number
          image_url?: string
          includes?: string[]
          max_participants?: number
          meeting_point?: string | null
          min_participants?: number
          notes?: string[]
          price?: number
          rating?: number
          schedule?: string[]
          short_description?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string
          email: string | null
          id: string
          name: string | null
          phone: string | null
          state: string | null
          updated_at: string
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          id: string
          name?: string | null
          phone?: string | null
          state?: string | null
          updated_at?: string
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          state?: string | null
          updated_at?: string
          zip_code?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          updated_at?: string
          user_id?: string
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
    Enums: {},
  },
} as const
