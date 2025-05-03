
// This file contains activity-related types and constants

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

export const ACTIVITY_DIFFICULTY_LEVELS = [
  "fácil",
  "moderado",
  "difícil",
  "extremo"
];

export interface Activity {
  id: number;
  title: string;
  description: string;
  short_description: string;
  image_url: string;
  price: number;
  duration: string;
  category: string;
  max_participants: number;
  difficulty: string;
  meeting_point?: string;
  includes: string[];
  excludes: string[];
  notes?: string[];
  schedule?: string[];
  rating?: number;
  gallery_images: string[];
  is_featured?: boolean;
  is_active?: boolean;
  partner_id?: string;
  created_at: string;
  updated_at: string;
}

export interface ActivityFilters {
  category?: string;
  date?: Date | null;
  searchQuery?: string;
  sortBy?: string;
  minPrice?: number;
  maxPrice?: number;
  difficulty?: string;
  [key: string]: any;
}

export interface ActivityAvailability {
  id: number;
  activityId: number;
  date: string;
  availableSpots: number;
  customPrice?: number | null;
  status: 'available' | 'unavailable';
  createdAt: string;
  updatedAt: string;
}

export interface ActivityBooking {
  id: number;
  activityId: number;
  userId: string;
  date: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'cancelled' | 'pending';
  createdAt: string;
  updatedAt: string;
}

export interface ActivityBulkAvailabilityParams {
  activityId: number;
  dates: Date[];
  availableSpots: number;
  customPrice?: number;
  status?: 'available' | 'unavailable';
}
