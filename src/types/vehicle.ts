
export interface Vehicle {
  id: number;
  partner_id: string;
  name: string;
  description: string;
  short_description: string;
  type: string;
  price_per_day: number;
  image_url: string;
  gallery_images: string[];
  available_quantity: number;
  features: string[];
  is_available: boolean;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface VehicleBooking {
  id: number;
  user_id: string;
  vehicle_id: number;
  start_date: string;
  end_date: string;
  guests: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'refunded';
  payment_method?: string;
  special_requests?: string;
  created_at: string;
  updated_at: string;
}
