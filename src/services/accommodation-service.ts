
import { supabase } from '@/lib/supabase';
import { Accommodation } from '@/types/database';
import { BaseApiService } from './base-api';
import { isValidPrice } from '@/utils/validationUtils';
import { AccommodationFilters } from '@/types/accommodation';

class AccommodationService extends BaseApiService {
  /**
   * Retrieves all accommodations from the database with optional filtering
   */
  async getAccommodations(options: AccommodationFilters): Promise<Accommodation[]> {
    console.log('Fetching accommodations from Supabase with options:', options);
    
    let query = this.supabase.from('accommodations').select('*');

    // Apply full-text search if search query is provided
    if (options.searchQuery && options.searchQuery.trim() !== '') {
      const cleanedQuery = options.searchQuery.trim().replace(/['\\]/g, '').replace(/\s+/g, ' & ');
      query = query.textSearch('search_vector', cleanedQuery, {
        type: 'websearch',
        config: 'portuguese'
      });
    }

    // Apply type filter
    if (options.type && options.type !== 'all') {
      query = query.eq('type', options.type);
    }

    // Apply price filters
    if (options.minPrice !== null) {
      query = query.gte('price_per_night', options.minPrice);
    }
    if (options.maxPrice !== null) {
      query = query.lte('price_per_night', options.maxPrice);
    }

    // Apply rating filter
    if (options.minRating !== null) {
      query = query.gte('rating', options.minRating);
    }
    
    // Apply max guests filter (new)
    if (options.maxGuests !== null) {
      query = query.gte('max_guests', options.maxGuests);
    }
    
    // Apply amenities filter (new)
    if (options.amenities && options.amenities.length > 0) {
      // Using Postgres array contains operator
      options.amenities.forEach(amenity => {
        query = query.contains('amenities', [amenity]);
      });
    }

    // Apply sorting
    switch (options.sortBy) {
      case 'newest':
        query = query.order('created_at', { ascending: false });
        break;
      case 'price_asc':
        query = query.order('price_per_night', { ascending: true });
        break;
      case 'price_desc':
        query = query.order('price_per_night', { ascending: false });
        break;
      case 'rating':
        query = query.order('rating', { ascending: false });
        break;
      case 'alphabetical':
        query = query.order('title', { ascending: true });
        break;
    }

    // Apply pagination if provided
    if (options.limit !== undefined) {
      query = query.limit(options.limit);
    }
    
    if (options.offset !== undefined) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    // Execute the query
    const { data, error } = await query;

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
  async createAccommodation(accommodationData: Partial<Accommodation>): Promise<Accommodation> {
    console.log('Creating new accommodation:', accommodationData);
    
    // Create a complete accommodation object with required fields
    const accommodation: Omit<Accommodation, 'id' | 'search_vector'> = {
      title: accommodationData.title || 'Nova Hospedagem',
      description: accommodationData.description || '',
      short_description: accommodationData.short_description || '',
      price_per_night: accommodationData.price_per_night || 0,
      image_url: accommodationData.image_url || '',
      address: accommodationData.address || '',
      type: accommodationData.type || 'Hospedagem',
      bedrooms: accommodationData.bedrooms || 1,
      bathrooms: accommodationData.bathrooms || 1,
      max_guests: accommodationData.max_guests || 2,
      amenities: accommodationData.amenities || [],
      gallery_images: accommodationData.gallery_images || [],
      rating: accommodationData.rating || 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...accommodationData
    };
    
    // Validate required fields
    this.validateAccommodation(accommodation);

    // Ensure search_vector is not included
    const { search_vector, ...cleanAccommodation } = accommodation as any;
    
    const { data, error } = await this.supabase
      .from('accommodations')
      .insert(cleanAccommodation)
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
    
    // Create a new object without the search_vector property
    const updatedAccommodation = { ...updates };
    
    // Always update the updated_at timestamp
    updatedAccommodation.updated_at = new Date().toISOString();
    
    // Remove search_vector if it exists in the object at runtime
    if ('search_vector' in updatedAccommodation) {
      delete (updatedAccommodation as any).search_vector;
    }

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
    
    // First, delete any availability data
    const { error: availabilityError } = await this.supabase
      .from('accommodation_availability')
      .delete()
      .eq('accommodation_id', id);

    if (availabilityError) {
      console.error(`Error deleting availability for accommodation ID: ${id}:`, availabilityError);
      throw availabilityError;
    }
    
    // Then delete the accommodation
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
  async getAccommodationAvailability(accommodationId: number, startDate?: Date, endDate?: Date) {
    let query = this.supabase
      .from('accommodation_availability')
      .select('*')
      .eq('accommodation_id', accommodationId);
    
    // Apply date filters if provided
    if (startDate) {
      query = query.gte('date', startDate.toISOString().split('T')[0]);
    }
    
    if (endDate) {
      query = query.lte('date', endDate.toISOString().split('T')[0]);
    }
    
    query = query.order('date', { ascending: true });

    const { data, error } = await query;

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

  /**
   * Check if dates are available for booking
   */
  async checkAvailability(accommodationId: number, startDate: Date, endDate: Date): Promise<boolean> {
    const start = startDate.toISOString().split('T')[0];
    const end = endDate.toISOString().split('T')[0];
    
    // Check if there are any unavailable dates in the range
    const { data, error } = await this.supabase
      .from('accommodation_availability')
      .select('date')
      .eq('accommodation_id', accommodationId)
      .eq('status', 'unavailable')
      .gte('date', start)
      .lte('date', end);

    if (error) {
      console.error('Error checking accommodation availability:', error);
      throw error;
    }

    // If there are any unavailable dates, the accommodation is not available
    return data.length === 0;
  }
  
  /**
   * Get accommodation types for filtering
   */
  async getAccommodationTypes(): Promise<string[]> {
    const { data, error } = await this.supabase
      .from('accommodations')
      .select('type')
      .order('type')
      .not('type', 'is', null);
      
    if (error) {
      console.error('Error fetching accommodation types:', error);
      throw error;
    }
    
    // Extract unique types
    return Array.from(new Set(data.map(item => item.type)));
  }
  
  /**
   * Get accommodation price range
   */
  async getPriceRange(): Promise<{ min: number, max: number }> {
    const { data, error } = await this.supabase
      .from('accommodations')
      .select('price_per_night')
      .order('price_per_night');
      
    if (error) {
      console.error('Error fetching accommodation price range:', error);
      throw error;
    }
    
    if (data.length === 0) {
      return { min: 0, max: 1000 }; // Default range if no data
    }
    
    const prices = data.map(item => item.price_per_night);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices))
    };
  }

  /**
   * Toggles the featured status of an accommodation
   */
  async toggleAccommodationFeatured(accommodationId: number, isFeatured: boolean): Promise<Accommodation> {
    console.log(`Toggling featured status for accommodation with ID: ${accommodationId} to ${isFeatured}`);
    
    const { data, error } = await this.supabase
      .from('accommodations')
      .update({ is_featured: isFeatured })
      .eq('id', accommodationId)
      .select()
      .single();

    if (error) {
      console.error(`Error toggling featured status for accommodation with ID: ${accommodationId}:`, error);
      throw error;
    }

    return data as Accommodation;
  }

  /**
   * Helper method to validate accommodation data
   */
  private validateAccommodation(accommodation: any): void {
    if (!accommodation.title || !accommodation.description || !accommodation.short_description ||
        !accommodation.address || !accommodation.image_url || !accommodation.type ||
        accommodation.price_per_night === undefined || accommodation.bathrooms === undefined || 
        accommodation.bedrooms === undefined || accommodation.max_guests === undefined) {
      throw new Error('Missing required fields for accommodation');
    }
    
    if (!isValidPrice(accommodation.price_per_night)) {
      throw new Error('Invalid price for accommodation');
    }
  }
}

export const accommodationService = new AccommodationService();
