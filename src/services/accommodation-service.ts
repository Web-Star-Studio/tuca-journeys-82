
import { supabase } from '@/lib/supabase';
import { Accommodation, AccommodationAvailability } from '@/types/database';
import { BaseApiService } from './base-api';
import { AccommodationFilters } from '@/types/accommodation';

class AccommodationService extends BaseApiService {
  /**
   * Retrieves all accommodations from the database with optional filtering
   */
  async getAccommodations(filters: AccommodationFilters): Promise<Accommodation[]> {
    console.log('Fetching accommodations from Supabase with filters:', filters);

    let query = this.supabase.from('accommodations').select('*');

    // Apply full-text search if search query is provided
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const cleanedQuery = filters.searchQuery.trim().replace(/['\\]/g, '').replace(/\s+/g, ' & ');
      query = query.ilike('title', `%${cleanedQuery}%`);
    }

    // Apply type filter
    if (filters.type && filters.type !== 'all') {
      query = query.eq('type', filters.type);
    }

    // Apply price filters
    if (filters.minPrice !== undefined) {
      query = query.gte('price_per_night', filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      query = query.lte('price_per_night', filters.maxPrice);
    }

    // Apply rating filter
    if (filters.minRating !== undefined) {
      query = query.gte('rating', filters.minRating);
    }

    // Apply amenities filter
    if (filters.amenities && filters.amenities.length > 0) {
      filters.amenities.forEach(amenity => {
        query = query.contains('amenities', [amenity]);
      });
    }

    // Apply max guests filter
    if (filters.maxGuests !== undefined) {
      query = query.lte('max_guests', filters.maxGuests);
    }

    // Apply sorting
    switch (filters.sortBy) {
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
      default:
        query = query.order('created_at', { ascending: false });
    }

    // Apply pagination if provided
    if (filters.limit !== undefined) {
      query = query.limit(filters.limit);
    }

    if (filters.offset !== undefined) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    // Execute the query
    const { data, error } = await query;

    if (error) {
      console.error('Error fetching accommodations:', error);
      throw error;
    }

    return data || [];
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

    return data;
  }

  /**
   * Creates a new accommodation
   */
  async createAccommodation(accommodation: Partial<Accommodation>): Promise<Accommodation> {
    console.log('Creating accommodation:', accommodation);
    
    // These transformations ensure frontend properties map to database properties
    // Using type assertion to include is_featured
    const dbAccommodation = {
      title: accommodation.title || 'Nova Hospedagem',
      description: accommodation.description || '',
      short_description: accommodation.short_description || accommodation.description?.substring(0, 150) || '',
      price_per_night: accommodation.price_per_night || 0,
      image_url: accommodation.image_url || '/default-accommodation.jpg',
      address: accommodation.address || '',
      type: accommodation.type || 'pousada',
      bedrooms: accommodation.bedrooms || 1,
      bathrooms: accommodation.bathrooms || 1,
      max_guests: accommodation.max_guests || 2,
      amenities: accommodation.amenities || ['Wi-Fi'],
      gallery_images: accommodation.gallery_images || [],
      rating: accommodation.rating || 0
    } as any; // Use type assertion to bypass TypeScript's strict checking
    
    // Add is_featured property conditionally
    if (accommodation.is_featured !== undefined) {
      dbAccommodation.is_featured = accommodation.is_featured;
    }
    
    const { data, error } = await this.supabase
      .from('accommodations')
      .insert(dbAccommodation)
      .select('*')
      .single();
    
    if (error) {
      console.error('Error creating accommodation:', error);
      throw error;
    }
    
    return data;
  }

  /**
   * Updates an existing accommodation
   */
  async updateAccommodation(id: number, updates: Partial<Accommodation>): Promise<Accommodation> {
    console.log(`Updating accommodation with ID: ${id}`, updates);

    const { data, error } = await this.supabase
      .from('accommodations')
      .update(updates)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      console.error(`Error updating accommodation with ID: ${id}:`, error);
      throw error;
    }

    return data;
  }

  /**
   * Deletes an accommodation by its ID
   */
  async deleteAccommodation(id: number): Promise<void> {
    console.log(`Deleting accommodation with ID: ${id}`);

    // First check if there are any bookings for this accommodation
    const { data: bookings, error: bookingError } = await this.supabase
      .from('bookings')
      .select('id')
      .eq('accommodation_id', id)
      .limit(1);

    if (bookingError) {
      console.error(`Error checking bookings for accommodation ID: ${id}:`, bookingError);
      throw bookingError;
    }

    // If there are bookings, don't allow deletion
    if (bookings && bookings.length > 0) {
      throw new Error('Cannot delete accommodation with existing bookings');
    }

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
   * Gets accommodation types
   */
  async getAccommodationTypes(): Promise<string[]> {
    return ['hotel', 'pousada', 'casa', 'apartamento', 'flat', 'chalé', 'bangalô', 'camping'];
  }

  /**
   * Gets price range
   */
  async getPriceRange(): Promise<{ min: number; max: number }> {
    const { data, error } = await this.supabase
      .from('accommodations')
      .select('price_per_night')
      .order('price_per_night', { ascending: true });

    if (error) {
      console.error('Error fetching accommodation prices:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      return { min: 0, max: 5000 };
    }

    const prices = data.map(item => item.price_per_night);
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    return { min, max };
  }

  /**
   * Gets accommodation availability
   */
  async getAccommodationAvailability(
    accommodationId: number,
    startDate?: Date,
    endDate?: Date
  ): Promise<AccommodationAvailability[]> {
    console.log(`Fetching availability for accommodation ID: ${accommodationId}`);

    let query = this.supabase
      .from('accommodation_availability')
      .select('*')
      .eq('accommodation_id', accommodationId);

    if (startDate) {
      query = query.gte('date', startDate.toISOString().split('T')[0]);
    }

    if (endDate) {
      query = query.lte('date', endDate.toISOString().split('T')[0]);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching accommodation availability:', error);
      throw error;
    }

    return data || [];
  }

  /**
   * Toggles the featured status of an accommodation
   */
  async toggleAccommodationFeatured(id: number, isFeatured: boolean): Promise<Accommodation> {
    console.log(`Toggling featured status for accommodation ID: ${id} to: ${isFeatured}`);

    const { data, error } = await this.supabase
      .from('accommodations')
      .update({ is_featured: isFeatured })
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      console.error(`Error toggling featured status for accommodation ID: ${id}:`, error);
      throw error;
    }

    return data;
  }

  /**
   * Updates accommodation availability
   */
  async updateAccommodationAvailability(
    accommodationId: number,
    date: Date,
    customPrice?: number,
    status: 'available' | 'unavailable' = 'available'
  ): Promise<any> {
    console.log(`Updating availability for accommodation ID: ${accommodationId} on date: ${date}`);

    const dateString = date.toISOString().split('T')[0];

    // Check if an entry already exists for the given accommodation and date
    const { data: existingAvailability, error: existingError } = await this.supabase
      .from('accommodation_availability')
      .select('*')
      .eq('accommodation_id', accommodationId)
      .eq('date', dateString)
      .single();

    if (existingError && existingError.code !== 'PGRST116') {
      // An error occurred other than "no data found"
      console.error('Error checking existing availability:', existingError);
      throw existingError;
    }

    if (existingAvailability) {
      // Update the existing entry
      const updates = {
        status: status,
        custom_price: customPrice !== undefined ? customPrice : null,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await this.supabase
        .from('accommodation_availability')
        .update(updates)
        .eq('accommodation_id', accommodationId)
        .eq('date', dateString)
        .select('*')
        .single();

      if (error) {
        console.error('Error updating accommodation availability:', error);
        throw error;
      }

      return data;
    } else {
      // Create a new entry
      const newAvailability = {
        accommodation_id: accommodationId,
        date: dateString,
        status: status,
        custom_price: customPrice !== undefined ? customPrice : null
      };

      const { data, error } = await this.supabase
        .from('accommodation_availability')
        .insert(newAvailability)
        .select('*')
        .single();

      if (error) {
        console.error('Error creating accommodation availability:', error);
        throw error;
      }

      return data;
    }
  }

  /**
   * Sets bulk accommodation availability
   */
  async setBulkAccommodationAvailability(
    accommodationId: number,
    dates: Date[],
    customPrice?: number,
    status: 'available' | 'unavailable' = 'available'
  ): Promise<void> {
    console.log(`Setting bulk availability for accommodation ID: ${accommodationId} for ${dates.length} dates`);

    // Prepare the updates or inserts
    const updates = dates.map(date => {
      const dateString = date.toISOString().split('T')[0];
      return {
        accommodation_id: accommodationId,
        date: dateString,
        status: status,
        custom_price: customPrice !== undefined ? customPrice : null
      };
    });

    // Use a single SQL query to update or insert the availability records
    const { error } = await this.supabase.from('accommodation_availability').upsert(
      updates,
      { onConflict: 'accommodation_id,date' }
    );

    if (error) {
      console.error('Error setting bulk accommodation availability:', error);
      throw error;
    }
  }

  /**
   * Checks availability for booking
   */
  async checkAvailability(
    accommodationId: number,
    startDate: Date,
    endDate: Date
  ): Promise<boolean> {
    console.log(`Checking availability for accommodation ID: ${accommodationId} from ${startDate} to ${endDate}`);

    const startDateString = startDate.toISOString().split('T')[0];
    const endDateString = endDate.toISOString().split('T')[0];

    const { data, error } = await this.supabase
      .from('accommodation_availability')
      .select('*')
      .eq('accommodation_id', accommodationId)
      .gte('date', startDateString)
      .lte('date', endDateString);

    if (error) {
      console.error('Error checking accommodation availability:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      return false;
    }

    // Check if all dates are available
    const isAvailable = data.every(item => item.status === 'available');

    return isAvailable;
  }
}

export const accommodationService = new AccommodationService();
