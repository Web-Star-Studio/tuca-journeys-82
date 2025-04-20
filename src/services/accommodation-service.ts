
import { BaseApiService } from './base-api';
import { Accommodation } from '@/types';

/**
 * Service for handling accommodation-related API calls
 */
export class AccommodationService extends BaseApiService {
  /**
   * Get all accommodations
   */
  async getAccommodations(): Promise<Accommodation[]> {
    const { data, error } = await this.supabase
      .from('accommodations')
      .select('*');
    
    if (error) {
      console.error('Error fetching accommodations:', error);
      throw error;
    }
    
    // Transform to ensure it matches the Accommodation interface
    return data.map(accommodation => ({
      ...accommodation,
      location: accommodation.address || 'Unknown Location',
      is_available: typeof accommodation.is_available === 'boolean' ? accommodation.is_available : true,
      category: accommodation.type || 'Standard'
    })) as Accommodation[];
  }

  /**
   * Get a specific accommodation by ID
   */
  async getAccommodationById(id: number): Promise<Accommodation> {
    const { data, error } = await this.supabase
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
      location: data.address || 'Unknown Location',
      is_available: typeof data.is_available === 'boolean' ? data.is_available : true,
      category: data.type || 'Standard'
    } as Accommodation;
  }
}

export const accommodationService = new AccommodationService();
