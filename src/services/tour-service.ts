
import { BaseApiService } from './base-api';
import { Tour } from '@/types/database';

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
    
    // Transform to ensure it matches the Tour interface
    return data.map(tour => ({
      ...tour,
      location: tour.meeting_point || 'Unknown Location',
      is_available: true // Default value as it may be missing in database
    })) as Tour[];
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
    
    // Transform to ensure it matches the Tour interface
    return {
      ...data,
      location: data.meeting_point || 'Unknown Location',
      is_available: true // Default value as it may be missing in database
    } as Tour;
  }
}

export const tourService = new TourService();
