// Supabase types
export interface Tour {
  id: number;
  created_at: string;
  updated_at?: string;
  name?: string;
  title: string;
  description: string;
  short_description: string;
  duration: string;
  price: number;
  image_url: string;
  location?: string;
  meeting_point?: string;
  is_available?: boolean;
  category: string;
  max_participants: number;
  min_participants: number;
  difficulty: string; // Changed from optional to required
  rating: number;
  schedule: string[];
  includes: string[];
  excludes: string[];
  notes: string[];
  gallery_images: string[];
  is_featured?: boolean;
  is_active?: boolean;
}

export interface Accommodation {
  id: number;
  created_at: string;
  updated_at?: string;
  name?: string;
  title: string;
  description: string;
  short_description: string;
  price_per_night: number;
  image_url: string;
  location?: string;
  address: string;
  is_available?: boolean;
  category?: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  amenities: string[];
  gallery_images: string[];
  rating: number;
  is_featured?: boolean;  // Explicitly declared to match database schema
}

export interface AccommodationAvailability {
  id: number;
  accommodation_id: number;
  date: string;
  status: string; // Changed from literal type to string to match database
  custom_price?: number | null;
  created_at: string;
  updated_at: string;
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
  payment_method?: string;
  special_requests?: string;
  tours?: Tour;
  accommodations?: Accommodation;
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
  featured?: boolean;  // Add featured field
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
