
import { Tour as DBTour } from '@/types/database';
import { Tour as ComponentTour } from '@/data/tours';

// Convert database tour object to the format expected by components
export const adaptDBTourToComponentTour = (dbTour: DBTour): ComponentTour => {
  return {
    id: dbTour.id,
    title: dbTour.title,
    description: dbTour.description,
    image: dbTour.image_url,
    price: dbTour.price,
    duration: dbTour.duration,
    rating: dbTour.rating,
    category: dbTour.category,
    maxParticipants: dbTour.max_participants,
    minParticipants: dbTour.min_participants,
    inclusions: dbTour.includes,
    exclusions: dbTour.excludes,
    schedule: dbTour.schedule,
    requirements: dbTour.notes,
    location: dbTour.meeting_point || '',
    featured: dbTour.is_featured || false,
    active: dbTour.is_active !== false
  };
};

// Convert component tour model to database format
export const adaptComponentTourToDBTour = (tour: Partial<ComponentTour>): Partial<DBTour> => {
  return {
    title: tour.title,
    description: tour.description,
    image_url: tour.image,
    price: tour.price,
    duration: tour.duration,
    category: tour.category,
    max_participants: tour.maxParticipants,
    min_participants: tour.minParticipants,
    includes: tour.inclusions,
    excludes: tour.exclusions,
    schedule: tour.schedule,
    notes: tour.requirements,
    meeting_point: tour.location,
    is_featured: tour.featured,
    is_active: tour.active !== false,
    short_description: tour.description ? tour.description.substring(0, 150) + '...' : '',
    // Ensure these have default values to avoid null errors
    rating: tour.rating || 0,
    difficulty: 'normal',
    gallery_images: []
  };
};
