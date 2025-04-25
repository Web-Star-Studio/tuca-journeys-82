
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
    featured: dbEvent.featured || dbEvent.is_featured || false,
    capacity: dbEvent.capacity || 100,
    available_spots: dbEvent.available_spots || 50,
    organizer: dbEvent.organizer || 'Fernando de Noronha',
    status: dbEvent.status || 'scheduled'
  };
};
