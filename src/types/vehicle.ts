
export interface Vehicle {
  id: number;
  name: string;
  type: string;
  description: string;
  short_description: string;
  image_url: string;
  gallery_images?: string[];
  price_per_day: number;
  features?: string[];
  available_quantity: number;
  is_available: boolean;
  rating?: number;
  created_at?: string;
  updated_at?: string;
  partner_id?: string;
}

export interface VehicleBooking {
  id: number;
  user_id: string;
  vehicle_id: number;
  start_date: string;
  end_date: string;
  guests: number;
  total_price: number;
  special_requests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'refunded';
  payment_method?: string;
  created_at: string;
  updated_at: string;
}
