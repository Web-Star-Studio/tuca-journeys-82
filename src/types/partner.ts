
export interface Partner {
  id: string;
  user_id: string;
  business_name: string;
  business_type: 'accommodation' | 'tour' | 'vehicle' | 'event' | 'product' | 'restaurant' | 'service';
  description?: string;
  logo_url?: string;
  cover_image?: string;
  contact_email?: string;
  contact_phone?: string;
  website?: string;
  address?: string;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // Additional properties used in components
  name?: string; // For backward compatibility
  category?: string; // For backward compatibility
  featured?: boolean; // For backward compatibility
  discount_codes?: DiscountCode[]; // For backward compatibility
}

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
