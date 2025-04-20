
export interface Booking {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  tour_id?: number | null;
  accommodation_id?: number | null;
  event_id?: number | null;
  vehicle_id?: number | null;
  item_type: 'tour' | 'accommodation' | 'event' | 'vehicle';
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
  updated_at: string;
}

export interface CreateBookingDTO {
  user_id: string;
  tour_id?: number;
  accommodation_id?: number;
  event_id?: number;
  vehicle_id?: number;
  start_date: string;
  end_date: string;
  guests?: number;
  number_of_guests?: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  payment_status?: 'paid' | 'pending' | 'refunded';
  payment_method?: string;
  special_requests?: string;
}
