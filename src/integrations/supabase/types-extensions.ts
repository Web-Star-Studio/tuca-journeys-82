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
      
      event_tickets: {
        Row: {
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
        };
        Insert: {
          id?: number;
          event_id: number;
          name: string;
          description?: string | null;
          price: number;
          available_quantity: number;
          max_per_order?: number | null;
          type?: string | null;
          benefits?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          event_id?: number;
          name?: string;
          description?: string | null;
          price?: number;
          available_quantity?: number;
          max_per_order?: number | null;
          type?: string | null;
          benefits?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "event_tickets_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          }
        ];
      }
    };
    Views: OriginalDatabase['public']['Views'];
    Functions: OriginalDatabase['public']['Functions'] & {
      // Add our new RPC functions
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
    };
    Enums: OriginalDatabase['public']['Enums'];
    CompositeTypes: OriginalDatabase['public']['CompositeTypes'];
  };
}
