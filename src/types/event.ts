
export interface Event {
  id: number;
  name: string;
  description: string;
  short_description?: string;
  date: string;
  start_time: string;  // Making these required
  end_time: string;    // Making these required
  location: string;
  price: number;
  capacity: number;
  available_spots: number; // Making this required
  image_url: string;
  partner_id: string;
  created_at: string;
  updated_at: string;
  category: string;    // Making this required
  featured: boolean;   // Making this required
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  organizer: string;   // Making this required
}
