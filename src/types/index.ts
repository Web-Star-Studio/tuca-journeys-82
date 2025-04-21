
// Re-export all types from this central file
import { Json, Database } from '@/integrations/supabase/types';

// Export common database types
export type { Accommodation, Tour, UserProfile } from './database';

// Define UserPreferences type to match the database schema and be properly serializable
export interface UserPreferences {
  travel_style?: string;
  activities?: string[];
  accommodation_types?: string[];
  budget_range?: string;
  travel_frequency?: string;
  dietary_restrictions?: {
    vegetarian?: boolean;
    vegan?: boolean;
    gluten_free?: boolean;
    other?: string;
  };
  accessibility?: {
    wheelchair?: boolean;
    limited_mobility?: boolean;
    other?: string;
  };
  transport_modes?: string[];
  notifications?: {
    marketing?: boolean;
    booking_updates?: boolean;
    recommendations?: boolean;
  };
}

// Re-export Product from database.ts to maintain compatibility
export type { Product } from './database';

// Re-export UI-specific types
export type { Booking as UIBooking } from './bookings';
export type { Event as UIEvent } from './event';

// Export types with custom naming
export { type Product as UIProduct } from './product';
export { type Product as DatabaseProduct } from './database';

// Re-export DiscountCoupon type for components that need it
export interface DiscountCoupon {
  id: number;
  code: string;
  description?: string;
  discount_percentage: number;
  valid_from: string;
  valid_until: string;
  max_uses?: number;
  current_uses?: number;
  min_purchase_amount?: number;
  partner_id?: string;
  applicable_to?: string[];
  created_at?: string;
  updated_at?: string;
}
