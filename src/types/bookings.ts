
export interface Booking {
  id: string;
  user_id: string;
  tour_id?: number;
  accommodation_id?: number;
  event_id?: number;
  vehicle_id?: number;
  item_type: 'tour' | 'accommodation' | 'event' | 'vehicle';
  item_name: string;
  user_name: string;
  user_email: string;
  start_date: string;
  end_date: string;
  guests: number;
  total_price: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  payment_status: 'paid' | 'pending' | 'refunded';
  payment_method?: string;
  created_at: string;
  updated_at: string;
  special_requests?: string; // Adding this to match usage in api.ts
}

export interface CreateBookingDTO {
  user_id: string;
  tour_id?: number;
  accommodation_id?: number;
  event_id?: number; // Added for event bookings
  vehicle_id?: number; // Added for vehicle rentals
  start_date: string;
  end_date: string;
  number_of_guests: number; // Making this non-optional to match usage in booking-service
  guests: number; // Making this non-optional
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  payment_status?: 'paid' | 'pending' | 'refunded';
  notes?: string;
  payment_method?: string;
  special_requests?: string;
}
