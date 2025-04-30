
import { Accommodation as DatabaseAccommodation } from "@/types/database";
import { Accommodation as UIAccommodation } from "@/data/accommodations";

/**
 * Adapts a database accommodation to the UI accommodation format
 */
export function adaptDatabaseToUIAccommodation(dbAccommodation: DatabaseAccommodation): UIAccommodation {
  return {
    id: dbAccommodation.id,
    title: dbAccommodation.title,
    description: dbAccommodation.description,
    price: dbAccommodation.price_per_night,
    perNight: true,
    image: dbAccommodation.image_url,
    location: dbAccommodation.location || dbAccommodation.address,
    rating: dbAccommodation.rating,
    amenities: dbAccommodation.amenities,
    capacity: dbAccommodation.max_guests,
    bedrooms: dbAccommodation.bedrooms,
    bathrooms: dbAccommodation.bathrooms,
    featured: false // Default value since database doesn't have this field
  };
}

/**
 * Adapts an array of database accommodations to UI accommodations format
 */
export function adaptDatabaseToUIAccommodations(dbAccommodations: DatabaseAccommodation[]): UIAccommodation[] {
  return dbAccommodations.map(adaptDatabaseToUIAccommodation);
}

/**
 * Adapts a UI accommodation to the database format
 */
export function adaptUIToDatabaseAccommodation(uiAccommodation: UIAccommodation): Partial<DatabaseAccommodation> {
  return {
    id: uiAccommodation.id,
    title: uiAccommodation.title,
    description: uiAccommodation.description,
    short_description: uiAccommodation.description.substring(0, 150) + '...',
    price_per_night: uiAccommodation.price,
    image_url: uiAccommodation.image,
    location: uiAccommodation.location,
    address: uiAccommodation.location,
    type: 'hotel', // Default value
    bedrooms: uiAccommodation.bedrooms,
    bathrooms: uiAccommodation.bathrooms,
    max_guests: uiAccommodation.capacity,
    amenities: uiAccommodation.amenities,
    gallery_images: [uiAccommodation.image],
    rating: uiAccommodation.rating
  };
}
