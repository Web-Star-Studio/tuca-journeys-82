
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
  // Make a copy to avoid mutation
  const eventData = {
    name: event.name,
    description: event.description || '',
    short_description: event.short_description || event.description?.substring(0, 150) || '',
    date: event.date,
    start_time: event.start_time,
    end_time: event.end_time,
    location: event.location,
    price: event.price || 0,
    image_url: event.image_url,
    gallery_images: event.gallery_images || [],
    category: event.category,
    capacity: event.capacity || 100,
    available_spots: event.available_spots || (event.capacity || 100),
    organizer: event.organizer || 'Fernando de Noronha',
    status: event.status || 'scheduled',
    is_featured: event.is_featured || event.featured || false,
    // We don't need to set title as it will be the same as name
  };
  
  // Log to debug
  console.log('Event data to be sent to DB:', eventData);
  
  return eventData;
};
