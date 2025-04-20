
import { BaseApiService } from './base-api';
import { Event } from '@/types/event';

/**
 * Service for handling event-related API calls
 */
export class EventService extends BaseApiService {
  /**
   * Get all events
   */
  async getEvents(): Promise<Event[]> {
    const { data, error } = await this.supabase
      .from('events')
      .select('*');
    
    if (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
    
    // Transform to ensure it matches the Event interface
    return data.map(event => ({
      ...event,
      title: event.name || event.title || '', // Handle both name and title for compatibility
      name: event.name || event.title || '',  // Handle both name and title for compatibility
      gallery_images: event.gallery_images || [],
      status: event.status || 'active',
      organizer: event.organizer || 'Noronha Adventures',
      featured: event.featured || event.is_featured || false
    })) as Event[];
  }

  /**
   * Get a specific event by ID
   */
  async getEventById(id: number): Promise<Event> {
    const { data, error } = await this.supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching event ${id}:`, error);
      throw error;
    }
    
    // Transform to ensure it matches the Event interface
    return {
      ...data,
      title: data.name || data.title || '', // Handle both name and title for compatibility
      name: data.name || data.title || '',  // Handle both name and title for compatibility
      gallery_images: data.gallery_images || [],
      status: data.status || 'active',
      organizer: data.organizer || 'Noronha Adventures',
      featured: data.featured || data.is_featured || false
    } as Event;
  }
  
  /**
   * Get events by partner ID
   */
  async getEventsByPartnerId(partnerId: string): Promise<Event[]> {
    const { data, error } = await this.supabase
      .from('events')
      .select('*')
      .eq('partner_id', partnerId);
    
    if (error) {
      console.error(`Error fetching events for partner ${partnerId}:`, error);
      throw error;
    }
    
    // Transform to ensure it matches the Event interface
    return data.map(event => ({
      ...event,
      title: event.name || event.title || '',
      name: event.name || event.title || '',
      gallery_images: event.gallery_images || [],
      status: event.status || 'active',
      organizer: event.organizer || 'Noronha Adventures',
      featured: event.featured || event.is_featured || false
    })) as Event[];
  }
  
  /**
   * Create a new event
   */
  async createEvent(eventData: Partial<Event>): Promise<Event> {
    // Ensure all required fields are present
    const dbEvent = {
      name: eventData.name || eventData.title || '',
      title: eventData.title || eventData.name || '',
      description: eventData.description || '',
      short_description: eventData.short_description || '',
      date: eventData.date || new Date().toISOString(),
      start_time: eventData.start_time || '09:00',
      end_time: eventData.end_time || '12:00',
      location: eventData.location || '',
      price: eventData.price || 0,
      capacity: eventData.capacity || 10,
      available_spots: eventData.available_spots !== undefined ? eventData.available_spots : eventData.capacity || 10,
      category: eventData.category || 'other',
      image_url: eventData.image_url || '',
      partner_id: eventData.partner_id || '',
      featured: eventData.featured || false,
      status: eventData.status || 'active',
      organizer: eventData.organizer || 'Noronha Adventures',
      gallery_images: eventData.gallery_images || []
    };
    
    const { data, error } = await this.supabase
      .from('events')
      .insert([dbEvent])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating event:', error);
      throw error;
    }
    
    return {
      ...data,
      gallery_images: data.gallery_images || []
    } as Event;
  }
  
  /**
   * Update an existing event
   */
  async updateEvent(id: number, eventData: Partial<Event>): Promise<Event> {
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
    
    return {
      ...data,
      gallery_images: data.gallery_images || []
    } as Event;
  }
  
  /**
   * Delete an event
   */
  async deleteEvent(id: number): Promise<void> {
    const { error } = await this.supabase
      .from('events')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting event ${id}:`, error);
      throw error;
    }
  }

  /**
   * Create an event booking
   */
  async createEventBooking(bookingData: any): Promise<any> {
    const { data, error } = await this.supabase
      .from('bookings')
      .insert([{
        user_id: bookingData.user_id,
        event_id: bookingData.event_id,
        start_date: bookingData.date || bookingData.start_date || new Date().toISOString(),
        end_date: bookingData.date || bookingData.end_date || new Date().toISOString(),
        guests: bookingData.guests || 1,
        total_price: bookingData.total_price || 0,
        status: bookingData.status || 'confirmed',
        payment_status: bookingData.payment_status || 'pending',
        payment_method: bookingData.payment_method || null,
        special_requests: bookingData.special_requests || null
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating event booking:', error);
      throw error;
    }
    
    return data;
  }
}

export const eventService = new EventService();
