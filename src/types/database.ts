
// Update the types file to include event_id and vehicle_id in database booking
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface Tour {
  id: number;
  title: string;
  description: string;
  short_description: string;
  duration: string;
  price: number;
  image_url: string;
  location?: string;
  meeting_point: string;
  is_available: boolean; // Added this field explicitly
  category: string;
  max_participants: number;
  min_participants: number;
  difficulty: string;
  rating: number;
  schedule: string[];
  includes: string[];
  excludes: string[];
  notes: string[];
  gallery_images: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Accommodation {
  id: number;
  title: string;
  description: string;
  short_description: string;
  price_per_night: number;
  image_url: string;
  location?: string;
  address: string;
  is_available: boolean; // Added this field explicitly
  category: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  amenities: string[];
  gallery_images: string[];
  rating: number;
  partner_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DatabaseBooking {
  id: number | string;
  user_id: string;
  tour_id?: number | null;
  accommodation_id?: number | null;
  event_id?: number | null;
  vehicle_id?: number | null;
  start_date: string;
  end_date: string;
  guests: number;
  total_price: number;
  status: string;
  payment_status: string;
  payment_method: string | null;
  special_requests: string | null;
  created_at: string;
  updated_at: string;
  tours?: Tour;
  accommodations?: Accommodation;
}

// Add Booking type for backward compatibility
export interface Booking extends DatabaseBooking {}

// Add Product interface to fix the type error
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
  status: string;
  featured: boolean;
  created_at?: string;
  updated_at?: string;
}

// Add UserPreferences interface for user preferences
export interface UserPreferences {
  user_id: string;
  travel_style?: 'adventure' | 'relaxation' | 'cultural' | 'gastronomy' | 'ecotourism' | string;
  activities?: string[];
  accommodation_types?: string[];
  budget_range?: 'economy' | 'medium' | 'premium' | 'luxury' | string;
  travel_frequency?: 'monthly' | 'quarterly' | 'biannual' | 'annual' | string;
  notifications?: {
    email: boolean;
    push: boolean;
    sms: boolean;
    marketing: boolean;
    recommendations: boolean;
    booking_updates: boolean;
  };
  updated_at?: string;
}
