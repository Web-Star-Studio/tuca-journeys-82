
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  featured: boolean;
  image_url: string; // Changed from image to image_url to match the database
  gallery?: string[];
  weight?: number;
  dimensions?: string;
  partner_id?: string;
  created_at?: string;
  updated_at?: string;
  status: 'active' | 'inactive' | 'out_of_stock';
  benefits?: string[];
  is_new?: boolean;
}
