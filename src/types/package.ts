
export interface Package {
  id: number;
  title: string;
  description: string;
  short_description?: string;
  price: number;
  duration: string;
  image_url: string;
  gallery_images?: string[];
  category: string;
  includes?: string[];
  excludes?: string[];
  itinerary?: Array<{
    day: number;
    title: string;
    description: string;
    locations?: string[];
  }>;
  rating?: number;
  is_featured?: boolean;
  max_participants?: number;
  created_at?: string;
  updated_at?: string;
  partner_id?: string;
}
