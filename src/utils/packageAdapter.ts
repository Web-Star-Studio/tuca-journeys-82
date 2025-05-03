
import { Package } from '@/types/package';
import { Package as OldPackage } from '@/data/types/packageTypes';

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
    gallery_images: dbPackage.gallery_images || [],
    category: dbPackage.category || 'Uncategorized', // Default category if missing
    includes: dbPackage.includes || [],
    excludes: dbPackage.excludes || [],
    itinerary: dbPackage.itinerary || [],
    rating: dbPackage.rating || 0,
    is_featured: dbPackage.is_featured || false,
    max_participants: dbPackage.max_participants || dbPackage.max_guests || 0, // Support both field names
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

/**
 * Convert from our canonical Package type to the legacy Package type used in forms
 */
export const adaptPackageToFormPackage = (packageData: Package): OldPackage => {
  return {
    id: packageData.id,
    title: packageData.title,
    description: packageData.description,
    image: packageData.image_url,
    price: packageData.price,
    days: parseInt(packageData.duration?.split(' ')[0] || '1', 10),
    persons: packageData.max_participants || 0, 
    rating: packageData.rating || 0,
    category: packageData.category || '',
    highlights: [],
    includes: packageData.includes || [],
    excludes: packageData.excludes || [],
    itinerary: packageData.itinerary?.map(item => ({ 
      day: item.day, 
      title: item.title, 
      description: item.description 
    })) || [],
    dates: [],
  };
};

/**
 * Convert from the legacy form Package type to our canonical Package type
 */
export const adaptFormPackageToPackage = (formPackage: OldPackage): Package => {
  return {
    id: formPackage.id,
    title: formPackage.title,
    description: formPackage.description,
    image_url: formPackage.image,
    price: formPackage.price,
    duration: `${formPackage.days} days`,
    max_participants: formPackage.persons, 
    rating: formPackage.rating || 0,
    category: formPackage.category || 'Uncategorized',
    includes: formPackage.includes || [],
    excludes: formPackage.excludes || [],
    itinerary: formPackage.itinerary?.map(item => ({ 
      day: item.day, 
      title: item.title, 
      description: item.description 
    })) || [],
    is_featured: false,
    short_description: '',
    gallery_images: [],
  };
};
