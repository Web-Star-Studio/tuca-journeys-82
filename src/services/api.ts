
import { supabase } from '@/lib/supabase';
import { Booking, Tour, Accommodation, UserProfile } from '@/types';
import { Package } from '@/data/types/packageTypes';

/**
 * Base API service for interacting with Supabase
 */
class ApiService {
  // Tours
  async getTours(): Promise<Tour[]> {
    const { data, error } = await supabase
      .from('tours')
      .select('*');
    
    if (error) {
      console.error('Error fetching tours:', error);
      throw error;
    }
    
    return data;
  }

  async getTourById(id: number): Promise<Tour> {
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching tour ${id}:`, error);
      throw error;
    }
    
    return data;
  }

  // Accommodations
  async getAccommodations(): Promise<Accommodation[]> {
    const { data, error } = await supabase
      .from('accommodations')
      .select('*');
    
    if (error) {
      console.error('Error fetching accommodations:', error);
      throw error;
    }
    
    return data;
  }

  async getAccommodationById(id: number): Promise<Accommodation> {
    const { data, error } = await supabase
      .from('accommodations')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching accommodation ${id}:`, error);
      throw error;
    }
    
    return data;
  }

  // Bookings
  async getUserBookings(userId: string): Promise<any[]> {
    const { data, error } = await supabase
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
    
    return data || [];
  }

  async createBooking(bookingData: Partial<Booking>): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .insert([bookingData])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
    
    return data;
  }

  async cancelBooking(bookingId: number, userId: string): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', bookingId)
      .eq('user_id', userId)
      .select()
      .single();
      
    if (error) {
      console.error('Error cancelling booking:', error);
      throw error;
    }
    
    return data;
  }

  // User profiles
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is the error for "no rows returned"
      console.error('Error fetching user profile:', error);
      throw error;
    }
    
    return data || null;
  }

  async createOrUpdateUserProfile(profile: Partial<UserProfile> & { id: string }): Promise<UserProfile> {
    // Check if profile exists
    try {
      const existingProfile = await this.getUserProfile(profile.id);
      
      if (existingProfile) {
        // Update
        const { data, error } = await supabase
          .from('user_profiles')
          .update(profile)
          .eq('id', profile.id)
          .select()
          .single();
        
        if (error) {
          throw error;
        }
        
        return data;
      } else {
        // Create
        const { data, error } = await supabase
          .from('user_profiles')
          .insert([profile])
          .select()
          .single();
        
        if (error) {
          throw error;
        }
        
        return data;
      }
    } catch (error) {
      console.error('Error creating/updating user profile:', error);
      throw error;
    }
  }

  // User roles
  async getUserRoles(userId: string): Promise<string[]> {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error fetching user roles:', error);
      throw error;
    }
    
    return data.map(item => item.role);
  }

  async hasRole(userId: string, roleName: string): Promise<boolean> {
    if (!userId) return false;
    
    try {
      const roles = await this.getUserRoles(userId);
      return roles.includes(roleName);
    } catch (error) {
      console.error('Error checking user role:', error);
      return false;
    }
  }
}

export const apiService = new ApiService();
