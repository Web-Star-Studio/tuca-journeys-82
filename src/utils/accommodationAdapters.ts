
import { Accommodation as DatabaseAccommodation } from "@/types/database";
import { UIAccommodation } from "@/types/accommodation";

/**
 * Adapts a database accommodation to the UI accommodation format
 */
export function adaptDatabaseToUIAccommodation(dbAccommodation: DatabaseAccommodation): UIAccommodation {
  if (!dbAccommodation) return null;
  
  return {
    id: dbAccommodation.id,
    title: dbAccommodation.title,
    description: dbAccommodation.description,
    price: dbAccommodation.price_per_night,
    perNight: true,
    image: dbAccommodation.image_url,
    location: dbAccommodation.address,
    rating: dbAccommodation.rating || 0,
    amenities: dbAccommodation.amenities || [],
    capacity: dbAccommodation.max_guests,
    bedrooms: dbAccommodation.bedrooms,
    bathrooms: dbAccommodation.bathrooms,
    featured: dbAccommodation.is_featured || false
  };
}

/**
 * Adapts an array of database accommodations to UI accommodations format
 */
export function adaptDatabaseToUIAccommodations(dbAccommodations: DatabaseAccommodation[]): UIAccommodation[] {
  if (!dbAccommodations) return [];
  return dbAccommodations.map(adaptDatabaseToUIAccommodation);
}

/**
 * Adapts a UI accommodation to the database format
 */
export function adaptUIToDatabaseAccommodation(uiAccommodation: UIAccommodation): Partial<DatabaseAccommodation> {
  if (!uiAccommodation) return null;
  
  return {
    id: uiAccommodation.id,
    title: uiAccommodation.title,
    description: uiAccommodation.description,
    short_description: uiAccommodation.description.substring(0, 150) + '...',
    price_per_night: uiAccommodation.price,
    image_url: uiAccommodation.image,
    address: uiAccommodation.location,
    type: 'hotel', // Default value if not provided
    bedrooms: uiAccommodation.bedrooms,
    bathrooms: uiAccommodation.bathrooms,
    max_guests: uiAccommodation.capacity,
    amenities: uiAccommodation.amenities,
    gallery_images: [uiAccommodation.image],
    rating: uiAccommodation.rating || 0,
    is_featured: uiAccommodation.featured
  };
}
