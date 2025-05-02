
import { Event } from "@/types/event";

// Convert database event object to component event object if needed
export const adaptDBEventToComponentEvent = (dbEvent: any): Event => {
  return {
    id: dbEvent.id,
    name: dbEvent.title || dbEvent.name,
    description: dbEvent.description,
    short_description: dbEvent.short_description || dbEvent.description?.substring(0, 150) || '',
    date: dbEvent.date,
    start_time: dbEvent.start_time,
    end_time: dbEvent.end_time,
    location: dbEvent.location,
    price: dbEvent.price,
    image_url: dbEvent.image_url || dbEvent.image,
    gallery_images: dbEvent.gallery_images || [],
    category: dbEvent.category,
    is_featured: dbEvent.is_featured || dbEvent.featured || false,
    featured: dbEvent.is_featured || dbEvent.featured || false, // For backward compatibility
    capacity: dbEvent.capacity || 100,
    available_spots: dbEvent.available_spots || 50,
    organizer: dbEvent.organizer || 'Fernando de Noronha',
    status: dbEvent.status || 'scheduled',
    created_at: dbEvent.created_at || new Date().toISOString(),
    updated_at: dbEvent.updated_at || new Date().toISOString()
  };
};

// Convert component event object to database event object
export const adaptComponentEventToDB = (event: Partial<Event>): any => {
  return {
    name: event.name,
    title: event.name, // Database requires title
    description: event.description,
    short_description: event.short_description || event.description?.substring(0, 150) || '',
    date: event.date,
    start_time: event.start_time,
    end_time: event.end_time,
    location: event.location,
    price: event.price,
    image_url: event.image_url,
    gallery_images: event.gallery_images || [],
    category: event.category,
    capacity: event.capacity,
    available_spots: event.available_spots,
    organizer: event.organizer,
    status: event.status,
    is_featured: event.is_featured || event.featured
  };
};
