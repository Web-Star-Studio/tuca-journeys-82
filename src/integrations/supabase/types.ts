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
      accommodation_availability: {
        Row: {
          accommodation_id: number
          created_at: string
          custom_price: number | null
          date: string
          id: number
          status: string
          updated_at: string
        }
        Insert: {
          accommodation_id: number
          created_at?: string
          custom_price?: number | null
          date: string
          id?: number
          status?: string
          updated_at?: string
        }
        Update: {
          accommodation_id?: number
          created_at?: string
          custom_price?: number | null
          date?: string
          id?: number
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "accommodation_availability_accommodation_id_fkey"
            columns: ["accommodation_id"]
            isOneToOne: false
            referencedRelation: "accommodations"
            referencedColumns: ["id"]
          },
        ]
      }
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
          is_featured: boolean | null
          max_guests: number
          partner_id: string | null
          price_per_night: number
          rating: number
          search_vector: unknown | null
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
          is_featured?: boolean | null
          max_guests: number
          partner_id?: string | null
          price_per_night: number
          rating: number
          search_vector?: unknown | null
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
          is_featured?: boolean | null
          max_guests?: number
          partner_id?: string | null
          price_per_night?: number
          rating?: number
          search_vector?: unknown | null
          short_description?: string
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "accommodations_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          change_details: Json | null
          created_at: string | null
          id: number
          ip_address: string | null
          new_data: Json | null
          old_data: Json | null
          record_id: string | null
          table_name: string | null
          target_user_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          change_details?: Json | null
          created_at?: string | null
          id?: number
          ip_address?: string | null
          new_data?: Json | null
          old_data?: Json | null
          record_id?: string | null
          table_name?: string | null
          target_user_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          change_details?: Json | null
          created_at?: string | null
          id?: number
          ip_address?: string | null
          new_data?: Json | null
          old_data?: Json | null
          record_id?: string | null
          table_name?: string | null
          target_user_id?: string | null
          user_agent?: string | null
          user_id?: string | null
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
          {
            foreignKeyName: "fk_bookings_accommodation"
            columns: ["accommodation_id"]
            isOneToOne: false
            referencedRelation: "accommodations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_bookings_tour"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string | null
          id: number
          is_read: boolean | null
          receiver_id: string | null
          sender_id: string | null
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: number
          is_read?: boolean | null
          receiver_id?: string | null
          sender_id?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: number
          is_read?: boolean | null
          receiver_id?: string | null
          sender_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      discount_coupons: {
        Row: {
          applicable_to: string[] | null
          code: string
          created_at: string | null
          current_uses: number | null
          description: string | null
          discount_percentage: number
          id: number
          max_uses: number | null
          min_purchase_amount: number | null
          partner_id: string | null
          updated_at: string | null
          valid_from: string
          valid_until: string
        }
        Insert: {
          applicable_to?: string[] | null
          code: string
          created_at?: string | null
          current_uses?: number | null
          description?: string | null
          discount_percentage: number
          id?: number
          max_uses?: number | null
          min_purchase_amount?: number | null
          partner_id?: string | null
          updated_at?: string | null
          valid_from: string
          valid_until: string
        }
        Update: {
          applicable_to?: string[] | null
          code?: string
          created_at?: string | null
          current_uses?: number | null
          description?: string | null
          discount_percentage?: number
          id?: number
          max_uses?: number | null
          min_purchase_amount?: number | null
          partner_id?: string | null
          updated_at?: string | null
          valid_from?: string
          valid_until?: string
        }
        Relationships: [
          {
            foreignKeyName: "discount_coupons_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      event_bookings: {
        Row: {
          attendee_info: Json | null
          created_at: string | null
          event_id: number | null
          id: number
          payment_details: Json | null
          payment_method: string | null
          payment_status: string
          status: string
          tickets: number
          total_price: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          attendee_info?: Json | null
          created_at?: string | null
          event_id?: number | null
          id?: number
          payment_details?: Json | null
          payment_method?: string | null
          payment_status: string
          status: string
          tickets?: number
          total_price: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          attendee_info?: Json | null
          created_at?: string | null
          event_id?: number | null
          id?: number
          payment_details?: Json | null
          payment_method?: string | null
          payment_status?: string
          status?: string
          tickets?: number
          total_price?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_bookings_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_sessions: {
        Row: {
          available_spots: number
          created_at: string
          custom_price: number | null
          description: string | null
          end_time: string
          event_id: number
          id: number
          name: string | null
          session_date: string
          start_time: string
          updated_at: string
        }
        Insert: {
          available_spots: number
          created_at?: string
          custom_price?: number | null
          description?: string | null
          end_time: string
          event_id: number
          id?: number
          name?: string | null
          session_date: string
          start_time: string
          updated_at?: string
        }
        Update: {
          available_spots?: number
          created_at?: string
          custom_price?: number | null
          description?: string | null
          end_time?: string
          event_id?: number
          id?: number
          name?: string | null
          session_date?: string
          start_time?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_sessions_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_tickets: {
        Row: {
          available_quantity: number
          benefits: string[] | null
          created_at: string
          description: string | null
          event_id: number
          id: number
          max_per_order: number | null
          name: string
          price: number
          type: string | null
          updated_at: string
        }
        Insert: {
          available_quantity: number
          benefits?: string[] | null
          created_at?: string
          description?: string | null
          event_id: number
          id?: number
          max_per_order?: number | null
          name: string
          price: number
          type?: string | null
          updated_at?: string
        }
        Update: {
          available_quantity?: number
          benefits?: string[] | null
          created_at?: string
          description?: string | null
          event_id?: number
          id?: number
          max_per_order?: number | null
          name?: string
          price?: number
          type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_tickets_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          available_spots: number
          capacity: number
          category: string
          created_at: string | null
          date: string
          description: string
          end_time: string
          gallery_images: string[] | null
          id: number
          image_url: string
          is_featured: boolean | null
          location: string
          name: string
          organizer: string | null
          partner_id: string | null
          policies: string | null
          price: number
          short_description: string
          start_time: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          available_spots: number
          capacity: number
          category: string
          created_at?: string | null
          date: string
          description: string
          end_time: string
          gallery_images?: string[] | null
          id?: number
          image_url: string
          is_featured?: boolean | null
          location: string
          name: string
          organizer?: string | null
          partner_id?: string | null
          policies?: string | null
          price: number
          short_description: string
          start_time: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          available_spots?: number
          capacity?: number
          category?: string
          created_at?: string | null
          date?: string
          description?: string
          end_time?: string
          gallery_images?: string[] | null
          id?: number
          image_url?: string
          is_featured?: boolean | null
          location?: string
          name?: string
          organizer?: string | null
          partner_id?: string | null
          policies?: string | null
          price?: number
          short_description?: string
          start_time?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      flight_bookings: {
        Row: {
          created_at: string | null
          flight_id: number | null
          id: number
          passenger_count: number
          passenger_details: Json
          payment_method: string | null
          payment_status: string
          status: string
          total_price: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          flight_id?: number | null
          id?: number
          passenger_count?: number
          passenger_details: Json
          payment_method?: string | null
          payment_status: string
          status: string
          total_price: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          flight_id?: number | null
          id?: number
          passenger_count?: number
          passenger_details?: Json
          payment_method?: string | null
          payment_status?: string
          status?: string
          total_price?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "flight_bookings_flight_id_fkey"
            columns: ["flight_id"]
            isOneToOne: false
            referencedRelation: "flights"
            referencedColumns: ["id"]
          },
        ]
      }
      flights: {
        Row: {
          airline: string
          arrival_airport: string
          arrival_time: string
          available_seats: number
          created_at: string | null
          departure_airport: string
          departure_time: string
          flight_number: string
          id: number
          price: number
          updated_at: string | null
        }
        Insert: {
          airline: string
          arrival_airport: string
          arrival_time: string
          available_seats: number
          created_at?: string | null
          departure_airport: string
          departure_time: string
          flight_number: string
          id?: number
          price: number
          updated_at?: string | null
        }
        Update: {
          airline?: string
          arrival_airport?: string
          arrival_time?: string
          available_seats?: number
          created_at?: string | null
          departure_airport?: string
          departure_time?: string
          flight_number?: string
          id?: number
          price?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_link: string | null
          created_at: string | null
          id: number
          is_read: boolean | null
          message: string
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          action_link?: string | null
          created_at?: string | null
          id?: number
          is_read?: boolean | null
          message: string
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          action_link?: string | null
          created_at?: string | null
          id?: number
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      partners: {
        Row: {
          address: string | null
          business_name: string
          business_type: string
          contact_email: string | null
          contact_phone: string | null
          cover_image: string | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          is_verified: boolean | null
          logo_url: string | null
          updated_at: string | null
          user_id: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          business_name: string
          business_type: string
          contact_email?: string | null
          contact_phone?: string | null
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          logo_url?: string | null
          updated_at?: string | null
          user_id?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          business_name?: string
          business_type?: string
          contact_email?: string | null
          contact_phone?: string | null
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          logo_url?: string | null
          updated_at?: string | null
          user_id?: string | null
          website?: string | null
        }
        Relationships: []
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
          partner_id: string | null
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
          partner_id?: string | null
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
          partner_id?: string | null
          price?: number
          status?: string
          stock?: number
          updated_at?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_reservations: {
        Row: {
          contact_email: string
          contact_phone: string
          created_at: string | null
          guests: number
          id: number
          reservation_date: string
          reservation_time: string
          restaurant_id: number | null
          restaurant_table_id: number | null
          special_requests: string | null
          status: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          contact_email: string
          contact_phone: string
          created_at?: string | null
          guests: number
          id?: number
          reservation_date: string
          reservation_time: string
          restaurant_id?: number | null
          restaurant_table_id?: number | null
          special_requests?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          contact_email?: string
          contact_phone?: string
          created_at?: string | null
          guests?: number
          id?: number
          reservation_date?: string
          reservation_time?: string
          restaurant_id?: number | null
          restaurant_table_id?: number | null
          special_requests?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_reservations_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "restaurant_reservations_restaurant_table_id_fkey"
            columns: ["restaurant_table_id"]
            isOneToOne: false
            referencedRelation: "restaurant_tables"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_tables: {
        Row: {
          capacity: number
          created_at: string | null
          id: number
          is_active: boolean | null
          location: string
          restaurant_id: number | null
          table_number: string
          updated_at: string | null
        }
        Insert: {
          capacity: number
          created_at?: string | null
          id?: number
          is_active?: boolean | null
          location: string
          restaurant_id?: number | null
          table_number: string
          updated_at?: string | null
        }
        Update: {
          capacity?: number
          created_at?: string | null
          id?: number
          is_active?: boolean | null
          location?: string
          restaurant_id?: number | null
          table_number?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_tables_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurants: {
        Row: {
          address: string
          created_at: string | null
          cuisine_type: string
          description: string
          gallery_images: string[] | null
          id: number
          image_url: string
          is_active: boolean | null
          is_featured: boolean | null
          location: string
          name: string
          opening_hours: Json
          partner_id: string | null
          payment_methods: string[] | null
          price_range: string
          rating: number | null
          reservation_policy: string | null
          short_description: string
          updated_at: string | null
        }
        Insert: {
          address: string
          created_at?: string | null
          cuisine_type: string
          description: string
          gallery_images?: string[] | null
          id?: number
          image_url: string
          is_active?: boolean | null
          is_featured?: boolean | null
          location: string
          name: string
          opening_hours: Json
          partner_id?: string | null
          payment_methods?: string[] | null
          price_range: string
          rating?: number | null
          reservation_policy?: string | null
          short_description: string
          updated_at?: string | null
        }
        Update: {
          address?: string
          created_at?: string | null
          cuisine_type?: string
          description?: string
          gallery_images?: string[] | null
          id?: number
          image_url?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          location?: string
          name?: string
          opening_hours?: Json
          partner_id?: string | null
          payment_methods?: string[] | null
          price_range?: string
          rating?: number | null
          reservation_policy?: string | null
          short_description?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurants_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: number
          images: string[] | null
          item_id: number
          item_type: string
          rating: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: number
          images?: string[] | null
          item_id: number
          item_type: string
          rating: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: number
          images?: string[] | null
          item_id?: number
          item_type?: string
          rating?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      tour_availability: {
        Row: {
          available_spots: number
          created_at: string
          custom_price: number | null
          date: string
          id: number
          status: string
          tour_id: number
          updated_at: string
        }
        Insert: {
          available_spots?: number
          created_at?: string
          custom_price?: number | null
          date: string
          id?: number
          status?: string
          tour_id: number
          updated_at?: string
        }
        Update: {
          available_spots?: number
          created_at?: string
          custom_price?: number | null
          date?: string
          id?: number
          status?: string
          tour_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tour_availability_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      tour_schedules: {
        Row: {
          available_spots: number
          created_at: string
          date: string
          end_time: string
          id: number
          price_override: number | null
          start_time: string
          tour_id: number
          updated_at: string
        }
        Insert: {
          available_spots: number
          created_at?: string
          date: string
          end_time: string
          id?: number
          price_override?: number | null
          start_time: string
          tour_id: number
          updated_at?: string
        }
        Update: {
          available_spots?: number
          created_at?: string
          date?: string
          end_time?: string
          id?: number
          price_override?: number | null
          start_time?: string
          tour_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tour_schedules_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
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
          is_active: boolean | null
          is_featured: boolean | null
          max_participants: number
          meeting_point: string | null
          min_participants: number
          notes: string[]
          partner_id: string | null
          price: number
          rating: number
          schedule: string[]
          search_vector: unknown | null
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
          is_active?: boolean | null
          is_featured?: boolean | null
          max_participants: number
          meeting_point?: string | null
          min_participants?: number
          notes?: string[]
          partner_id?: string | null
          price: number
          rating: number
          schedule?: string[]
          search_vector?: unknown | null
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
          is_active?: boolean | null
          is_featured?: boolean | null
          max_participants?: number
          meeting_point?: string | null
          min_participants?: number
          notes?: string[]
          partner_id?: string | null
          price?: number
          rating?: number
          schedule?: string[]
          search_vector?: unknown | null
          short_description?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tours_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      user_coupons: {
        Row: {
          claimed_at: string | null
          coupon_id: number | null
          id: number
          is_used: boolean | null
          used_at: string | null
          user_id: string | null
        }
        Insert: {
          claimed_at?: string | null
          coupon_id?: number | null
          id?: number
          is_used?: boolean | null
          used_at?: string | null
          user_id?: string | null
        }
        Update: {
          claimed_at?: string | null
          coupon_id?: number | null
          id?: number
          is_used?: boolean | null
          used_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_coupons_coupon_id_fkey"
            columns: ["coupon_id"]
            isOneToOne: false
            referencedRelation: "discount_coupons"
            referencedColumns: ["id"]
          },
        ]
      }
      user_permissions: {
        Row: {
          granted_at: string | null
          granted_by: string | null
          id: string
          permission: string
          user_id: string | null
        }
        Insert: {
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          permission: string
          user_id?: string | null
        }
        Update: {
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          permission?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          city: string | null
          country: string | null
          created_at: string
          email: string | null
          id: string
          is_admin: boolean | null
          is_partner: boolean | null
          name: string | null
          phone: string | null
          preferences: Json | null
          state: string | null
          updated_at: string
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          id: string
          is_admin?: boolean | null
          is_partner?: boolean | null
          name?: string | null
          phone?: string | null
          preferences?: Json | null
          state?: string | null
          updated_at?: string
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_admin?: boolean | null
          is_partner?: boolean | null
          name?: string | null
          phone?: string | null
          preferences?: Json | null
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
          partner_type: string | null
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          partner_type?: string | null
          role: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          partner_type?: string | null
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      vehicle_bookings: {
        Row: {
          created_at: string | null
          end_date: string
          guests: number
          id: number
          payment_method: string | null
          payment_status: string
          special_requests: string | null
          start_date: string
          status: string
          total_price: number
          updated_at: string | null
          user_id: string | null
          vehicle_id: number | null
        }
        Insert: {
          created_at?: string | null
          end_date: string
          guests?: number
          id?: number
          payment_method?: string | null
          payment_status: string
          special_requests?: string | null
          start_date: string
          status: string
          total_price: number
          updated_at?: string | null
          user_id?: string | null
          vehicle_id?: number | null
        }
        Update: {
          created_at?: string | null
          end_date?: string
          guests?: number
          id?: number
          payment_method?: string | null
          payment_status?: string
          special_requests?: string | null
          start_date?: string
          status?: string
          total_price?: number
          updated_at?: string | null
          user_id?: string | null
          vehicle_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_bookings_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_units: {
        Row: {
          created_at: string
          id: number
          identifier: string
          last_maintenance: string | null
          next_maintenance: string | null
          notes: string | null
          status: string
          updated_at: string
          vehicle_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          identifier: string
          last_maintenance?: string | null
          next_maintenance?: string | null
          notes?: string | null
          status?: string
          updated_at?: string
          vehicle_id: number
        }
        Update: {
          created_at?: string
          id?: number
          identifier?: string
          last_maintenance?: string | null
          next_maintenance?: string | null
          notes?: string | null
          status?: string
          updated_at?: string
          vehicle_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_units_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          available_quantity: number
          created_at: string | null
          description: string
          features: string[] | null
          gallery_images: string[] | null
          id: number
          image_url: string
          is_available: boolean | null
          name: string
          partner_id: string | null
          price_per_day: number
          rating: number | null
          short_description: string
          type: string
          updated_at: string | null
        }
        Insert: {
          available_quantity?: number
          created_at?: string | null
          description: string
          features?: string[] | null
          gallery_images?: string[] | null
          id?: number
          image_url: string
          is_available?: boolean | null
          name: string
          partner_id?: string | null
          price_per_day: number
          rating?: number | null
          short_description: string
          type: string
          updated_at?: string | null
        }
        Update: {
          available_quantity?: number
          created_at?: string | null
          description?: string
          features?: string[] | null
          gallery_images?: string[] | null
          id?: number
          image_url?: string
          is_available?: boolean | null
          name?: string
          partner_id?: string | null
          price_per_day?: number
          rating?: number | null
          short_description?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      wishlist_items: {
        Row: {
          added_at: string | null
          id: number
          item_id: number
          item_type: string
          user_id: string | null
        }
        Insert: {
          added_at?: string | null
          id?: number
          item_id: number
          item_type: string
          user_id?: string | null
        }
        Update: {
          added_at?: string | null
          id?: number
          item_id?: number
          item_type?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      book_event_tickets: {
        Args: {
          p_event_id: number
          p_user_id: string
          p_ticket_count: number
          p_total_price: number
          p_ticket_data: Json
        }
        Returns: Json
      }
      check_restaurant_availability: {
        Args: {
          p_restaurant_id: number
          p_date: string
          p_time: string
          p_guests: number
        }
        Returns: {
          table_id: number
          capacity: number
          available: boolean
        }[]
      }
      create_event_ticket: {
        Args: {
          p_event_id: number
          p_name: string
          p_price: number
          p_available_quantity: number
          p_max_per_order?: number
          p_description?: string
          p_type?: string
          p_benefits?: string[]
        }
        Returns: Json
      }
      delete_event_tickets: {
        Args: { p_event_id: number }
        Returns: Json
      }
      get_event_tickets: {
        Args: { p_event_id: number }
        Returns: {
          available_quantity: number
          benefits: string[] | null
          created_at: string
          description: string | null
          event_id: number
          id: number
          max_per_order: number | null
          name: string
          price: number
          type: string | null
          updated_at: string
        }[]
      }
      get_user_role: {
        Args: { user_id: string }
        Returns: string
      }
      grant_permission: {
        Args: { target_user_id: string; permission_name: string }
        Returns: boolean
      }
      is_user_master: {
        Args: { user_id: string }
        Returns: boolean
      }
      promote_to_master: {
        Args: { target_user_id: string }
        Returns: boolean
      }
      revoke_all_permissions: {
        Args: { target_user_id: string }
        Returns: boolean
      }
      revoke_permission: {
        Args: { target_user_id: string; permission_name: string }
        Returns: boolean
      }
      user_has_permission: {
        Args: { user_id: string; required_permission: string }
        Returns: boolean
      }
    }
    Enums: {
      accommodation_type:
        | "hotel"
        | "resort"
        | "pousada"
        | "hostel"
        | "apartment"
        | "camping"
      activity_level: "low" | "moderate" | "high" | "extreme"
      app_role: "admin" | "customer" | "partner" | "master"
      budget_range: "economy" | "moderate" | "premium" | "luxury"
      travel_style:
        | "leisure"
        | "adventure"
        | "culture"
        | "luxury"
        | "budget"
        | "family"
        | "business"
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
      accommodation_type: [
        "hotel",
        "resort",
        "pousada",
        "hostel",
        "apartment",
        "camping",
      ],
      activity_level: ["low", "moderate", "high", "extreme"],
      app_role: ["admin", "customer", "partner", "master"],
      budget_range: ["economy", "moderate", "premium", "luxury"],
      travel_style: [
        "leisure",
        "adventure",
        "culture",
        "luxury",
        "budget",
        "family",
        "business",
      ],
    },
  },
} as const
