
export interface Activity {
  id: number;
  title: string;
  description: string;
  short_description: string;
  price: number;
  category: string;
  difficulty: string;
  duration: string;
  rating: number; // Making this required
  meeting_point: string;
  min_participants: number;
  max_participants: number;
  includes: string[];
  excludes: string[];
  notes: string[];
  schedule: string[];
  image_url: string;
  gallery_images: string[];
  is_active: boolean;
  is_featured: boolean;
  partner_id?: string;
  created_at: string;
  updated_at: string;
}

export interface ActivityAvailability {
  id: number;
  tour_id: number;
  date: string;
  available_spots: number;
  custom_price?: number;
  status: 'available' | 'unavailable' | 'fully_booked';
  created_at: string;
  updated_at: string;
}

export interface ActivityFilters {
  category?: string;
  difficulty?: string;
  minPrice?: number | null;
  maxPrice?: number | null;
  searchQuery?: string;
  date?: Date;
  sortBy?: string; // Added sortBy property
}

export interface ActivityBooking {
  id: number;
  activity_id: number;
  user_id: string;
  booking_date: string;
  participants: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'refunded';
  special_requests?: string;
  created_at: string;
  updated_at: string;
}

// Activity categories used for filtering
export const ACTIVITY_CATEGORIES = [
  "Todos", 
  "Barco", 
  "Mergulho", 
  "Trilha", 
  "Terrestre", 
  "Ecológico", 
  "Cultural", 
  "Gastronômico"
];

// Activity difficulty levels
export const ACTIVITY_DIFFICULTY_LEVELS = [
  "fácil",
  "moderado",
  "difícil",
  "extremo"
];
