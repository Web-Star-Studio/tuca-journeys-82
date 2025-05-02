
import { BaseApiService } from './base-api';
import { Event, EventFilters, AttendeeInfo } from '@/types/event';

class EventService extends BaseApiService {
  async getEvents(filters: EventFilters = {}) {
    let query = this.supabase
      .from('events')
      .select('*');
      
    // Apply filters
    if (filters.category && filters.category !== "Todas") {
      query = query.eq('category', filters.category);
    }
    
    if (filters.searchQuery) {
      query = query.ilike('name', `%${filters.searchQuery}%`);
    }
    
    if (filters.minPrice !== undefined && filters.minPrice !== null) {
      query = query.gte('price', filters.minPrice);
    }
    
    if (filters.maxPrice !== undefined && filters.maxPrice !== null) {
      query = query.lte('price', filters.maxPrice);
    }
    
    if (filters.date) {
      query = query.eq('date', filters.date.toISOString().split('T')[0]);
    }
    
    // Apply sorting
    if (filters.sortBy) {
      const [field, direction] = filters.sortBy.split('_');
      query = query.order(field, { ascending: direction === 'asc' });
    } else {
      query = query.order('date', { ascending: true });
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching events:', error);
      throw error;
    }

    return data as Event[];
  }

  async getFeaturedEvents(filters: EventFilters = {}) {
    const { data, error } = await this.supabase
      .from('events')
      .select('*')
      .eq('is_featured', true);

    if (error) {
      console.error('Error fetching featured events:', error);
      throw error;
    }

    return data as Event[];
  }

  async getEventById(id: number) {
    const { data, error } = await this.supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching event ${id}:`, error);
      throw error;
    }

    return data as Event;
  }

  async createEvent(eventData: Partial<Event>) {
    const { data, error } = await this.supabase
      .from('events')
      .insert([eventData])
      .select()
      .single();

    if (error) {
      console.error('Error creating event:', error);
      throw error;
    }

    return data;
  }

  async updateEvent(id: number, eventData: Partial<Event>) {
    const { data, error } = await this.supabase
      .from('events')
      .update(eventData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating event ${id}:`, error);
      throw error;
    }

    return data;
  }

  async deleteEvent(id: number) {
    const { error } = await this.supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting event ${id}:`, error);
      throw error;
    }
  }
  
  // Added missing methods
  async getEventCategories() {
    // For now, return hardcoded categories
    return ["Todas", "Festas", "Música", "Cultura", "Gastronomia", "Esporte", "Tecnologia", "Educação"];
  }
  
  async bookEventTickets(eventId: number, userId: string, ticketCount: number, attendeeInfo: AttendeeInfo[]) {
    try {
      // First get the event to calculate the total price
      const event = await this.getEventById(eventId);
      const totalPrice = event.price * ticketCount;
      
      // Insert the booking
      const { data, error } = await this.supabase.rpc(
        'book_event_tickets',
        {
          p_event_id: eventId,
          p_user_id: userId,
          p_ticket_count: ticketCount,
          p_total_price: totalPrice,
          p_ticket_data: JSON.stringify(attendeeInfo)
        }
      );
      
      if (error) {
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Error booking event tickets:', error);
      throw error;
    }
  }
  
  async getUserEventBookings(userId: string) {
    const { data, error } = await this.supabase
      .from('event_bookings')
      .select(`
        *,
        events:event_id (*)
      `)
      .eq('user_id', userId);
      
    if (error) {
      console.error('Error fetching user event bookings:', error);
      throw error;
    }
    
    return data;
  }
}

export const eventService = new EventService();
