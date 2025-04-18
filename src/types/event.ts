
export interface Event {
  id: number;
  partner_id: string;
  name: string;
  description: string;
  short_description: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  price: number;
  image_url: string;
  gallery_images?: string[];
  capacity: number;
  available_spots: number;
  category: string;
  is_featured?: boolean;
  featured?: boolean; // Added for backward compatibility
  status?: 'scheduled' | 'ongoing' | 'completed' | 'cancelled'; // Added to match implementation
  organizer?: string; // Added to match implementation
  created_at?: string;
  updated_at?: string;
}

export interface EventBooking {
  id: number;
  user_id: string;
  event_id: number;
  tickets: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'refunded';
  payment_method?: string;
  created_at: string;
  updated_at: string;
}
