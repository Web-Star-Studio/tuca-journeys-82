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
      packages: OriginalDatabase['public']['Tables']['packages'];
      partners: OriginalDatabase['public']['Tables']['partners'];
      products: OriginalDatabase['public']['Tables']['products'];
      reviews: OriginalDatabase['public']['Tables']['reviews'];
      tour_bookings: OriginalDatabase['public']['Tables']['tour_bookings'];
      tours: OriginalDatabase['public']['Tables']['tours'];
      user_profiles: OriginalDatabase['public']['Tables']['user_profiles'];
      wishlist_items: OriginalDatabase['public']['Tables']['wishlist_items'];
      
      // Add our new travel_preferences table
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
          dietary_restrictions?: string[];
          special_requests?: string;
          travel_dates?: {
            start_date?: string;
            end_date?: string;
          };
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
          dietary_restrictions?: string[];
          special_requests?: string;
          travel_dates?: {
            start_date?: string;
            end_date?: string;
          };
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
          dietary_restrictions?: string[];
          special_requests?: string;
          travel_dates?: {
            start_date?: string;
            end_date?: string;
          };
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
