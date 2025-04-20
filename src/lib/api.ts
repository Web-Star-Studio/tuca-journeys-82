import { supabase } from '@/lib/supabase';
import { Tour, Accommodation, Booking, UserProfile } from '@/types/database';
import { Package } from '@/data/types/packageTypes';
import { Partner } from '@/types/partner';
import { Vehicle } from '@/types/vehicle';
import { Event } from '@/types/event';

// Tours API
export const getToursFromDB = async () => {
  console.log("Fetching all tours");
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
  console.log(`Fetching tour with ID: ${id}`);
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

// Packages API
export const getPackagesFromDB = async (category?: string) => {
  // For packages we'll use the static data for now
  // This is a placeholder for future database integration
  return [] as Package[];
};

export const getPackageByIdFromDB = async (id: number) => {
  // For packages we'll use the static data for now
  // This is a placeholder for future database integration
  return {} as Package;
};

// Accommodations API
export const getAccommodationsFromDB = async () => {
  console.log("Fetching all accommodations");
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
  console.log(`Fetching accommodation with ID: ${id}`);
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

// Partners API
export const getPartnersFromDB = async () => {
  console.log("Fetching all partners");
  const { data, error } = await supabase
    .from('partners')
    .select('*');
  
  if (error) {
    console.error('Error fetching partners:', error);
    throw error;
  }
  
  return data as Partner[];
};

export const getPartnerByIdFromDB = async (id: string) => {
  console.log(`Fetching partner with ID: ${id}`);
  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching partner ${id}:`, error);
    throw error;
  }
  
  return data as Partner;
};

// Vehicles API
export const getVehiclesFromDB = async () => {
  console.log("Fetching all vehicles");
  const { data, error } = await supabase
    .from('vehicles')
    .select('*');
  
  if (error) {
    console.error('Error fetching vehicles:', error);
    throw error;
  }
  
  // Cast to Vehicle and map missing properties if needed
  return data.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    type: item.type || 'car',
    price_per_day: item.price_per_day || item.price || 0,
    capacity: item.capacity || item.available_quantity || 1,
    image_url: item.image_url,
    partner_id: item.partner_id,
    created_at: item.created_at,
    updated_at: item.updated_at,
    available_quantity: item.available_quantity,
    features: item.features,
    gallery_images: item.gallery_images,
    is_available: item.is_available
  })) as Vehicle[];
};

export const getVehicleByIdFromDB = async (id: number) => {
  console.log(`Fetching vehicle with ID: ${id}`);
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching vehicle ${id}:`, error);
    throw error;
  }
  
  // Cast to Vehicle and map missing properties if needed
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    type: data.type || 'car',
    price_per_day: data.price_per_day || data.price || 0,
    capacity: data.capacity || data.available_quantity || 1,
    image_url: data.image_url,
    partner_id: data.partner_id,
    created_at: data.created_at,
    updated_at: data.updated_at,
    available_quantity: data.available_quantity,
    features: data.features,
    gallery_images: data.gallery_images,
    is_available: data.is_available
  } as Vehicle;
};

