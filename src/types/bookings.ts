
import { Tour, Accommodation } from './database';

// Expanding the Booking interface to match the expected properties in the UI
export interface Booking {
  id: string;
  user_id?: string;
  user_name: string;
  user_email: string;
  item_type: 'tour' | 'accommodation' | 'package';
  item_name: string;
  start_date: string;
  end_date: string;
  guests: number;
  total_price: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  payment_status: 'paid' | 'pending' | 'refunded';
  payment_method?: string | null;
  special_requests?: string | null;
  created_at: string;
  updated_at?: string;
  tour_id?: number | null;
  accommodation_id?: number | null;
  tours?: Tour;
  accommodations?: Accommodation;
}

// Define a new interface for the database booking structure
export interface BookingDB {
  id: number;
  user_id: string;
  tour_id?: number | null;
  accommodation_id?: number | null;
  start_date: string;
  end_date: string;
  guests: number;
  total_price: number;
  status: string;
  payment_status: string;
  payment_method?: string | null;
  special_requests?: string | null;
  created_at: string;
  updated_at: string;
  tours?: Tour;
  accommodations?: Accommodation;
}

// Type for creating a booking
export interface CreateBookingDTO {
  user_id: string;
  tour_id?: number | null;
  accommodation_id?: number | null;
  start_date: string;
  end_date: string;
  guests: number;
  total_price: number;
  status: string;
  payment_status: string;
  payment_method?: string | null;
  special_requests?: string | null;
}
