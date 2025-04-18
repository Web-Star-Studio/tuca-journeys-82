
import { BaseApiService } from './base-api';
import { Event, EventBooking } from '@/types/event';

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
    
    return data as Event[];
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
    
    return data as Event;
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
    
    return data as Event[];
  }

  /**
   * Create a new event
   */
  async createEvent(eventData: Omit<Event, 'id' | 'created_at' | 'updated_at'>): Promise<Event> {
    const { data, error } = await this.supabase
      .from('events')
      .insert([eventData])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating event:', error);
      throw error;
    }
    
    return data as Event;
  }

  /**
   * Update an event
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
    
    return data as Event;
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
  async createEventBooking(bookingData: Omit<EventBooking, 'id' | 'created_at' | 'updated_at'>): Promise<EventBooking> {
    const { data, error } = await this.supabase
      .from('event_bookings')
      .insert([bookingData])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating event booking:', error);
      throw error;
    }
    
    return {
      ...data,
      status: data.status as EventBooking['status'],
      payment_status: data.payment_status as EventBooking['payment_status']
    } as EventBooking;
  }

  /**
   * Get event bookings by user ID
   */
  async getEventBookingsByUserId(userId: string): Promise<EventBooking[]> {
    const { data, error } = await this.supabase
      .from('event_bookings')
      .select(`
        *,
        events(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error(`Error fetching event bookings for user ${userId}:`, error);
      throw error;
    }
    
    return data.map(booking => ({
      ...booking,
      status: booking.status as EventBooking['status'],
      payment_status: booking.payment_status as EventBooking['payment_status']
    })) as unknown as EventBooking[];
  }

  /**
   * Get event bookings by partner ID
   */
  async getEventBookingsByPartnerId(partnerId: string): Promise<EventBooking[]> {
    const { data, error } = await this.supabase
      .from('event_bookings')
      .select(`
        *,
        events!inner(*)
      `)
      .eq('events.partner_id', partnerId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error(`Error fetching event bookings for partner ${partnerId}:`, error);
      throw error;
    }
    
    return data.map(booking => ({
      ...booking,
      status: booking.status as EventBooking['status'],
      payment_status: booking.payment_status as EventBooking['payment_status']
    })) as unknown as EventBooking[];
  }

  /**
   * Cancel an event booking
   */
  async cancelEventBooking(bookingId: number): Promise<EventBooking> {
    const { data, error } = await this.supabase
      .from('event_bookings')
      .update({ 
        status: 'cancelled' as const,
        payment_status: 'refunded' as const
      })
      .eq('id', bookingId)
      .select()
      .single();
    
    if (error) {
      console.error(`Error cancelling event booking ${bookingId}:`, error);
      throw error;
    }
    
    return data as EventBooking;
  }
}

export const eventService = new EventService();
