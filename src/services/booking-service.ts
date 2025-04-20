
import { BaseApiService } from './base-api';
import { Booking, CreateBookingDTO } from '@/types/bookings';
import { supabase } from '@/lib/supabase';

export class BookingService extends BaseApiService {
  async getBookings(userId?: string): Promise<Booking[]> {
    if (userId) {
      return this.getUserBookings(userId);
    }
    
    // If no userId provided, return all bookings (admin function)
    return this.getMockBookings();
  }

  async getUserBookings(userId: string): Promise<Booking[]> {
    if (!userId) {
      throw new Error('User ID is required');
    }
    
    // For demo users, return mock bookings
    if (userId.startsWith('demo-')) {
      return this.getMockBookings();
    }
    
    try {
      // Use supabase to get the user's bookings
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      // Map the database bookings to our application model
      const bookings = data.map(booking => ({
        id: booking.id.toString(),
        user_id: booking.user_id,
        user_name: 'User', // This would need to be populated from user profiles
        user_email: '', // This would need to be populated from user profiles
        tour_id: booking.tour_id,
        accommodation_id: booking.accommodation_id,
        event_id: booking.event_id || null,
        vehicle_id: booking.vehicle_id || null,
        item_type: booking.tour_id ? 'tour' : 
                  booking.accommodation_id ? 'accommodation' : 
                  booking.event_id ? 'event' : 'vehicle',
        item_name: '', // This would need to be populated based on the related item
        start_date: booking.start_date,
        end_date: booking.end_date,
        guests: booking.guests,
        total_price: booking.total_price,
        status: booking.status as 'pending' | 'confirmed' | 'cancelled',
        payment_status: booking.payment_status as 'paid' | 'pending' | 'refunded',
        payment_method: booking.payment_method,
        special_requests: booking.special_requests,
        created_at: booking.created_at,
        updated_at: booking.updated_at
      }));
      
      return bookings;
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      // Fallback to mock data
      return this.getMockBookings();
    }
  }

  async getBookingById(bookingId: string): Promise<Booking | null> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .single();
      
      if (error) {
        throw error;
      }
      
      if (!data) {
        return null;
      }
      
