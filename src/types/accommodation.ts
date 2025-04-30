
/**
 * Accommodation types used throughout the application
 */

// Type for accommodation coming from our UI components
export interface UIAccommodation {
  id: number;
  title: string;
  description: string;
  price: number;
  perNight: boolean;
  image: string;
  location: string;
  rating: number;
  amenities: string[];
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  featured: boolean;
}

// Enhancement options for the UI Accommodation interface
export interface AccommodationFilters {
  searchQuery: string;  // Required to match service implementation
  type: string;         // Required to match service implementation
  minPrice: number | null;
  maxPrice: number | null;
  minRating: number | null;
  sortBy: 'newest' | 'price_asc' | 'price_desc' | 'rating' | 'alphabetical';
  amenities: string[];
  maxGuests: number | null;
  limit?: number;      // Property for pagination
  offset?: number;     // Property for pagination
}

// Export AccommodationFilterParams as an alias for AccommodationFilters to maintain compatibility
export type AccommodationFilterParams = AccommodationFilters;

// Type for accommodation availability
export interface AccommodationAvailability {
  id: number;
  accommodation_id: number;
  date: string;
  status: 'available' | 'unavailable';
  custom_price?: number | null;
  created_at: string;
  updated_at: string;
}

// Type for price range to be used in filters
export interface PriceRange {
  min: number;
  max: number;
}
