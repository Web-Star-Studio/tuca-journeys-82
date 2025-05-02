
export interface Restaurant {
  id: number;
  name: string;
  description: string;
  short_description: string;
  address: string;
  location: string;
  image_url: string;
  gallery_images?: string[];
  cuisine_type: string;
  price_range: string;
  opening_hours: RestaurantHours;
  payment_methods?: string[];
  reservation_policy?: string;
  partner_id?: string;
  is_featured: boolean;
  is_active: boolean;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface RestaurantHours {
  monday?: { open: string; close: string };
  tuesday?: { open: string; close: string };
  wednesday?: { open: string; close: string };
  thursday?: { open: string; close: string };
  friday?: { open: string; close: string };
  saturday?: { open: string; close: string };
  sunday?: { open: string; close: string };
}

export interface RestaurantTable {
  id: number;
  restaurant_id: number;
  capacity: number;
  table_number: string;
  location: string; // "indoor", "outdoor", "terrace", etc.
  is_active: boolean;
}

export interface RestaurantReservation {
  id: number;
  restaurant_id: number;
  user_id: string;
  restaurant_table_id?: number;
  reservation_date: string;
  reservation_time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  special_requests?: string;
  contact_phone: string;
  contact_email: string;
  created_at: string;
  updated_at: string;
}

export interface RestaurantFilters {
  searchQuery?: string;
  cuisine_type?: string[];
  price_range?: string[];
  rating?: number;
  sortBy?: 'rating' | 'name' | 'price_low' | 'price_high';
}

export interface AvailableTable {
  table_id: number;
  capacity: number;
  available: boolean;
}
