
import { Package } from '@/types/package';

/**
 * Adapts a database package to the application package model
 * This handles field name differences, data transformation, etc.
 */
export const adaptDBPackageToComponentPackage = (dbPackage: any): Package => {
  return {
    id: dbPackage.id,
    title: dbPackage.title || dbPackage.name, // Support both name and title from DB
    description: dbPackage.description,
    short_description: dbPackage.short_description,
    price: dbPackage.price,
    duration: dbPackage.duration || `${dbPackage.days || 1} days`, // Convert numbers to string format if needed
    image_url: dbPackage.image_url || dbPackage.image, // Support both image and image_url
    gallery_images: dbPackage.gallery_images,
    category: dbPackage.category || 'Uncategorized', // Default category if missing
    includes: dbPackage.includes || [],
    excludes: dbPackage.excludes || [],
    itinerary: dbPackage.itinerary || [],
    rating: dbPackage.rating || 0,
    is_featured: dbPackage.is_featured || false,
    max_participants: dbPackage.max_participants || dbPackage.max_guests, // Support both field names
    created_at: dbPackage.created_at,
    updated_at: dbPackage.updated_at,
    partner_id: dbPackage.partner_id
  };
};

/**
 * Adapts a component package model to the database format
 * This helps ensure we send the right fields when creating or updating packages
 */
export const adaptComponentPackageToDB = (packageData: Partial<Package>): any => {
  // Create an object with the specific fields needed by the DB
  const dbPackage: any = {
    title: packageData.title,
    description: packageData.description,
    short_description: packageData.short_description,
    price: packageData.price,
    duration: packageData.duration,
    image_url: packageData.image_url,
    gallery_images: packageData.gallery_images,
    category: packageData.category,
    includes: packageData.includes,
    excludes: packageData.excludes,
    itinerary: packageData.itinerary,
    rating: packageData.rating,
    is_featured: packageData.is_featured,
    max_participants: packageData.max_participants,
    partner_id: packageData.partner_id
  };

  // Remove undefined fields to avoid overwriting with nulls
  Object.keys(dbPackage).forEach(key => {
    if (dbPackage[key] === undefined) {
      delete dbPackage[key];
    }
  });

  return dbPackage;
};
