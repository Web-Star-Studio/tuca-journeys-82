
export interface Vehicle {
  id: number;
  name: string;
  description: string;
  type: string;
  price_per_day: number;
  capacity: number;
  image_url: string;
  partner_id: string;
  created_at: string;
  updated_at: string;
  available_quantity?: number;
  features?: string[];
  gallery_images?: string[];
  is_available?: boolean;
}
