import { BaseApiService } from './base-api';
import { Event } from '@/types/event';

export class EventService extends BaseApiService {
  async getEvents(): Promise<Event[]> {
    // Placeholder implementation
    return this.getMockEvents();
  }

  async getEventById(id: number): Promise<Event | null> {
    const events = await this.getEvents();
    return events.find(event => event.id === id) || null;
  }

  async getEventsByPartnerId(partnerId: string): Promise<Event[]> {
    // For demo partners, return mock data
    if (partnerId.startsWith('demo-')) {
      return this.getMockEvents().filter(event => event.partner_id === partnerId);
    }

    // Placeholder implementation
    return [];
  }

  async createEvent(eventData: Omit<Event, 'id' | 'created_at' | 'updated_at'>): Promise<Event> {
    // Placeholder implementation
    return {
      id: Date.now(),
      ...eventData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  async updateEvent(id: number, eventData: Partial<Event>): Promise<Event> {
    // Placeholder implementation
    return {
      id,
      name: 'Updated Event',
      description: 'Description',
      date: new Date().toISOString(),
      location: 'Location',
      price: 100,
      capacity: 50,
      image_url: '',
      partner_id: eventData.partner_id || 'partner-1',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  async deleteEvent(id: number): Promise<void> {
    // Placeholder implementation
    console.log(`Deleting event ${id}`);
  }

  async createEventBooking(bookingData: any): Promise<any> {
    // Placeholder implementation
    return {
      id: Date.now(),
      ...bookingData,
      created_at: new Date().toISOString()
    };
  }

  private getMockEvents(): Event[] {
    return [
      {
        id: 1,
        name: 'Festival de Verão',
        description: 'Um festival de música e cultura na praia',
        date: new Date(Date.now() + 86400000 * 20).toISOString(),
        location: 'Praia do Leão',
        price: 120,
        capacity: 500,
        image_url: '/events/festival.jpg',
        partner_id: 'demo-partner-1',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 2,
        name: 'Workshop de Fotografia',
        description: 'Aprenda técnicas de fotografia de natureza',
        date: new Date(Date.now() + 86400000 * 5).toISOString(),
        location: 'Centro Cultural',
        price: 80,
        capacity: 30,
        image_url: '/events/photo-workshop.jpg',
        partner_id: 'demo-partner-2',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
  }
}

export const eventService = new EventService();
