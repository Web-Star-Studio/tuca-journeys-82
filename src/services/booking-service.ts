
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
}

export const bookingService = new BookingService();
