
export interface Product {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
  category: string;
  stock: number;
  status: "active" | "out_of_stock" | "discontinued";
  weight?: number;
  dimensions?: string;
  gallery?: string[];
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
}
