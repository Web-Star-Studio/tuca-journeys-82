
// New file for Event type definition
export interface Event {
  id: number;
  name: string;
  title?: string; // Some legacy code might use title instead of name
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
  is_featured?: boolean; // Some legacy code might use is_featured instead of featured
}
