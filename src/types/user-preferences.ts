
export interface TravelPreference {
  id?: string;
  user_id: string;
  travel_style: string;         // Adventure, Relaxation, Cultural, etc.
  group_size: number;           // Number of travelers
  trip_duration: number;        // Planned days
  activities: string[];         // Hiking, Diving, Beach, etc.
  accommodation_types: string[]; // Hotel, Pousada, Resort
  budget_range: string;         // Economy, Medium, Premium, Luxury
  travel_frequency: string;     // Monthly, Quarterly, Biannual, Annual
  travel_dates?: {
    start_date?: string;
    end_date?: string;
  };
  dietary_restrictions?: string[];
  special_requests?: string;
  created_at?: string;
  updated_at?: string;
}

export type TravelStyle = 'adventure' | 'relaxation' | 'cultural' | 'nature' | 'gastronomic';
export type BudgetRange = 'economy' | 'medium' | 'premium' | 'luxury';
export type AccommodationType = 'hotel' | 'pousada' | 'resort' | 'hostel' | 'apartment';
export type Activity = 
  | 'hiking' 
  | 'diving' 
  | 'snorkeling'
  | 'boat_tours' 
  | 'wildlife_watching' 
  | 'beach' 
  | 'photography' 
  | 'local_cuisine'
  | 'historical_sites'
  | 'surfing'
  | 'fishing'
  | 'sunset_watching';
