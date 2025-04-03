
export interface Booking {
  id: string;
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
  created_at: string;
}
