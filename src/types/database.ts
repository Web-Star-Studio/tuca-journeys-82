// Supabase types
export interface Tour {
  id: number;
  created_at: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  image_url: string;
  location: string;
  is_available: boolean;
  category: string;
}

export interface Accommodation {
  id: number;
  created_at: string;
  name: string;
  description: string;
  price_per_night: number;
  image_url: string;
  location: string;
  is_available: boolean;
  category: string;
}

export interface Booking {
  id: string;
  created_at: string;
  user_id: string;
  tour_id?: number;
  accommodation_id?: number;
  start_date: string;
  end_date: string;
  number_of_guests: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  updated_at?: string;
}

export interface UserProfile {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  updated_at?: string;
}

export interface Product {
  id: number;
  created_at: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_available: boolean;
  category: string;
}

export interface UserPreferences {
  id?: string;
  user_id: string;
  travel_style: string;
  activities: string[];
  accommodation_types: string[];
  budget_range: string;
  travel_frequency: string;
  notifications?: {
    email: boolean;
    push: boolean;
    sms: boolean;
    marketing: boolean;
    recommendations: boolean;
    booking_updates: boolean;
  };
  created_at?: string;
  updated_at?: string;
}
