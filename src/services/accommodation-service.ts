
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
    
    return data;
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
    
    return data;
  }
}

export const accommodationService = new AccommodationService();
