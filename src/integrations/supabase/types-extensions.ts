import { Database as OriginalDatabase } from './types';

// Extend the original Database type with our custom tables
export interface Database extends OriginalDatabase {
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
      
      // Add missing tables that are referenced in the codebase
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
        Relationships: [];
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
      
      // Add our travel_preferences table
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
    };
    Views: OriginalDatabase['public']['Views'];
    Functions: OriginalDatabase['public']['Functions'];
    Enums: OriginalDatabase['public']['Enums'];
    CompositeTypes: OriginalDatabase['public']['CompositeTypes'];
  };
}
