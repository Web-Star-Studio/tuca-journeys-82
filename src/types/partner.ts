
export interface DiscountCode {
  id: number;
  code: string;
  discount_percentage: number;
  expires_at: string;
  minimum_purchase?: number;
  max_uses?: number;
  current_uses: number;
  description: string;
}

export interface Partner {
  id: number;
  name: string;
  description: string;
  logo_url: string;
  website: string;
  category: string;
  address?: string;
  featured?: boolean;
  discount_codes: DiscountCode[];
}
