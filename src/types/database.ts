
export type Tour = {
  id: number;
  title: string;
  description: string;
  short_description: string;
  price: number;
  category: string;
  duration: string;
  max_participants: number;
  min_participants: number;
  difficulty: string;
  rating: number;
  image_url: string;
  gallery_images: string[];
  schedule: string[];
  includes: string[];
  excludes: string[];
  notes: string[];
  meeting_point: string;
  created_at: string;
  updated_at: string;
};

export type Accommodation = {
  id: number;
  title: string;
  description: string;
  short_description: string;
  price_per_night: number;
  type: string;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  rating: number;
  image_url: string;
  gallery_images: string[];
  address: string;
  created_at: string;
  updated_at: string;
  // Additional properties used in the application
  capacity?: number;
  location?: string;
  gallery?: string[];
};

export type Booking = {
  id: number;
  user_id: string;
  tour_id: number | null;
  accommodation_id: number | null;
  start_date: string;
  end_date: string;
  guests: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'canceled' | 'completed';
  payment_status: 'pending' | 'paid' | 'refunded' | 'failed';
  payment_method: string | null;
  special_requests: string | null;
  created_at: string;
  updated_at: string;
};

export type UserProfile = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  country: string | null;
  created_at: string;
  updated_at: string;
};
