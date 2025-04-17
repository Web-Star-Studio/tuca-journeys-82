
import { BaseApiService } from './base-api';
import { Tour } from '@/types';

/**
 * Service for handling tour-related API calls
 */
export class TourService extends BaseApiService {
  /**
   * Get all tours
   */
  async getTours(): Promise<Tour[]> {
    const { data, error } = await this.supabase
      .from('tours')
      .select('*');
    
    if (error) {
      console.error('Error fetching tours:', error);
      throw error;
    }
    
    return data;
  }

  /**
   * Get a specific tour by ID
   */
  async getTourById(id: number): Promise<Tour> {
    const { data, error } = await this.supabase
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
}

export const tourService = new TourService();
