
import { Event } from "@/types/event";

// Convert database event object to component event object if needed
export const adaptDBEventToComponentEvent = (dbEvent: any): Event => {
  return {
    id: dbEvent.id,
    name: dbEvent.title || dbEvent.name,
    description: dbEvent.description,
    date: dbEvent.date,
    start_time: dbEvent.start_time,
    end_time: dbEvent.end_time,
    location: dbEvent.location,
    price: dbEvent.price,
    image_url: dbEvent.image_url || dbEvent.image,
    category: dbEvent.category,
    featured: dbEvent.is_featured || dbEvent.featured || false,
    capacity: dbEvent.capacity || 100,
    available_spots: dbEvent.available_spots || 50,
    organizer: dbEvent.organizer || 'Fernando de Noronha',
    status: dbEvent.status || 'scheduled'
  };
};

// Convert component event object to database event object
export const adaptComponentEventToDB = (event: Partial<Event>): any => {
  return {
    name: event.name,
    title: event.name, // Database requires title
    description: event.description,
    short_description: event.description?.substring(0, 150) || '', // Generate short description
    date: event.date,
    start_time: event.start_time,
    end_time: event.end_time,
    location: event.location,
    price: event.price,
    image_url: event.image_url,
    category: event.category,
    capacity: event.capacity,
    available_spots: event.available_spots,
    organizer: event.organizer,
    status: event.status,
    is_featured: event.featured
  };
};
