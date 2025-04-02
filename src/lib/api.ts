
import { supabase } from './supabase';
import { Tour, Accommodation, Booking, UserProfile } from '@/types/database';

// Tours API
export const getToursFromDB = async () => {
  const { data, error } = await supabase
    .from('tours')
    .select('*');
  
  if (error) {
    console.error('Error fetching tours:', error);
    throw error;
  }
  
  return data as Tour[];
};

export const getTourByIdFromDB = async (id: number) => {
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching tour ${id}:`, error);
    throw error;
  }
  
  return data as Tour;
};

// Accommodations API
export const getAccommodationsFromDB = async () => {
  const { data, error } = await supabase
    .from('accommodations')
    .select('*');
  
  if (error) {
    console.error('Error fetching accommodations:', error);
    throw error;
  }
  
  return data as Accommodation[];
};

export const getAccommodationByIdFromDB = async (id: number) => {
  const { data, error } = await supabase
    .from('accommodations')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching accommodation ${id}:`, error);
    throw error;
  }
  
  return data as Accommodation;
};

// Bookings API
export const createBooking = async (booking: Omit<Booking, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('bookings')
    .insert(booking)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
  
  return data as Booking;
};

export const getUserBookings = async (userId: string) => {
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
  
  return data;
};

// User profiles
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error && error.code !== 'PGRST116') { // PGRST116 is the error for "no rows returned"
    console.error('Error fetching user profile:', error);
    throw error;
  }
  
  return data as UserProfile | null;
};

export const createOrUpdateUserProfile = async (profile: Partial<UserProfile> & { user_id: string }) => {
  // Check if profile exists
  const existingProfile = await getUserProfile(profile.user_id);
  
  if (existingProfile) {
    // Update
    const { data, error } = await supabase
      .from('user_profiles')
      .update(profile)
      .eq('user_id', profile.user_id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
    
    return data as UserProfile;
  } else {
    // Create
    const { data, error } = await supabase
      .from('user_profiles')
      .insert(profile)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
    
    return data as UserProfile;
  }
};
