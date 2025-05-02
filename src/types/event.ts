
export interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  price: number;
  image_url: string;
  category: string;
  featured: boolean;
  capacity: number;
  available_spots: number;
  organizer: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  policies?: string; // Added for event policies
  tickets?: EventTicket[]; // Added for event tickets
  short_description?: string; // For display in cards
}

export interface EventFilters {
  searchQuery?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'date_asc' | 'date_desc' | 'price_asc' | 'price_desc' | 'name';
  limit?: number;
  offset?: number;
}

export interface EventTicket {
  id: number;
  event_id: number;
  name: string;
  description?: string;
  price: number;
  available_quantity: number;
  max_per_order: number;
  type: 'regular' | 'vip' | 'discount' | 'free';
  benefits?: string[];
}

export interface EventBooking {
  id: number;
  event_id: number;
  user_id: string;
  tickets: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'refunded';
  payment_method?: string;
  payment_details?: any;
  created_at: string;
  attendee_info?: AttendeeInfo[];
}

export interface AttendeeInfo {
  name: string;
  email: string;
  document?: string;
  ticketType?: string;
}
