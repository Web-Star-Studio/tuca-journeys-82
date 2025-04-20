import { BaseApiService } from './base-api';
import { UIBooking } from '@/types';

export interface CreateBookingDTO {
  user_id: string;
  tour_id?: number;
  accommodation_id?: number;
  start_date: string;
  end_date: string;
  number_of_guests: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  payment_method?: string;
}

export class BookingService extends BaseApiService {
  async getUserBookings(userId: string): Promise<UIBooking[]> {
    // For demo users, return mock data
    if (userId.startsWith('demo-')) {
      return this.getMockBookings();
    }

    // Actual implementation for real users would go here
    // This is a placeholder
    return [];
  }

  async createBooking(bookingData: CreateBookingDTO): Promise<UIBooking> {
    // Placeholder implementation
    return {
      id: `booking-${Date.now()}`,
      user_id: bookingData.user_id,
      tour_id: bookingData.tour_id,
      accommodation_id: bookingData.accommodation_id,
      item_type: bookingData.tour_id ? 'tour' : 'accommodation',
      item_name: bookingData.tour_id ? 'Tour Name' : 'Accommodation Name',
      user_name: 'User Name',
      user_email: 'user@example.com',
      start_date: bookingData.start_date,
      end_date: bookingData.end_date,
      guests: bookingData.number_of_guests,
      total_price: bookingData.total_price,
      status: bookingData.status,
      payment_status: bookingData.status === 'confirmed' ? 'paid' : 'pending',
      payment_method: bookingData.payment_method,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  async cancelBooking(bookingId: string, userId: string): Promise<void> {
    // Placeholder implementation
    console.log(`Cancelling booking ${bookingId} for user ${userId}`);
    return;
  }

  private getMockBookings(): UIBooking[] {
    return [
      {
        id: "demo-1001",
        user_id: "demo-user",
        tour_id: 1,
        item_type: "tour",
        item_name: "Passeio de Barco ao Pôr do Sol",
        user_name: "Demo User",
        user_email: "demo@example.com",
        start_date: new Date(Date.now() + 86400000 * 5).toISOString(),
        end_date: new Date(Date.now() + 86400000 * 5).toISOString(),
        guests: 2,
        total_price: 350,
        status: 'confirmed',
        payment_status: 'paid',
        payment_method: "credit_card",
        created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
        updated_at: new Date(Date.now() - 86400000 * 2).toISOString()
      },
      {
        id: "demo-1002",
        user_id: "demo-user",
        accommodation_id: 2,
        item_type: "accommodation",
        item_name: "Pousada Vista Mar",
        user_name: "Demo User",
        user_email: "demo@example.com",
        start_date: new Date(Date.now() + 86400000 * 15).toISOString(),
        end_date: new Date(Date.now() + 86400000 * 20).toISOString(),
        guests: 2,
        total_price: 1250,
        status: 'pending',
        payment_status: 'pending',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date(Date.now() - 86400000).toISOString()
      }
    ];
  }
}

export const bookingService = new BookingService();
