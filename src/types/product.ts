
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  featured: boolean;
  image: string;
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
