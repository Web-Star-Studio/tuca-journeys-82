
import { BaseApiService } from './base-api';
import { Booking, CreateBookingDTO } from '@/types/bookings';

export class BookingService extends BaseApiService {
  /**
   * Create a new booking
   */
  async createBooking(bookingData: CreateBookingDTO): Promise<Booking | null> {
    try {
      const { data, error } = await this.supabase
        .from('bookings')
        .insert({
          user_id: bookingData.user_id,
          tour_id: bookingData.tour_id,
          accommodation_id: bookingData.accommodation_id,
          start_date: bookingData.start_date,
          end_date: bookingData.end_date,
          guests: bookingData.guests || bookingData.number_of_guests || 1,
          total_price: bookingData.total_price,
          status: bookingData.status,
          payment_status: bookingData.payment_status || 'pending',
          payment_method: bookingData.payment_method,
          special_requests: bookingData.special_requests,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select('*')
        .single();

      if (error) throw error;
      
      // Convert database result to Booking type format
      const booking: Booking = {
        ...data as any,
        user_name: '', // These fields will be populated via joins when retrieved
        user_email: '',
        item_type: data.tour_id ? 'tour' : data.accommodation_id ? 'accommodation' : 'event',
        item_name: '', // This will be populated when retrieved
      };
      
      return booking;
    } catch (error) {
      this.handleError(error, 'Failed to create booking');
      return null;
    }
  }

  /**
   * Cancel a booking
   */
  async cancelBooking(bookingId: string): Promise<Booking | null> {
    try {
      // Convert string ID to number for the database query
      const id = typeof bookingId === 'string' ? parseInt(bookingId, 10) : bookingId;
      
      const { data, error } = await this.supabase
        .from('bookings')
        .update({
          status: 'cancelled',
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select('*')
        .single();

      if (error) throw error;
      
      // Convert database result to Booking type format
      const booking: Booking = {
        ...data as any,
        user_name: '', // These fields will be populated via joins when retrieved
        user_email: '',
        item_type: data.tour_id ? 'tour' : data.accommodation_id ? 'accommodation' : 'event',
        item_name: '', // This will be populated when retrieved
      };
      
      return booking;
    } catch (error) {
      this.handleError(error, 'Failed to cancel booking');
      return null;
    }
  }

  /**
   * Update booking status
   */
  async updateBookingStatus(bookingId: number, status: 'confirmed' | 'pending' | 'cancelled'): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('bookings')
        .update({
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', bookingId);

      if (error) throw error;
      return true;
    } catch (error) {
      this.handleError(error, 'Failed to update booking status');
      return false;
    }
  }

  /**
   * Update payment status
   */
  async updatePaymentStatus(bookingId: number, paymentStatus: 'paid' | 'pending' | 'refunded'): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('bookings')
        .update({
          payment_status: paymentStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', bookingId);

      if (error) throw error;
      return true;
    } catch (error) {
      this.handleError(error, 'Failed to update payment status');
      return false;
    }
  }

  /**
   * Get user bookings with details
   */
  async getUserBookings(userId: string): Promise<Booking[]> {
    try {
      const { data, error } = await this.supabase
        .from('bookings')
        .select(`
          *,
          tours:tour_id (*),
          accommodations:accommodation_id (*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as unknown as Booking[];
    } catch (error) {
      this.handleError(error, 'Failed to get user bookings');
      return [];
    }
  }

  /**
   * Get partner bookings (for service providers)
   */
  async getPartnerBookings(partnerId: string): Promise<Booking[]> {
    try {
      // First get tours owned by this partner
      const { data: tourIds, error: tourError } = await this.supabase
        .from('tours')
        .select('id')
        .eq('partner_id', partnerId);
      
      if (tourError) throw tourError;
      
      // Get accommodations owned by this partner
      const { data: accommodationIds, error: accomError } = await this.supabase
        .from('accommodations')
        .select('id')
        .eq('partner_id', partnerId);
        
      if (accomError) throw accomError;
      
      // Get bookings for these services
      const tourBookingPromise = tourIds.length > 0 ? this.supabase
        .from('bookings')
        .select(`*, tours:tour_id (*)`)
        .in('tour_id', tourIds.map(t => t.id))
        .order('created_at', { ascending: false }) : null;
        
      const accomBookingPromise = accommodationIds.length > 0 ? this.supabase
        .from('bookings')
        .select(`*, accommodations:accommodation_id (*)`)
        .in('accommodation_id', accommodationIds.map(a => a.id))
        .order('created_at', { ascending: false }) : null;
        
      // Execute both queries
      const [tourResults, accomResults] = await Promise.all([
        tourBookingPromise ? tourBookingPromise : Promise.resolve({ data: [] }),
        accomBookingPromise ? accomBookingPromise : Promise.resolve({ data: [] })
      ]);
      
      // Merge results
      const allBookings = [
        ...(tourResults?.data || []),
        ...(accomResults?.data || [])
      ];
      
      return allBookings as unknown as Booking[];
    } catch (error) {
      this.handleError(error, 'Failed to get partner bookings');
      return [];
    }
  }
}

export const bookingService = new BookingService();
