export interface Accommodation {
  id: number;
  title: string;
  description: string;
  short_description: string;
  price_per_night: number;
  image_url: string;
  gallery_images: string[];
  address: string;
  amenities: string[];
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  rating: number;
  partner_id?: string;
  created_at: string;
  updated_at: string;
  type: string;
}

export interface Tour {
  id: number;
  title: string;
  description: string;
  short_description: string;
  price: number;
  duration: string;
  category: string;
  difficulty: string;
  rating: number;
  min_participants: number;
  max_participants: number;
  image_url: string;
  gallery_images: string[];
  meeting_point?: string;
  schedule: string[];
  includes: string[];
  excludes: string[];
  notes: string[];
  partner_id?: string;
  created_at: string;
  updated_at: string;
}

// Add more types as needed
