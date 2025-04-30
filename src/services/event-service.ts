
import { supabase } from '@/lib/supabase';
import { Event } from '@/types/event';
import { BaseApiService } from './base-api';
import { EventFilters } from '@/types/event';
import { adaptDBEventToComponentEvent } from '@/utils/eventAdapter';

class EventService extends BaseApiService {
  /**
   * Retrieves all events from the database with optional filtering
   */
  async getEvents(filters: EventFilters): Promise<Event[]> {
    console.log('Fetching events from Supabase with filters:', filters);
    
    let query = this.supabase.from('events').select('*');

    // Apply full-text search if search query is provided
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const cleanedQuery = filters.searchQuery.trim().replace(/['\\]/g, '').replace(/\s+/g, ' & ');
      query = query.ilike('name', `%${cleanedQuery}%`);
    }

    // Apply category filter
    if (filters.category && filters.category !== 'Todas') {
      query = query.eq('category', filters.category);
    }

    // Apply date filters
    if (filters.startDate) {
      query = query.gte('date', filters.startDate);
    }
    if (filters.endDate) {
      query = query.lte('date', filters.endDate);
    }

    // Apply price filters
    if (filters.minPrice !== undefined) {
      query = query.gte('price', filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      query = query.lte('price', filters.maxPrice);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'date_asc':
        query = query.order('date', { ascending: true });
        break;
      case 'date_desc':
        query = query.order('date', { ascending: false });
        break;
      case 'price_asc':
        query = query.order('price', { ascending: true });
        break;
      case 'price_desc':
        query = query.order('price', { ascending: false });
        break;
      case 'name':
        query = query.order('name', { ascending: true });
        break;
      default:
        query = query.order('date', { ascending: true });
    }

    // Apply pagination if provided
    if (filters.limit !== undefined) {
      query = query.limit(filters.limit);
    }
    
    if (filters.offset !== undefined) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    // Execute the query
    const { data, error } = await query;

    if (error) {
      console.error('Error fetching events:', error);
      throw error;
    }

    // Adapt the database events to our UI component model
    return data.map(adaptDBEventToComponentEvent);
  }

  /**
   * Retrieves a specific event by its ID
   */
  async getEventById(id: number): Promise<Event | null> {
    console.log(`Fetching event with ID: ${id}`);
    const { data, error } = await this.supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        console.warn(`No event found with ID: ${id}`);
        return null;
      }
      console.error(`Error fetching event with ID: ${id}:`, error);
      throw error;
    }

    return adaptDBEventToComponentEvent(data);
  }

  /**
   * Creates a new event
   */
  async createEvent(eventData: Partial<Event>): Promise<Event> {
    console.log('Creating new event:', eventData);
    
    const { data, error } = await this.supabase
      .from('events')
      .insert({
        name: eventData.name || 'Novo Evento',
        description: eventData.description || '',
        date: eventData.date || new Date().toISOString().split('T')[0],
        start_time: eventData.start_time || '19:00',
        end_time: eventData.end_time || '22:00',
        location: eventData.location || '',
        price: eventData.price !== undefined ? eventData.price : 0,
        image_url: eventData.image_url || '/placeholder.svg',
        category: eventData.category || 'Música',
        capacity: eventData.capacity || 100,
        available_spots: eventData.available_spots !== undefined ? eventData.available_spots : (eventData.capacity || 100),
        organizer: eventData.organizer || 'Fernando de Noronha Eventos',
        status: 'scheduled',
        is_featured: eventData.featured || false
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating event:', error);
      throw error;
    }

    return adaptDBEventToComponentEvent(data);
  }

  /**
   * Updates an existing event
   */
  async updateEvent(id: number, updates: Partial<Event>): Promise<Event> {
    console.log(`Updating event with ID: ${id}`, updates);
    
    // Convert frontend model to database model
    const dbUpdates = {
      ...(updates.name !== undefined && { name: updates.name }),
      ...(updates.description !== undefined && { description: updates.description }),
      ...(updates.date !== undefined && { date: updates.date }),
      ...(updates.start_time !== undefined && { start_time: updates.start_time }),
      ...(updates.end_time !== undefined && { end_time: updates.end_time }),
      ...(updates.location !== undefined && { location: updates.location }),
      ...(updates.price !== undefined && { price: updates.price }),
      ...(updates.image_url !== undefined && { image_url: updates.image_url }),
      ...(updates.category !== undefined && { category: updates.category }),
      ...(updates.capacity !== undefined && { capacity: updates.capacity }),
      ...(updates.available_spots !== undefined && { available_spots: updates.available_spots }),
      ...(updates.organizer !== undefined && { organizer: updates.organizer }),
      ...(updates.status !== undefined && { status: updates.status }),
      ...(updates.featured !== undefined && { is_featured: updates.featured }),
      updated_at: new Date().toISOString()
    };

    const { data, error } = await this.supabase
      .from('events')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating event with ID: ${id}:`, error);
      throw error;
    }

    return adaptDBEventToComponentEvent(data);
  }

  /**
   * Deletes an event by its ID
   */
  async deleteEvent(id: number): Promise<void> {
    console.log(`Deleting event with ID: ${id}`);
    
    // First check if there are any bookings for this event
    const { data: bookings, error: bookingError } = await this.supabase
      .from('event_bookings')
      .select('id')
      .eq('event_id', id)
      .limit(1);

    if (bookingError) {
      console.error(`Error checking bookings for event ID: ${id}:`, bookingError);
      throw bookingError;
    }

    // If there are bookings, don't allow deletion
    if (bookings && bookings.length > 0) {
      throw new Error('Cannot delete event with existing bookings');
    }

    const { error } = await this.supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting event with ID: ${id}:`, error);
      throw error;
    }
  }

  /**
   * Books tickets for an event
   */
  async bookEventTickets(eventId: number, userId: string, ticketCount: number, ticketData: any): Promise<any> {
    console.log(`Booking ${ticketCount} tickets for event ID: ${eventId}`);
    
    // First get the event to check availability
    const event = await this.getEventById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }
    
    if (!event.available_spots || event.available_spots < ticketCount) {
      throw new Error('Not enough available spots for this booking');
    }
    
    // Start a transaction
    const { data, error } = await this.supabase.rpc('book_event_tickets', {
      p_event_id: eventId,
      p_user_id: userId,
      p_ticket_count: ticketCount,
      p_total_price: event.price * ticketCount,
      p_ticket_data: ticketData
    });

    if (error) {
      console.error('Error booking event tickets:', error);
      throw error;
    }
    
    return data;
  }

  /**
   * Gets event categories
   */
  async getEventCategories(): Promise<string[]> {
    const { data, error } = await this.supabase
      .from('events')
      .select('category')
      .order('category');
      
    if (error) {
      console.error('Error fetching event categories:', error);
      throw error;
    }
    
    // Extract unique categories
    const categories = Array.from(new Set(data.map(item => item.category)));
    // Add "Todas" as the first category
    return ['Todas', ...categories];
  }

  /**
   * Gets featured events
   */
  async getFeaturedEvents(limit: number = 4): Promise<Event[]> {
    const { data, error } = await this.supabase
      .from('events')
      .select('*')
      .eq('is_featured', true)
      .gt('date', new Date().toISOString().split('T')[0]) // Only future events
      .order('date', { ascending: true })
      .limit(limit);
      
    if (error) {
      console.error('Error fetching featured events:', error);
      throw error;
    }
    
    return data.map(adaptDBEventToComponentEvent);
  }
}

export const eventService = new EventService();
