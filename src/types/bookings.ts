
export interface Booking {
  id: string;
  user_id: string;
  tour_id?: number;
  accommodation_id?: number;
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
}

export interface CreateBookingDTO {
  user_id: string;
  tour_id?: number;
  accommodation_id?: number;
  start_date: string;
  end_date: string;
  number_of_guests: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  payment_method?: string;
}
