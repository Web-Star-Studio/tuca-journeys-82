
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
