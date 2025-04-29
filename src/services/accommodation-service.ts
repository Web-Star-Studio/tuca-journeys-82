
import { supabase } from '@/lib/supabase';
import { Accommodation } from '@/types/database';
import { BaseApiService } from './base-api';

class AccommodationService extends BaseApiService {
  /**
   * Retrieves all accommodations from the database
   */
  async getAccommodations(): Promise<Accommodation[]> {
    console.log('Fetching accommodations from Supabase');
    const { data, error } = await this.supabase
      .from('accommodations')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching accommodations:', error);
      throw error;
    }

    return data as Accommodation[];
  }

  /**
   * Retrieves a specific accommodation by its ID
   */
  async getAccommodationById(id: number): Promise<Accommodation | null> {
    console.log(`Fetching accommodation with ID: ${id}`);
    const { data, error } = await this.supabase
      .from('accommodations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        console.warn(`No accommodation found with ID: ${id}`);
        return null;
      }
      console.error(`Error fetching accommodation with ID: ${id}:`, error);
      throw error;
    }

    return data as Accommodation;
  }

  /**
   * Creates a new accommodation
   */
  async createAccommodation(accommodation: Partial<Accommodation>): Promise<Accommodation> {
    console.log('Creating new accommodation:', accommodation);
    
    // Set default values for required fields if not provided
    const accommodationToInsert = {
      ...accommodation,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      rating: accommodation.rating || 0,
      amenities: accommodation.amenities || [],
      gallery_images: accommodation.gallery_images || []
    };

    const { data, error } = await this.supabase
      .from('accommodations')
      .insert([accommodationToInsert]) // Fix: Wrap accommodationToInsert in an array
      .select()
      .single();

    if (error) {
      console.error('Error creating accommodation:', error);
      throw error;
    }

    return data as Accommodation;
  }

  /**
   * Updates an existing accommodation
   */
  async updateAccommodation(id: number, updates: Partial<Accommodation>): Promise<Accommodation> {
    console.log(`Updating accommodation with ID: ${id}`, updates);
    
    // Always update the updated_at timestamp
    const updatedAccommodation = {
      ...updates,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await this.supabase
      .from('accommodations')
      .update(updatedAccommodation)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating accommodation with ID: ${id}:`, error);
      throw error;
    }

    return data as Accommodation;
  }

  /**
   * Deletes an accommodation by its ID
   */
  async deleteAccommodation(id: number): Promise<void> {
    console.log(`Deleting accommodation with ID: ${id}`);
    const { error } = await this.supabase
      .from('accommodations')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting accommodation with ID: ${id}:`, error);
      throw error;
    }
  }

  /**
   * Gets availability for an accommodation
   */
  async getAccommodationAvailability(accommodationId: number) {
    const { data, error } = await this.supabase
      .from('accommodation_availability')
      .select('*')
      .eq('accommodation_id', accommodationId)
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching accommodation availability:', error);
      throw error;
    }

    return data;
  }

  /**
   * Updates availability for a specific date
   */
  async updateAccommodationAvailability(
    accommodationId: number,
    date: Date,
    customPrice?: number,
    status?: 'available' | 'unavailable'
  ) {
    const formattedDate = date.toISOString().split('T')[0];
    
    const { data, error } = await this.supabase
      .from('accommodation_availability')
      .upsert({
        accommodation_id: accommodationId,
        date: formattedDate,
        ...(customPrice !== undefined && { custom_price: customPrice }),
        ...(status !== undefined && { status })
      })
      .select()
      .single();

    if (error) {
      console.error('Error updating accommodation availability:', error);
      throw error;
    }

    return data;
  }

  /**
   * Sets availability for multiple dates at once
   */
  async setBulkAccommodationAvailability(
    accommodationId: number,
    dates: Date[],
    customPrice?: number,
    status?: 'available' | 'unavailable'
  ) {
    if (!dates.length) return [];

    const records = dates.map(date => ({
      accommodation_id: accommodationId,
      date: date.toISOString().split('T')[0],
      ...(customPrice !== undefined && { custom_price: customPrice }),
      ...(status !== undefined && { status })
    }));

    const { data, error } = await this.supabase
      .from('accommodation_availability')
      .upsert(records)
      .select();

    if (error) {
      console.error('Error setting bulk accommodation availability:', error);
      throw error;
    }

    return data;
  }
}

export const accommodationService = new AccommodationService();
