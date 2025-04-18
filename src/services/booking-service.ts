
import { BaseApiService } from './base-api';
import { UIBooking, DatabaseBooking } from '@/types';
import { BookingDB, CreateBookingDTO } from '@/types/bookings';

/**
 * Service for handling booking-related API calls
 */
export class BookingService extends BaseApiService {
  /**
   * Get all bookings for a user
   */
  async getUserBookings(userId: string): Promise<UIBooking[]> {
    // Check if this is a demo user - if so, this should be handled by the hook
    if (userId.startsWith('demo-')) {
      throw new Error('Demo users should be handled at the hook level');
    }

    const { data, error } = await this.supabase
      .from('bookings')
      .select(`
        *,
        tours(*),
        accommodations(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching user bookings:', error);
      throw error;
    }
    
    // Transform database bookings into the application booking model
    return (data || []).map((bookingDB: BookingDB) => this.mapBookingFromDB(bookingDB));
  }

  /**
   * Create a new booking
   */
  async createBooking(bookingData: CreateBookingDTO): Promise<UIBooking> {
    // Check if this is a demo user - if so, return mock data
    if (bookingData.user_id.startsWith('demo-')) {
      return this.createMockBooking(bookingData);
    }

    const { data, error } = await this.supabase
      .from('bookings')
      .insert([bookingData])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
    
    return this.mapBookingFromDB(data as BookingDB);
  }

  /**
   * Cancel a booking
   */
  async cancelBooking(bookingId: string, userId: string): Promise<UIBooking> {
    // Check if this is a demo booking - if so, return mock data
    if (bookingId.startsWith('demo-') || userId.startsWith('demo-')) {
      return this.cancelMockBooking(bookingId);
    }
    
    // Convert bookingId to number since the database expects a number
    const numericBookingId = parseInt(bookingId, 10);
    
    if (isNaN(numericBookingId)) {
      throw new Error('Invalid booking ID format');
    }
    
    const { data, error } = await this.supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', numericBookingId)
      .eq('user_id', userId)
      .select()
      .single();
      
    if (error) {
      console.error('Error cancelling booking:', error);
      throw error;
    }
    
    return this.mapBookingFromDB(data as BookingDB);
  }

  /**
   * Helper method to map database booking to application booking model
   */
  private mapBookingFromDB(bookingDB: BookingDB): UIBooking {
    return {
      id: bookingDB.id.toString(),
      user_id: bookingDB.user_id,
      user_name: bookingDB.tours?.title || bookingDB.accommodations?.title || 'User',
      user_email: '',  // This would ideally come from user profiles
      item_type: bookingDB.tour_id ? 'tour' : bookingDB.accommodation_id ? 'accommodation' : 'package',
      item_name: bookingDB.tours?.title || bookingDB.accommodations?.title || 'Booking',
      start_date: bookingDB.start_date,
      end_date: bookingDB.end_date,
      guests: bookingDB.guests,
      total_price: bookingDB.total_price,
      status: bookingDB.status as 'confirmed' | 'pending' | 'cancelled',
      payment_status: bookingDB.payment_status as 'paid' | 'pending' | 'refunded',
      payment_method: bookingDB.payment_method,
      special_requests: bookingDB.special_requests,
      created_at: bookingDB.created_at,
      updated_at: bookingDB.updated_at,
      tour_id: bookingDB.tour_id,
      accommodation_id: bookingDB.accommodation_id,
      tours: bookingDB.tours,
      accommodations: bookingDB.accommodations
    };
  }

  /**
   * Create a mock booking for demo users
   */
  private createMockBooking(bookingData: CreateBookingDTO): UIBooking {
    const mockId = `demo-${Date.now()}`;
    const now = new Date().toISOString();
    
    return {
      id: mockId,
      user_id: bookingData.user_id,
      user_name: "Demo User",
      user_email: "demo@example.com",
      item_type: bookingData.tour_id ? 'tour' : bookingData.accommodation_id ? 'accommodation' : 'package',
      item_name: "Demo Booking",
      start_date: bookingData.start_date,
      end_date: bookingData.end_date,
      guests: bookingData.guests,
      total_price: bookingData.total_price,
      status: bookingData.status as 'confirmed' | 'pending' | 'cancelled',
      payment_status: bookingData.payment_status as 'paid' | 'pending' | 'refunded',
      payment_method: bookingData.payment_method || undefined,
      special_requests: bookingData.special_requests,
      created_at: now,
      updated_at: now,
      tour_id: bookingData.tour_id,
      accommodation_id: bookingData.accommodation_id
    };
  }

  /**
   * Cancel a mock booking for demo users
   */
  private cancelMockBooking(bookingId: string): UIBooking {
    return {
      id: bookingId,
      user_id: "demo-user",
      user_name: "Demo User",
      user_email: "demo@example.com",
      item_type: "tour",
      item_name: "Demo Booking",
      start_date: new Date().toISOString(),
      end_date: new Date().toISOString(),
      guests: 2,
      total_price: 100,
      status: 'cancelled',
      payment_status: 'refunded',
      payment_method: "credit_card",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tour_id: 1
    };
  }
}

export const bookingService = new BookingService();
