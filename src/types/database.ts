export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip_code?: string;
  birthdate?: string;
  gender?: string;
  document_number?: string;
  document_type?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
  is_admin?: boolean;
  is_partner?: boolean;
  preferences?: any;
}

export interface UserPreferences {
  user_id: string;
  travel_style?: string;
  activities?: string[];
  accommodation_types?: string[];
  budget_range?: string;
  travel_frequency?: string;
  transport_modes?: string[];
  dietary_restrictions?: {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    other?: string;
  };
  accessibility?: {
    mobilitySupport: boolean;
    visualAids: boolean;
    hearingAids: boolean;
    other?: string;
  };
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    marketing: boolean;
    recommendations: boolean;
    booking_updates: boolean;
  };
  updated_at?: string;
}

export interface DatabaseBooking {
  id: number;
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
  payment_method?: string | null;
  special_requests?: string | null;
  created_at: string;
  updated_at: string;
  coupon_code?: string | null;
  coupon_discount?: number | null;
}

// Updated Tour interface to match database schema
export interface Tour {
  id: number;
  title: string;
  description: string;
  short_description: string;
  price: number;
  duration: string;
  category: string;
  difficulty: string;
  rating: number;
  max_participants: number;
  min_participants: number;
  meeting_point?: string | null;
  includes?: string[];
  excludes?: string[];
  notes?: string[];
  schedule?: string[];
  image_url: string;
  gallery_images?: string[];
  created_at: string;
  updated_at: string;
  partner_id?: string | null;
  location?: string; // Virtual field for mappings
  is_available?: boolean; // Virtual field for availability
}

// Updated Accommodation interface to match database schema
export interface Accommodation {
  id: number;
  title: string;
  description: string;
  short_description: string;
  price_per_night: number;
  type: string;
  address: string;
  city?: string;
  state?: string;
  country?: string;
  zip_code?: string;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  amenities: string[];
  image_url: string;
  gallery_images?: string[];
  created_at: string;
  updated_at: string;
  partner_id?: string | null; 
  category?: string; // Virtual field for consistency
  location?: string; // Virtual field for mappings
  is_available?: boolean; // Virtual field for availability
  rating?: number; // Added for backward compatibility
}

// Updated Notification interface
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "promo" | "booking" | "system";
  read: boolean;
  createdAt?: string;
}

// Updated Event interface to match database schema
export interface Event {
  id: number;
  name: string;
  description: string;
  short_description: string;
  date: string;
  start_time: string;
  end_time?: string;
  location: string;
  price: number;
  image_url: string;
  gallery_images?: string[] | null;
  capacity: number;
  available_spots: number;
  partner_id?: string | null;
  category: string;
  created_at?: string | null;
  updated_at?: string | null;
  is_featured?: boolean | null;
  // Virtual fields for backward compatibility
  title?: string; // Alias for name
  time?: string; // Alias for start_time
  organizer?: string; // Default or from partner
  is_available?: boolean; // Virtual field for availability
  status?: string; // Added for backward compatibility
}

// Add Vehicle interface
export interface Vehicle {
  id: number;
  title: string;
  description: string;
  short_description: string;
  price_per_day: number;
  type: string;
  brand: string;
  model: string;
  year: number;
  seats: number;
  transmission: string;
  fuel_type: string;
  image_url: string;
  gallery_images?: string[];
  is_available: boolean;
  created_at?: string;
  updated_at?: string;
}

// Add Coupon interface
export interface Coupon {
  id: number;
  code: string;
  discount_percentage: number;
  valid_from: string;
  valid_to: string;
  is_active: boolean;
  min_purchase?: number;
  max_discount?: number;
  description?: string;
  created_at: string;
  updated_at: string;
}

// Add interface for the discount_coupons table in Supabase
export interface DiscountCoupon {
  id: number;
  code: string;
  discount_percentage: number;
  valid_from: string;
  valid_until: string;
  current_uses?: number | null;
  max_uses?: number | null;
  min_purchase_amount?: number | null;
  partner_id?: string | null;
  description?: string | null;
  applicable_to?: string[] | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// Interface for traveler preferences since user_preferences doesn't exist
export interface TravelerPreferences {
  user_id: string;
  travel_style?: string;
  activities?: string[];
  accommodation_types?: string[];
  budget_range?: string;
  travel_frequency?: string;
  transport_modes?: string[];
  dietary_restrictions?: {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    other?: string;
  };
  accessibility?: {
    mobilitySupport: boolean;
    visualAids: boolean;
    hearingAids: boolean;
    other?: string;
  };
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    marketing: boolean;
    recommendations: boolean;
    booking_updates: boolean;
  };
  updated_at?: string;
}

// Add Product interface so it can be imported from database.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
  category: string;
  stock: number;
  status: "active" | "out_of_stock" | "discontinued";
  weight?: number;
  dimensions?: string;
  gallery?: string[];
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
  partner_id?: string | null;
}
