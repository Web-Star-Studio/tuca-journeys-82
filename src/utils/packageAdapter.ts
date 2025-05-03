
import { Package } from '@/types/package';
import { PackageFormValues } from '@/components/admin/packages/types';

/**
 * Convert from our canonical Package type to the legacy Package type used in forms
 */
export const adaptPackageToFormPackage = (packageData: Package): PackageFormValues => {
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
    includes: packageData.includes?.map(item => ({ title: item })) || [],
    excludes: packageData.excludes?.map(item => ({ title: item })) || [],
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
 * This ensures all required fields have values
 */
export const adaptFormPackageToPackage = (formPackage: PackageFormValues): Package => {
  // Ensure all required fields have values
  return {
    id: formPackage.id || -1, // For new packages, use a temporary ID that will be replaced by the database
    title: formPackage.title || 'Unnamed Package',
    description: formPackage.description || 'No description',
    image_url: formPackage.image || '',
    price: formPackage.price || 0,
    duration: `${formPackage.days || 1} days`,
    max_participants: formPackage.persons || 0, 
    rating: formPackage.rating || 0,
    category: formPackage.category || 'Uncategorized',
    includes: formPackage.includes?.map(item => item.title) || [],
    excludes: formPackage.excludes?.map(item => item.title) || [],
    itinerary: formPackage.itinerary?.map(item => ({ 
      day: item.day, 
      title: item.title, 
      description: item.description 
    })) || [],
    is_featured: false,
    short_description: formPackage.description?.substring(0, 150) || '',
    gallery_images: [],
    created_at: "",
    updated_at: ""
  };
};
