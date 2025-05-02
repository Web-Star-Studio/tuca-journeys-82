
export interface Event {
  id: number;
  name: string;
  description: string;
  short_description: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  capacity: number;
  available_spots: number;
  price: number;
  category: string;
  image_url: string;
  gallery_images: string[];
  organizer?: string;
  is_featured: boolean;
  status: 'scheduled' | 'cancelled' | 'postponed' | 'completed';
  partner_id?: string;
  policies?: string;
  created_at: string;
  updated_at: string;
}

export interface EventFilters {
  category?: string;
  date?: Date | null;
  searchQuery?: string;
  [key: string]: any;
}

export interface EventTicket {
  id: number;
  event_id: number;
  name: string;
  price: number;
  available_quantity: number;
  max_per_order: number;
  description?: string;
  type: 'regular' | 'vip' | 'early_bird' | 'student';
  benefits: string[];
}
