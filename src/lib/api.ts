import { supabase } from '@/lib/supabase';
import { Tour, Accommodation, UserProfile } from '@/types/database';
import { Booking, CreateBookingDTO } from '@/types/bookings';
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
  
  // Transform the data to ensure it matches the Tour interface
  return data.map(tour => ({
    ...tour,
    location: tour.location || tour.meeting_point || 'Unknown Location',
    is_available: tour.is_available ?? true
  })) as Tour[];
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
  
  // Transform to ensure it matches the Tour interface
  return {
    ...data,
    location: data.location || data.meeting_point || 'Unknown Location',
    is_available: data.is_available ?? true
  } as Tour;
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
  
  // Transform to ensure it matches the Accommodation interface
  return data.map(accommodation => ({
    ...accommodation,
    location: accommodation.location || accommodation.address || 'Unknown Location',
    is_available: accommodation.is_available ?? true,
    category: accommodation.category || accommodation.type || 'Standard'
  })) as Accommodation[];
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
  
  // Transform to ensure it matches the Accommodation interface
  return {
    ...data,
    location: data.location || data.address || 'Unknown Location',
    is_available: data.is_available ?? true,
    category: data.category || data.type || 'Standard'
  } as Accommodation;
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

export const getVehiclesFromDB = async () => {
  console.log("Fetching all vehicles");
  const { data, error } = await supabase
    .from('vehicles')
    .select('*');
  
  if (error) {
    console.error('Error fetching vehicles:', error);
    throw error;
  }
  
  // Map and ensure all required fields are present
  return data.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    type: item.type || 'car',
    price_per_day: item.price_per_day || item.price || 0,
    price: item.price || item.price_per_day || 0,
    capacity: item.capacity || item.available_quantity || 1,
    image_url: item.image_url,
    partner_id: item.partner_id,
    created_at: item.created_at,
    updated_at: item.updated_at,
    available_quantity: item.available_quantity || 1,
    features: item.features || [],
    gallery_images: item.gallery_images || [],
    is_available: item.is_available !== false
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
  
  // Add missing properties if needed
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    type: data.type || 'car',
    price_per_day: data.price_per_day || data.price || 0,
    price: data.price || data.price_per_day || 0,
    capacity: data.capacity || data.available_quantity || 1,
    image_url: data.image_url,
    partner_id: data.partner_id,
    created_at: data.created_at,
    updated_at: data.updated_at,
    available_quantity: data.available_quantity || 1,
    features: data.features || [],
    gallery_images: data.gallery_images || [],
    is_available: data.is_available !== false
  } as Vehicle;
};

export const getEventsFromDB = async () => {
  console.log("Fetching all events");
  const { data, error } = await supabase
    .from('events')
    .select('*');
  
  if (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
  
  // Map database fields to match our Event interface
  return data.map(eventData => ({
    id: eventData.id,
    name: eventData.name || eventData.title || "",
    title: eventData.name || eventData.title || "", // For backward compatibility
    description: eventData.description,
    short_description: eventData.short_description,
    date: eventData.date,
    start_time: eventData.start_time,
    end_time: eventData.end_time,
    location: eventData.location,
    price: eventData.price || 0,
    capacity: eventData.capacity || 0,
    available_spots: eventData.available_spots || 0,
    image_url: eventData.image_url,
    partner_id: eventData.partner_id,
    created_at: eventData.created_at,
    updated_at: eventData.updated_at,
    category: eventData.category || 'Other',
    featured: eventData.is_featured || false,
    is_featured: eventData.is_featured || false, // For backward compatibility
    status: 'scheduled', // Default value
    organizer: 'Unknown', // Default value
    gallery_images: eventData.gallery_images || []
  })) as Event[];
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
  
  // Map database fields to match our Event interface
  return {
    id: data.id,
    name: data.name || data.title || "",
    title: data.name || data.title || "", // For backward compatibility
    description: data.description,
    short_description: data.short_description,
    date: data.date,
    start_time: data.start_time,
    end_time: data.end_time,
    location: data.location,
    price: data.price || 0,
    capacity: data.capacity || 0,
    available_spots: data.available_spots || 0,
    image_url: data.image_url,
    partner_id: data.partner_id,
    created_at: data.created_at,
    updated_at: data.updated_at,
    category: data.category || 'Other',
    featured: data.is_featured || false,
    is_featured: data.is_featured || false, // For backward compatibility
    status: 'scheduled', // Default value
    organizer: 'Unknown', // Default value
    gallery_images: data.gallery_images || []
  } as Event;
};

export const createBooking = async (bookingData: CreateBookingDTO) => {
  console.log("Creating booking:", bookingData);
  
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
    console.error('Error creating booking:', error);
    throw error;
  }
  
  // Map the response back to the Booking interface expected by the app
  const responseBooking = {
    id: data.id.toString(),
    user_id: data.user_id,
    user_name: '', // This would need to be populated from user profiles
    user_email: '', // This would need to be populated from user profiles
    tour_id: data.tour_id,
    accommodation_id: data.accommodation_id,
    event_id: data.event_id,
    vehicle_id: data.vehicle_id,
    item_type: data.tour_id ? 'tour' : 
               data.accommodation_id ? 'accommodation' : 
               data.event_id ? 'event' : 'vehicle',
    item_name: '', // This would need to be populated based on the related item
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
  
  return responseBooking as Booking;
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
  const bookings = data.map(dbBooking => {
    // Ensure all required fields are present in the returned object
    return {
      id: dbBooking.id.toString(),
      user_id: dbBooking.user_id,
      tour_id: dbBooking.tour_id,
      accommodation_id: dbBooking.accommodation_id,
      event_id: dbBooking.event_id || null,
      vehicle_id: dbBooking.vehicle_id || null,
      start_date: dbBooking.start_date,
      end_date: dbBooking.end_date,
      guests: dbBooking.guests,
      total_price: dbBooking.total_price,
      status: dbBooking.status as 'pending' | 'confirmed' | 'cancelled',
      payment_status: dbBooking.payment_status as 'paid' | 'pending' | 'refunded',
      user_name: '',
      user_email: '',
      item_type: dbBooking.tour_id ? 'tour' : 
                dbBooking.accommodation_id ? 'accommodation' : 
                dbBooking.event_id ? 'event' : 'vehicle',
      item_name: '',
      payment_method: dbBooking.payment_method,
      special_requests: dbBooking.special_requests,
      created_at: dbBooking.created_at,
      updated_at: dbBooking.updated_at
    } as Booking;
  });
  
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
