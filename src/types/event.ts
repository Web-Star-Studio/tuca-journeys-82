
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
  featured?: boolean; // Added for backward compatibility
  status: 'scheduled' | 'cancelled' | 'postponed' | 'completed' | 'ongoing';
  partner_id?: string;
  policies?: string;
  created_at: string;
  updated_at: string;
}

export interface EventFilters {
  category?: string;
  date?: Date | null;
  searchQuery?: string;
  sortBy?: string;
  minPrice?: number;
  maxPrice?: number;
  difficulty?: string;
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

// Update AttendeeInfo to include ticketType and document fields
export interface AttendeeInfo {
  name: string;
  email: string;
  phone?: string;
  ticketType?: string;
  document?: string;
}

export interface SelectedTicket {
  id: number;
  name: string;
  price: number;
  quantity: number;
  type: string;
}

export interface EventBooking {
  id: number;
  event_id: number;
  user_id: string;
  tickets: number;
  total_price: number;
  status: string;
  payment_status: string;
  payment_method?: string;
  payment_details?: Record<string, any>;
  attendee_info?: AttendeeInfo[];
  created_at: string;
  updated_at: string;
  events?: Event;
}

export interface EventHeroProps {
  title: string;
  subtitle: string;
}

export interface EventSearchFilterProps {
  filters: EventFilters;
  onFilterChange: (filters: EventFilters) => void;
  categories: string[];
  isLoading?: boolean;
}
