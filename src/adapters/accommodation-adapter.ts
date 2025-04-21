
import { Accommodation as DatabaseAccommodation } from '@/types/database';
import { Accommodation as UIAccommodation } from '@/data/accommodations';

/**
 * Converts database accommodation format to UI format
 */
export const adaptDatabaseToUIAccommodation = (dbAccommodation: DatabaseAccommodation): UIAccommodation => {
  return {
    id: dbAccommodation.id,
    title: dbAccommodation.title,
    description: dbAccommodation.description || '',
    price: dbAccommodation.price_per_night || 0,
    perNight: true,
    image: dbAccommodation.image_url || '',
    location: dbAccommodation.address || '',
    rating: dbAccommodation.rating || 0,
    amenities: dbAccommodation.amenities || [],
    capacity: dbAccommodation.max_guests || 2,
    bedrooms: dbAccommodation.bedrooms || 1,
    bathrooms: dbAccommodation.bathrooms || 1,
    featured: false // Default value as it might not exist in DB
  };
};
