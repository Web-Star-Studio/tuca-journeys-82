
// Add these interfaces to the existing types/database.ts file

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
  status: 'active' | 'out_of_stock' | 'discontinued';
  weight?: number;
  dimensions?: string;
  gallery?: string[];
  featured?: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  created_at: string;
  updated_at: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  travel_style?: string;
  activities?: string[];
  accommodation_types?: string[];
  budget_range?: string;
  travel_frequency?: string;
  notifications?: NotificationPreferences;
}

export interface NotificationPreferences {
  email?: boolean;
  push?: boolean;
  sms?: boolean;
  marketing?: boolean;
  recommendations?: boolean;
  booking_updates?: boolean;
}

export interface Booking {
  id: number;
  user_id: string;
  tour_id?: number;
  accommodation_id?: number;
  package_id?: number;
  start_date: string;
  end_date: string;
  guests: number;
  total_price: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  payment_status: 'paid' | 'pending' | 'refunded';
  payment_method?: string;
  special_requests?: string;
  created_at: string;
  updated_at: string;
  tours?: Tour;
  accommodations?: Accommodation;
}

export interface Tour {
  id: number;
  title: string;
  short_description: string;
  description: string;
  category: string;
  duration: string;
  difficulty: string;
  price: number;
  min_participants: number;
  max_participants: number;
  image_url: string;
  gallery_images: string[];
  schedule: string[];
  includes: string[];
  excludes: string[];
  meeting_point?: string;
  notes: string[];
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface Accommodation {
  id: number;
  title: string;
  short_description: string;
  description: string;
  type: string;
  address: string;
  price_per_night: number;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  amenities: string[];
  image_url: string;
  gallery_images: string[];
  rating: number;
  created_at: string;
  updated_at: string;
  // Add the missing fields that are being used in the code
  capacity?: number;
  location?: string;
  gallery?: string[];
}