// Events API
export const getEventsFromDB = async () => {
  console.log("Fetching all events");
  const { data, error } = await supabase
    .from('events')
    .select('*');
  
  if (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
  
  return data as Event[];
};

export const getEventByIdFromDB = async (id: number) => {
  console.log(`Fetching event with ID: ${id}`);
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching event ${id}:`, error);
    throw error;
  }
  
  return data as Event;
};

// Bookings API
export const createBooking = async (booking: Omit<Booking, 'id' | 'created_at' | 'updated_at'>) => {
  console.log("Creating booking:", booking);
  
  // Create a booking object that matches the database schema
  // Map number_of_guests to guests as required by the database
  const dbBooking = {
    user_id: booking.user_id,
    tour_id: booking.tour_id,
    accommodation_id: booking.accommodation_id,
    start_date: booking.start_date,
    end_date: booking.end_date,
    guests: booking.number_of_guests, // Map from number_of_guests to guests
    total_price: booking.total_price,
    status: booking.status,
    payment_status: booking.status === 'confirmed' ? 'paid' : 'pending',
    payment_method: booking.payment_method || null,
    special_requests: booking.special_requests || null
  };
  
  const { data, error } = await supabase
    .from('bookings')
    .insert([dbBooking])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
  
  // Map the response back to the Booking interface expected by the app
  const responseBooking: Booking = {
    id: data.id.toString(),
    user_id: data.user_id,
    tour_id: data.tour_id,
    accommodation_id: data.accommodation_id,
    start_date: data.start_date,
    end_date: data.end_date,
    number_of_guests: data.guests, // Map from guests to number_of_guests
    total_price: data.total_price,
    status: data.status as 'pending' | 'confirmed' | 'cancelled',
    notes: data.special_requests || undefined,
    created_at: data.created_at,
    updated_at: data.updated_at,
    payment_method: data.payment_method
  };
  
  return responseBooking;
};

export const getUserBookings = async (userId: string) => {
  console.log(`Fetching bookings for user: ${userId}`);
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
  
  // Map the database bookings to the Booking interface
  const bookings: Booking[] = data.map(dbBooking => ({
    id: dbBooking.id.toString(),
    user_id: dbBooking.user_id,
    tour_id: dbBooking.tour_id,
    accommodation_id: dbBooking.accommodation_id,
    start_date: dbBooking.start_date,
    end_date: dbBooking.end_date,
    number_of_guests: dbBooking.guests, // Map from guests to number_of_guests
    total_price: dbBooking.total_price,
    status: dbBooking.status as 'pending' | 'confirmed' | 'cancelled',
    notes: dbBooking.special_requests || undefined,
    created_at: dbBooking.created_at,
    updated_at: dbBooking.updated_at,
    tours: dbBooking.tours,
    accommodations: dbBooking.accommodations,
    payment_method: dbBooking.payment_method
  }));
  
  return bookings;
};

// User profiles
export const getUserProfile = async (userId: string) => {
  console.log(`Fetching profile for user: ${userId}`);
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error && error.code !== 'PGRST116') { // PGRST116 is the error for "no rows returned"
    console.error('Error fetching user profile:', error);
    throw error;
  }
  
  return data as UserProfile | null;
};

export const createOrUpdateUserProfile = async (profile: Partial<UserProfile> & { id: string }) => {
  console.log("Creating/updating user profile:", profile);
  // Check if profile exists
  const existingProfile = await getUserProfile(profile.id);
  
  if (existingProfile) {
    // Update
    console.log("Existing profile found, updating");
    const { data, error } = await supabase
      .from('user_profiles')
      .update(profile)
      .eq('id', profile.id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
    
    return data as UserProfile;
  } else {
    // Create
    console.log("No profile found, creating new profile");
    const { data, error } = await supabase
      .from('user_profiles')
      .insert([profile])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
    
    return data as UserProfile;
  }
};

// Get user roles
export const getUserRoles = async (userId: string) => {
  console.log(`Fetching roles for user: ${userId}`);
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId);
  
  if (error) {
    console.error('Error fetching user roles:', error);
    throw error;
  }
  
  return data.map(item => item.role);
};

// Check if user has specific role
export const hasRole = async (userId: string, roleName: string): Promise<boolean> => {
  if (!userId) return false;
  
  try {
    const roles = await getUserRoles(userId);
    return roles.includes(roleName);
  } catch (error) {
    console.error('Error checking user role:', error);
    return false;
  }
};

// Check if user is a partner
export const isUserPartner = async (userId: string): Promise<boolean> => {
  if (!userId) return false;
  
  try {
    const { data, error } = await supabase
      .from('partners')
      .select('id')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is the error for "no rows returned"
      console.error('Error checking if user is partner:', error);
      throw error;
    }
    
    return !!data;
  } catch (error) {
    console.error('Error checking if user is partner:', error);
    return false;
  }
};

// Get user partner profile
export const getUserPartnerProfile = async (userId: string): Promise<Partner | null> => {
  if (!userId) return null;
  
  try {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is the error for "no rows returned"
      console.error('Error fetching user partner profile:', error);
      throw error;
    }
    
    return data as Partner | null;
  } catch (error) {
    console.error('Error fetching user partner profile:', error);
    return null;
  }
};
