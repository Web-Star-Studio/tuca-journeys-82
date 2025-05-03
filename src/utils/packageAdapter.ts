
import { Package } from '@/types/package';
import { Package as OldPackage } from '@/data/types/packageTypes';

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
