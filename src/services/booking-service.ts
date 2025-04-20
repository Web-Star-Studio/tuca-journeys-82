
import { BaseApiService } from './base-api';
import { Booking, CreateBookingDTO } from '@/types/bookings';

export class BookingService extends BaseApiService {
  async getBookings(): Promise<Booking[]> {
    return this.getMockBookings();
  }

  async getBookingById(id: string): Promise<Booking | null> {
    const bookings = await this.getBookings();
    return bookings.find(booking => booking.id === id) || null;
  }

  async getBookingsByUserId(userId: string): Promise<Booking[]> {
    const bookings = await this.getBookings();
    return bookings.filter(booking => booking.user_id === userId);
  }

  async getBookingsByPartnerId(partnerId: string): Promise<Booking[]> {
    // For demo partners, return mock data
    if (partnerId.startsWith('demo-')) {
      return this.getMockBookings();
    }

    // Placeholder implementation
    return [];
  }

  async createBooking(bookingData: CreateBookingDTO): Promise<Booking> {
    // Placeholder implementation
    return {
      id: Date.now().toString(),
      user_id: bookingData.user_id,
      tour_id: bookingData.tour_id,
      accommodation_id: bookingData.accommodation_id,
      event_id: bookingData.event_id,
      vehicle_id: bookingData.vehicle_id,
      item_type: 
        bookingData.tour_id ? 'tour' : 
        bookingData.accommodation_id ? 'accommodation' :
        bookingData.event_id ? 'event' :
        bookingData.vehicle_id ? 'vehicle' : 'tour',
      item_name: 'Booking Item',
      user_name: 'User',
      user_email: 'user@example.com',
      start_date: bookingData.start_date,
      end_date: bookingData.end_date,
      guests: bookingData.guests,
      total_price: bookingData.total_price,
      status: bookingData.status,
      payment_status: bookingData.payment_status || 'pending',
      payment_method: bookingData.payment_method,
      special_requests: bookingData.special_requests,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  async cancelBooking(id: string): Promise<Booking> {
    const booking = await this.getBookingById(id);
    if (!booking) {
      throw new Error(`Booking with ID ${id} not found`);
    }
    
    // In a real app, this would update the booking in the database
    // For now, we'll just return a modified version of the booking
    return {
      ...booking,
      status: 'cancelled',
      updated_at: new Date().toISOString()
    };
  }

  private getMockBookings(): Booking[] {
    return [
      {
        id: '1',
        user_id: 'user-1',
        tour_id: 1,
        item_type: 'tour',
        item_name: 'Passeio de Barco ao Pôr do Sol',
        user_name: 'João Silva',
        user_email: 'joao@example.com',
        start_date: '2025-07-15',
        end_date: '2025-07-15',
        guests: 2,
        total_price: 700,
        status: 'confirmed',
        payment_status: 'paid',
        payment_method: 'credit_card',
        created_at: '2025-06-01T14:30:00Z',
        updated_at: '2025-06-01T14:30:00Z'
      },
      {
        id: '2',
        user_id: 'user-2',
        accommodation_id: 1,
        item_type: 'accommodation',
        item_name: 'Pousada Vista Mar',
        user_name: 'Maria Oliveira',
        user_email: 'maria@example.com',
        start_date: '2025-08-10',
        end_date: '2025-08-15',
        guests: 2,
        total_price: 4250,
        status: 'confirmed',
        payment_status: 'paid',
        created_at: '2025-07-01T10:15:00Z',
        updated_at: '2025-07-01T10:15:00Z'
      },
      {
        id: '3',
        user_id: 'user-3',
        event_id: 1,
        item_type: 'event',
        item_name: 'Festival de Gastronomia',
        user_name: 'Pedro Santos',
        user_email: 'pedro@example.com',
        start_date: '2025-09-20',
        end_date: '2025-09-20',
        guests: 2,
        total_price: 120,
        status: 'pending',
        payment_status: 'pending',
        created_at: '2025-08-01T16:45:00Z',
        updated_at: '2025-08-01T16:45:00Z'
      },
      {
        id: '4',
        user_id: 'user-1',
        vehicle_id: 1,
        item_type: 'vehicle',
        item_name: 'Buggy 4x4',
        user_name: 'João Silva',
        user_email: 'joao@example.com',
        start_date: '2025-10-10',
        end_date: '2025-10-13',
        guests: 1, // Represents number of vehicles in this context
        total_price: 750,
        status: 'confirmed',
        payment_status: 'paid',
        created_at: '2025-09-01T09:20:00Z',
        updated_at: '2025-09-01T09:20:00Z'
      }
    ];
  }
}

export const bookingService = new BookingService();
