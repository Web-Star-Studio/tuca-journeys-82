
export interface UserProfile {
  id: string;
  user_id: string;
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

// Add Tour interface
export interface Tour {
  id: number;
  title: string;
  description: string;
  short_description: string;
  price: number;
  duration: string;
  category: string;
  difficulty?: string;
  rating: number;
  max_participants: number;
  min_participants: number;
  meeting_point?: string;
  includes?: string[];
  excludes?: string[];
  notes?: string[];
  schedule?: string[];
  image_url: string;
  gallery_images?: string[];
  created_at?: string;
  updated_at?: string;
  is_available?: boolean;
  location?: string;
}

// Add Accommodation interface
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
  is_available: boolean;
  created_at?: string;
  updated_at?: string;
  location?: string;
  category?: string;
}

// Add Notification interface
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "promo" | "booking" | "system";
  read: boolean;
  createdAt?: string;
}

// Add Event interface
export interface Event {
  id: number;
  title: string;
  description: string;
  short_description: string;
  date: string;
  time: string;
  location: string;
  price: number;
  image_url?: string;
  gallery_images?: string[];
  is_available: boolean;
  capacity: number;
  organizer: string;
  category?: string;
  created_at?: string;
  updated_at?: string;
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
