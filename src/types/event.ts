
// Event type definition
export interface Event {
  id: number;
  name: string;
  title: string; // Some legacy code might use title instead of name
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
  status: string; // Added as required for API compatibility
  organizer: string; // Added as required for API compatibility
  is_featured?: boolean; // Some legacy code might use is_featured instead of featured
  gallery_images: string[];
}