      // Map to our application model
      return {
        id: data.id.toString(),
        user_id: data.user_id,
        user_name: 'User',
        user_email: '',
        tour_id: data.tour_id,
        accommodation_id: data.accommodation_id,
        event_id: data.event_id || null,
        vehicle_id: data.vehicle_id || null,
        item_type: data.tour_id ? 'tour' : 
                  data.accommodation_id ? 'accommodation' : 
                  data.event_id ? 'event' : 'vehicle',
        item_name: '',
        start_date: data.start_date,
        end_date: data.end_date,
        guests: data.guests,
        total_price: data.total_price,
        status: data.status as 'pending' | 'confirmed' | 'cancelled',
        payment_status: data.payment_status as 'paid' | 'pending' | 'refunded',
        payment_method: data.payment_method,
        special_requests: data.special_requests,
        created_at: data.created_at,
        updated_at: data.updated_at
      };
    } catch (error) {
      console.error(`Error fetching booking ${bookingId}:`, error);
      // For demo purposes, find in mock bookings
      const mockBooking = this.getMockBookings().find(booking => booking.id === bookingId);
      return mockBooking || null;
    }
  }
  
  async createBooking(bookingData: CreateBookingDTO): Promise<Booking> {
    try {
      // Create a booking object that matches the database schema
      // Map number_of_guests to guests as required by the database
      const dbBooking = {
        user_id: bookingData.user_id,
        tour_id: bookingData.tour_id,
        accommodation_id: bookingData.accommodation_id,
        event_id: bookingData.event_id,
        vehicle_id: bookingData.vehicle_id,
        start_date: bookingData.start_date,
        end_date: bookingData.end_date,
        guests: bookingData.guests || bookingData.number_of_guests,
        total_price: bookingData.total_price,
        status: bookingData.status,
        payment_status: bookingData.payment_status || 'pending',
        payment_method: bookingData.payment_method || null,
        special_requests: bookingData.special_requests || null
      };
      
      const { data, error } = await supabase
        .from('bookings')
        .insert([dbBooking])
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      // Map the response back to the Booking interface expected by the app
      return {
        id: data.id.toString(),
        user_id: data.user_id,
        user_name: 'User',
        user_email: '',
        tour_id: data.tour_id,
        accommodation_id: data.accommodation_id,
        event_id: data.event_id || null,
        vehicle_id: data.vehicle_id || null,
        item_type: data.tour_id ? 'tour' : 
                  data.accommodation_id ? 'accommodation' : 
                  data.event_id ? 'event' : 'vehicle',
        item_name: '',
        start_date: data.start_date,
        end_date: data.end_date,
        guests: data.guests,
        total_price: data.total_price,
        status: data.status as 'pending' | 'confirmed' | 'cancelled',
        payment_status: data.payment_status as 'paid' | 'pending' | 'refunded',
        payment_method: data.payment_method,
        special_requests: data.special_requests,
        created_at: data.created_at,
        updated_at: data.updated_at
      };
    } catch (error) {
      console.error('Error creating booking:', error);
      
      // For demo purposes, create a mock booking
      const newMockBooking: Booking = {
        id: `booking-${Date.now()}`,
        user_id: bookingData.user_id,
        user_name: 'Demo User',
        user_email: 'demo@example.com',
        tour_id: bookingData.tour_id,
        accommodation_id: bookingData.accommodation_id,
        event_id: bookingData.event_id,
        vehicle_id: bookingData.vehicle_id,
        item_type: bookingData.tour_id ? 'tour' : 
                  bookingData.accommodation_id ? 'accommodation' : 
                  bookingData.event_id ? 'event' : 'vehicle',
        item_name: 'Demo Booking',
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
      };
      
      return newMockBooking;
    }
  }
  
  async cancelBooking(bookingId: string): Promise<Booking> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId)
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      // Map to our application model
      return {
        id: data.id.toString(),
        user_id: data.user_id,
        user_name: 'User',
        user_email: '',
        tour_id: data.tour_id,
        accommodation_id: data.accommodation_id,
        event_id: data.event_id || null,
        vehicle_id: data.vehicle_id || null,
        item_type: data.tour_id ? 'tour' : 
                  data.accommodation_id ? 'accommodation' : 
                  data.event_id ? 'event' : 'vehicle',
        item_name: '',
        start_date: data.start_date,
        end_date: data.end_date,
        guests: data.guests,
        total_price: data.total_price,
        status: data.status as 'pending' | 'confirmed' | 'cancelled',
        payment_status: data.payment_status as 'paid' | 'pending' | 'refunded',
        payment_method: data.payment_method,
        special_requests: data.special_requests,
        created_at: data.created_at,
        updated_at: data.updated_at
      };
    } catch (error) {
      console.error(`Error cancelling booking ${bookingId}:`, error);
      
      // For demo purposes, find and update in mock bookings
      const mockBookings = this.getMockBookings();
      const bookingIndex = mockBookings.findIndex(booking => booking.id === bookingId);
      
      if (bookingIndex !== -1) {
        const updatedBooking = {
          ...mockBookings[bookingIndex],
          status: 'cancelled',
          updated_at: new Date().toISOString()
        };
        
        return updatedBooking;
      }
      
      throw new Error(`Booking with ID ${bookingId} not found`);
    }
  }

  private getMockBookings(): Booking[] {
    const today = new Date().toISOString();
    const yesterday = new Date(Date.now() - 86400000).toISOString();
    const tomorrow = new Date(Date.now() + 86400000).toISOString();
    const nextWeek = new Date(Date.now() + 86400000 * 7).toISOString();
    
    return [
      {
        id: '1',
        user_id: 'demo-user-1',
        user_name: 'Demo User',
        user_email: 'demo@example.com',
        tour_id: 1,
        accommodation_id: null,
        event_id: null,
        vehicle_id: null,
        item_type: 'tour',
        item_name: 'Passeio de Barco ao Pôr do Sol',
        start_date: tomorrow,
        end_date: tomorrow,
        guests: 2,
        total_price: 240,
        status: 'confirmed',
        payment_status: 'paid',
        created_at: yesterday,
        updated_at: yesterday,
        payment_method: 'credit_card',
        special_requests: null
      },
      {
        id: '2',
        user_id: 'demo-user-1',
        user_name: 'Demo User',
        user_email: 'demo@example.com',
        tour_id: null,
        accommodation_id: 1,
        event_id: null,
        vehicle_id: null,
        item_type: 'accommodation',
        item_name: 'Pousada Vista Mar',
        start_date: nextWeek,
        end_date: new Date(Date.now() + 86400000 * 10).toISOString(),
        guests: 2,
        total_price: 1200,
        status: 'confirmed',
        payment_status: 'paid',
        created_at: yesterday,
        updated_at: yesterday,
        payment_method: 'credit_card',
        special_requests: 'Quarto com vista para o mar, por favor.'
      }
    ];
  }
}

export const bookingService = new BookingService();
