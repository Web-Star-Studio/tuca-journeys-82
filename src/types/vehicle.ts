
export interface Vehicle {
  id: number;
  name: string;
  description: string;
  type: string;
  price_per_day: number;
  price?: number; // Optional price field for compatibility
  capacity: number;
  image_url: string;
  partner_id: string;
  created_at: string;
  updated_at: string;
  available_quantity: number; // Making this required
  features?: string[];
  gallery_images?: string[];
  is_available?: boolean;
}
