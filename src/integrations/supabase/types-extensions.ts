
import { Database as OriginalDatabase } from './types';

export interface Database extends OriginalDatabase {
  public: {
    Tables: {
      // Include all original tables from the base Database type
      [K in keyof OriginalDatabase['public']['Tables']]: OriginalDatabase['public']['Tables'][K];
      
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
