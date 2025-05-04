import { Database as OriginalDatabase } from './types';

// Extend the original Database type with our custom tables
export interface Database extends Omit<OriginalDatabase, 'public'> {
  public: {
    Tables: {
      // For all existing tables in the original database, keep them as is
      accommodation_availability: OriginalDatabase['public']['Tables']['accommodation_availability'];
      accommodations: OriginalDatabase['public']['Tables']['accommodations'];
      bookings: OriginalDatabase['public']['Tables']['bookings'];
      chat_messages: OriginalDatabase['public']['Tables']['chat_messages'];
      discount_coupons: OriginalDatabase['public']['Tables']['discount_coupons'];
      event_bookings: OriginalDatabase['public']['Tables']['event_bookings'];
      events: OriginalDatabase['public']['Tables']['events'];
      flight_bookings: OriginalDatabase['public']['Tables']['flight_bookings'];
      flights: OriginalDatabase['public']['Tables']['flights'];
      notifications: OriginalDatabase['public']['Tables']['notifications'];
      partners: OriginalDatabase['public']['Tables']['partners'];
      products: OriginalDatabase['public']['Tables']['products'];
      reviews: OriginalDatabase['public']['Tables']['reviews'];
      tours: OriginalDatabase['public']['Tables']['tours'];
      tour_schedules: OriginalDatabase['public']['Tables']['tour_schedules'];
      user_profiles: OriginalDatabase['public']['Tables']['user_profiles'];
      wishlist_items: OriginalDatabase['public']['Tables']['wishlist_items'];
      user_coupons: OriginalDatabase['public']['Tables']['user_coupons'];
      vehicle_bookings: OriginalDatabase['public']['Tables']['vehicle_bookings'];
      vehicle_units: OriginalDatabase['public']['Tables']['vehicle_units'];
      vehicles: OriginalDatabase['public']['Tables']['vehicles'];
      event_tickets: OriginalDatabase['public']['Tables']['event_tickets'];
      
      // Add our new tables with overriding Relationships if needed
      audit_logs: {
        Row: {
          id: number;
          user_id: string | null;
          action: string;
          table_name: string | null;
          record_id: string | null;
          old_data: any | null;
          new_data: any | null;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string | null;
          target_user_id: string | null;
          change_details: any | null;
        };
        Insert: {
          id?: number;
          user_id?: string | null;
          action: string;
          table_name?: string | null;
          record_id?: string | null;
          old_data?: any | null;
          new_data?: any | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string | null;
          target_user_id?: string | null;
          change_details?: any | null;
        };
        Update: {
          id?: number;
          user_id?: string | null;
          action?: string;
          table_name?: string | null;
          record_id?: string | null;
          old_data?: any | null;
          new_data?: any | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string | null;
          target_user_id?: string | null;
          change_details?: any | null;
        };
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "audit_logs_target_user_id_fkey";
            columns: ["target_user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      
      user_roles: {
        Row: {
          id: string;
          user_id: string;
          role: string;
          created_at: string;
          updated_at: string;
          partner_type: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          role: string;
          created_at?: string;
          updated_at?: string;
          partner_type?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          role?: string;
          created_at?: string;
          updated_at?: string;
          partner_type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      
      user_permissions: {
        Row: {
          id: string;
          user_id: string;
          permission: string;
          granted_by: string | null;
          granted_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          permission: string;
          granted_by?: string | null;
          granted_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          permission?: string;
          granted_by?: string | null;
          granted_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_permissions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_permissions_granted_by_fkey";
            columns: ["granted_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      
      tour_bookings: {
        Row: {
          id: number;
          booking_id: number;
          tour_schedule_id: number;
          guests: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          booking_id: number;
          tour_schedule_id: number;
          guests: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          booking_id?: number;
          tour_schedule_id?: number;
          guests?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tour_bookings_booking_id_fkey";
            columns: ["booking_id"];
            isOneToOne: false;
            referencedRelation: "bookings";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tour_bookings_tour_schedule_id_fkey";
            columns: ["tour_schedule_id"];
            isOneToOne: false;
            referencedRelation: "tour_schedules";
            referencedColumns: ["id"];
          }
        ];
      };
      
      packages: {
        Row: {
          id: number;
          name: string;
          title: string;
          description: string;
          short_description: string;
          price: number;
          image_url: string;
          duration: number;
          max_guests: number;
          itinerary: any;
          includes: string[];
          excludes: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          title: string;
          description: string;
          short_description: string;
          price: number;
          image_url: string;
          duration: number;
          max_guests: number;
          itinerary?: any;
          includes?: string[];
          excludes?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          title?: string;
          description?: string;
          short_description?: string;
          price?: number;
          image_url?: string;
          duration?: number;
          max_guests?: number;
          itinerary?: any;
          includes?: string[];
          excludes?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      
      travel_preferences: {
        Row: {
          id: string;
          user_id: string;
          travel_style: string;
          group_size: number;
          trip_duration: number;
          activities: string[];
          accommodation_types: string[];
          budget_range: string;
          dietary_restrictions?: string[] | null;
          special_requests?: string | null;
          travel_dates?: {
            start_date?: string;
            end_date?: string;
          } | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          travel_style: string;
          group_size: number;
          trip_duration: number;
          activities: string[];
          accommodation_types: string[];
          budget_range: string;
          dietary_restrictions?: string[] | null;
          special_requests?: string | null;
          travel_dates?: {
            start_date?: string;
            end_date?: string;
          } | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          travel_style?: string;
          group_size?: number;
          trip_duration?: number;
          activities?: string[];
          accommodation_types?: string[];
          budget_range?: string;
          dietary_restrictions?: string[] | null;
          special_requests?: string | null;
          travel_dates?: {
            start_date?: string;
            end_date?: string;
          } | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "travel_preferences_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      
      restaurants: {
        Row: {
          id: number;
          name: string;
          description: string;
          short_description: string;
          address: string;
          location: string;
          image_url: string;
          gallery_images: string[] | null;
          cuisine_type: string;
          price_range: string;
          opening_hours: any;
          payment_methods: string[] | null;
          reservation_policy: string | null;
          partner_id: string | null;
          is_featured: boolean | null;
          is_active: boolean | null;
          rating: number | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: number;
          name: string;
          description: string;
          short_description: string;
          address: string;
          location: string;
          image_url: string;
          gallery_images?: string[] | null;
          cuisine_type: string;
          price_range: string;
          opening_hours: any;
          payment_methods?: string[] | null;
          reservation_policy?: string | null;
          partner_id?: string | null;
          is_featured?: boolean | null;
          is_active?: boolean | null;
          rating?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: number;
          name?: string;
          description?: string;
          short_description?: string;
          address?: string;
          location?: string;
          image_url?: string;
          gallery_images?: string[] | null;
          cuisine_type?: string;
          price_range?: string;
          opening_hours?: any;
          payment_methods?: string[] | null;
          reservation_policy?: string | null;
          partner_id?: string | null;
          is_featured?: boolean | null;
          is_active?: boolean | null;
          rating?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "restaurants_partner_id_fkey";
            columns: ["partner_id"];
            isOneToOne: false;
            referencedRelation: "partners";
            referencedColumns: ["id"];
          }
        ];
      };
      
      restaurant_tables: {
        Row: {
          id: number;
          restaurant_id: number | null;
          table_number: string;
          capacity: number;
          location: string;
          is_active: boolean | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: number;
          restaurant_id?: number | null;
          table_number: string;
          capacity: number;
          location: string;
          is_active?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: number;
          restaurant_id?: number | null;
          table_number?: string;
          capacity?: number;
          location?: string;
          is_active?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "restaurant_tables_restaurant_id_fkey";
            columns: ["restaurant_id"];
            isOneToOne: false;
            referencedRelation: "restaurants";
            referencedColumns: ["id"];
          }
        ];
      };
      
      restaurant_reservations: {
        Row: {
          id: number;
          restaurant_id: number | null;
          user_id: string | null;
          restaurant_table_id: number | null;
          reservation_date: string;
          reservation_time: string;
          guests: number;
          status: string;
          special_requests: string | null;
          contact_phone: string;
          contact_email: string;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: number;
          restaurant_id?: number | null;
          user_id?: string | null;
          restaurant_table_id?: number | null;
          reservation_date: string;
          reservation_time: string;
          guests: number;
          status?: string;
          special_requests?: string | null;
          contact_phone: string;
          contact_email: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: number;
          restaurant_id?: number | null;
          user_id?: string | null;
          restaurant_table_id?: number | null;
          reservation_date?: string;
          reservation_time?: string;
          guests?: number;
          status?: string;
          special_requests?: string | null;
          contact_phone?: string;
          contact_email?: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "restaurant_reservations_restaurant_id_fkey";
            columns: ["restaurant_id"];
            isOneToOne: false;
            referencedRelation: "restaurants";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "restaurant_reservations_restaurant_table_id_fkey";
            columns: ["restaurant_table_id"];
            isOneToOne: false;
            referencedRelation: "restaurant_tables";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: OriginalDatabase['public']['Views'];
    Functions: OriginalDatabase['public']['Functions'] & {
      grant_permission: {
        Args: {
          target_user_id: string;
          permission_name: string;
        };
        Returns: boolean;
      };
      revoke_permission: {
        Args: {
          target_user_id: string;
          permission_name: string;
        };
        Returns: boolean;
      };
      revoke_all_permissions: {
        Args: {
          target_user_id: string;
        };
        Returns: boolean;
      };
      user_has_permission: {
        Args: {
          user_id: string;
          required_permission: string;
        };
        Returns: boolean;
      };
      create_event_ticket: {
        Args: {
          p_event_id: number;
          p_name: string;
          p_price: number;
          p_available_quantity: number;
          p_max_per_order?: number;
          p_description?: string | null;
          p_type?: string;
          p_benefits?: string[];
        };
        Returns: any;
      };
      get_event_tickets: {
        Args: {
          p_event_id: number;
        };
        Returns: {
          id: number;
          event_id: number;
          name: string;
          description: string | null;
          price: number;
          available_quantity: number;
          max_per_order: number | null;
          type: string | null;
          benefits: string[] | null;
          created_at: string;
          updated_at: string;
        }[];
      };
      delete_event_tickets: {
        Args: {
          p_event_id: number;
        };
        Returns: any;
      };
      check_restaurant_availability: {
        Args: {
          p_restaurant_id: number;
          p_date: string;
          p_time: string;
          p_guests: number;
        };
        Returns: {
          table_id: number;
          capacity: number;
          available: boolean;
        }[];
      };
    };
    Enums: OriginalDatabase['public']['Enums'];
    CompositeTypes: OriginalDatabase['public']['CompositeTypes'];
  };
}
