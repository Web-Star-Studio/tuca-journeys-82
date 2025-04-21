
export interface Accommodation {
  id: number;
  title: string;
  description: string;
  short_description: string;
  price_per_night: number;
  image_url: string;
  gallery_images: string[];
  address: string;
  amenities: string[];
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  rating: number;
  partner_id?: string;
  created_at: string;
  updated_at: string;
  type: string;
  is_available?: boolean;
  location?: string;
}

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
  min_participants: number;
  max_participants: number;
  image_url: string;
  gallery_images: string[];
  meeting_point?: string;
  schedule: string[];
  includes: string[];
  excludes: string[];
  notes: string[];
  partner_id?: string;
  created_at: string;
  updated_at: string;
  location?: string;
  is_available?: boolean;
}

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
  partner_id?: string;
}

export interface DiscountCoupon {
  id: number;
  code: string;
  description?: string;
  discount_percentage: number;
  valid_from: string;
  valid_until: string;
  max_uses?: number;
  current_uses?: number;
  min_purchase_amount?: number;
  partner_id?: string;
  applicable_to?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface UserPreferences {
  travel_style?: string;
  activities?: string[];
  accommodation_types?: string[];
  budget_range?: string;
  travel_frequency?: string;
  dietary_restrictions?: {
    vegetarian?: boolean;
    vegan?: boolean;
    gluten_free?: boolean;
    other?: string;
  };
  accessibility?: {
    wheelchair?: boolean;
    limited_mobility?: boolean;
    other?: string;
  };
  transport_modes?: string[];
}

export interface UserProfile {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip_code?: string;
  avatar_url?: string;
  is_admin?: boolean;
  is_partner?: boolean;
  preferences?: UserPreferences;
  created_at: string;
  updated_at: string;
}

export interface DatabaseBooking {
  id: number;
  user_id: string;
  accommodation_id?: number;
  tour_id?: number;
  start_date: string;
  end_date: string;
  guests: number;
  total_price: number;
  status: string;
  payment_status: string;
  payment_method?: string;
  special_requests?: string;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: number;
  name: string;
  title?: string;
  description: string;
  short_description: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  price: number;
  capacity: number;
  available_spots: number;
  image_url: string;
  partner_id: string;
  created_at: string;
  updated_at: string;
  category: string;
  featured: boolean;
  status: string;
  organizer: string;
  is_featured?: boolean;
  gallery_images: string[];
}

// Add more types as needed
