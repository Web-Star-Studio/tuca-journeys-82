
import { BaseApiService } from './base-api';
import { Event } from '@/types/event';

class EventService extends BaseApiService {
  async getEvents(filters = {}) {
    const { data, error } = await this.supabase
      .from('events')
      .select('*');

    if (error) {
      console.error('Error fetching events:', error);
      throw error;
    }

    return data as Event[];
  }

  async getFeaturedEvents(filters = {}) {
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
}

export const eventService = new EventService();
