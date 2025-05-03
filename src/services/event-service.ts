import { supabase } from '@/lib/supabase';
import { Event, EventFilters, EventTicket, EventBooking } from '@/types/event';
import { BaseApiService } from './base-api';
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

  /**
   * Creates a new event
   */
  async createEvent(eventData: Partial<Event>): Promise<Event> {
    console.log('Creating new event:', eventData);
    
    // Prepare data for tickets if available
    const tickets = eventData.tickets ? [...eventData.tickets] : [];
    delete eventData.tickets; // Remove from event data as it's stored separately
    
    const { data, error } = await this.supabase
      .from('events')
      .insert({
        name: eventData.name || 'Novo Evento',
        title: eventData.name || 'Novo Evento', // Ensure title is set (for database)
        description: eventData.description || '',
        short_description: eventData.description?.substring(0, 150) || '', // Set short_description from description
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
        is_featured: eventData.featured || false,
        policies: eventData.policies || null
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating event:', error);
      throw error;
    }
    
    // Create tickets if any were provided
    if (tickets.length > 0) {
      for (const ticket of tickets) {
        await this.createTicketForEvent(data.id, {
          name: ticket.name,
          price: ticket.price,
          available_quantity: ticket.available_quantity,
          max_per_order: ticket.max_per_order,
          description: ticket.description,
          type: ticket.type,
          benefits: ticket.benefits || []
        });
      }
    } else {
      // Create default ticket
      await this.createTicketForEvent(data.id, {
        name: 'Ingresso Padrão',
        price: data.price,
        available_quantity: data.available_spots,
        max_per_order: 4,
        type: 'regular'
      });
    }

    return adaptDBEventToComponentEvent(data);
  }

  /**
   * Updates an existing event
   */
  async updateEvent(id: number, updates: Partial<Event>): Promise<Event> {
    console.log(`Updating event with ID: ${id}`, updates);
    
    // Handle tickets separately if provided
    const tickets = updates.tickets ? [...updates.tickets] : null;
    delete updates.tickets;
    
    // Convert frontend model to database model
    const dbUpdates = {
      ...(updates.name !== undefined && { name: updates.name }),
      ...(updates.name !== undefined && { title: updates.name }), // Update title as well for consistency
      ...(updates.description !== undefined && { description: updates.description }),
      ...(updates.description !== undefined && { 
        short_description: updates.description.substring(0, 150) // Update short_description from description
      }),
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
      ...(updates.policies !== undefined && { policies: updates.policies }),
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
    
    // Update tickets if provided
    if (tickets && tickets.length > 0) {
      try {
        // First get existing tickets
        const existingTickets = await this.getEventTickets(id);
          
        // If we have existing tickets, delete them
        if (existingTickets && existingTickets.length > 0) {
          await this.deleteEventTickets(id);
        }
        
        // Create new tickets
        for (const ticket of tickets) {
          await this.createTicketForEvent(id, {
            name: ticket.name,
            price: ticket.price,
            available_quantity: ticket.available_quantity,
            max_per_order: ticket.max_per_order,
            description: ticket.description,
            type: ticket.type,
            benefits: ticket.benefits || []
          });
        }
      } catch (ticketError) {
        console.error(`Error updating tickets for event ID: ${id}:`, ticketError);
        // Continue despite ticket errors
      }
    }

    return adaptDBEventToComponentEvent(data);
  }

  /**
   * Creates a ticket for an event - Using RPC call instead of direct database access
   */
  private async createTicketForEvent(eventId: number, ticketData: {
    name: string;
    price: number;
    available_quantity: number;
    max_per_order: number;
    description?: string;
    type?: string;
    benefits?: string[];
  }) {
    try {
      // Use RPC to avoid type issues
      await this.supabase.rpc('create_event_ticket', {
        p_event_id: eventId,
        p_name: ticketData.name,
        p_price: ticketData.price,
        p_available_quantity: ticketData.available_quantity,
        p_max_per_order: ticketData.max_per_order || 4,
        p_description: ticketData.description || null,
        p_type: ticketData.type || 'regular',
        p_benefits: ticketData.benefits || []
      });
    } catch (error) {
      console.error(`Error creating ticket for event ID: ${eventId}:`, error);
      
      // Fallback approach with type assertion if RPC fails
      try {
        await (this.supabase
          .from('event_tickets' as any)
          .insert({
            event_id: eventId,
            name: ticketData.name,
            price: ticketData.price,
            available_quantity: ticketData.available_quantity,
            max_per_order: ticketData.max_per_order || 4,
            description: ticketData.description || null,
            type: ticketData.type || 'regular',
            benefits: ticketData.benefits || []
          } as any) as any);
      } catch (fallbackError) {
        console.error(`Fallback error creating ticket for event ID: ${eventId}:`, fallbackError);
        throw fallbackError;
      }
    }
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
  async bookEventTickets(eventId: number, userId: string, ticketCount: number, attendeeInfo: any): Promise<any> {
    console.log(`Booking ${ticketCount} tickets for event ID: ${eventId}`);
    
    // First get the event to check availability
    const event = await this.getEventById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }
    
    if (!event.available_spots || event.available_spots < ticketCount) {
      throw new Error('Not enough available spots for this booking');
    }
    
    // Use the book_event_tickets function we created
    const { data, error } = await this.supabase.rpc('book_event_tickets', {
      p_event_id: eventId,
      p_user_id: userId,
      p_ticket_count: ticketCount,
      p_total_price: event.price * ticketCount,
      p_ticket_data: attendeeInfo
    });

    if (error) {
      console.error('Error booking event tickets:', error);
      throw error;
    }
    
    return data;
  }

  /**
   * Gets event tickets - Using RPC call instead of direct database query
   */
  async getEventTickets(eventId: number): Promise<EventTicket[]> {
    try {
      // First try using RPC
      const { data, error } = await this.supabase.rpc('get_event_tickets', {
        p_event_id: eventId
      });
      
      if (error) throw error;
      return data as EventTicket[];
      
    } catch (error) {
      console.error(`Error fetching tickets with RPC for event ID: ${eventId}:`, error);
      
      // Fallback approach with type assertion
      try {
        const { data, error } = await (this.supabase
          .from('event_tickets' as any)
          .select('*')
          .eq('event_id', eventId)
          .order('price', { ascending: true }) as any);
          
        if (error) throw error;
        return data as EventTicket[];
        
      } catch (fallbackError) {
        console.error(`Fallback error fetching tickets for event ID: ${eventId}:`, fallbackError);
        throw fallbackError;
      }
    }
  }

  /**
   * Deletes event tickets - Using RPC call instead of direct database query
   */
  async deleteEventTickets(eventId: number): Promise<void> {
    try {
      // First try using RPC
      const { error } = await this.supabase.rpc('delete_event_tickets', {
        p_event_id: eventId
      });
      
      if (error) throw error;
      
    } catch (error) {
      console.error(`Error deleting tickets with RPC for event ID: ${eventId}:`, error);
      
      // Fallback approach with type assertion
      try {
        const { error } = await (this.supabase
          .from('event_tickets' as any)
          .delete()
          .eq('event_id', eventId) as any);
          
        if (error) throw error;
        
      } catch (fallbackError) {
        console.error(`Fallback error deleting tickets for event ID: ${eventId}:`, fallbackError);
        throw fallbackError;
      }
    }
  }

  /**
   * Gets user's event bookings - Using direct database query with joins
   */
  async getUserEventBookings(userId: string): Promise<EventBooking[]> {
    const { data, error } = await this.supabase
      .from('event_bookings')
      .select(`
        *,
        event:events(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error(`Error fetching event bookings for user ID: ${userId}:`, error);
      throw error;
    }
    
    return data as unknown as EventBooking[];
  }
}

export const eventService = new EventService();
