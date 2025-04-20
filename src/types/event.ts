
export interface Event {
  id: number;
  name: string;
  description: string;
  short_description?: string;
  date: string;
  start_time?: string;
  end_time?: string;
  location: string;
  price: number;
  capacity: number;
  available_spots?: number;
  image_url: string;
  partner_id: string;
  created_at: string;
  updated_at: string;
  category?: string;
  featured?: boolean;
  status?: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  organizer?: string;
}
