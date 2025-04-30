
import { Accommodation as DatabaseAccommodation } from "@/types/database";
import { Accommodation as UIAccommodation } from "@/data/accommodations";

/**
 * Adapts a database accommodation model to the UI accommodation model
 */
export const adaptDatabaseToUIAccommodation = (
  dbAccommodation: DatabaseAccommodation
): UIAccommodation => {
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
    featured: false // Default value, can be modified if needed
  };
};

/**
 * Adapts a UI accommodation model to the database accommodation model
 */
export const adaptUIToDatabaseAccommodation = (
  uiAccommodation: UIAccommodation
): Partial<DatabaseAccommodation> => {
  return {
    id: uiAccommodation.id,
    title: uiAccommodation.title,
    description: uiAccommodation.description,
    price_per_night: uiAccommodation.price,
    image_url: uiAccommodation.image,
    address: uiAccommodation.location,
    rating: uiAccommodation.rating,
    amenities: uiAccommodation.amenities,
    max_guests: uiAccommodation.capacity,
    bedrooms: uiAccommodation.bedrooms,
    bathrooms: uiAccommodation.bathrooms,
    // Required fields that might not be in UI model
    short_description: uiAccommodation.description.substring(0, 100) + "...",
    type: "Hospedagem",
    gallery_images: []
  };
};

/**
 * Adapts an array of database accommodations to UI accommodations
 */
export const adaptDatabaseToUIAccommodations = (
  dbAccommodations: DatabaseAccommodation[]
): UIAccommodation[] => {
  return dbAccommodations.map(adaptDatabaseToUIAccommodation);
};
