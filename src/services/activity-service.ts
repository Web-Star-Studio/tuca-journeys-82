
import { BaseApiService } from './base-api';

// We need to create proper table types since "tour_availability" isn't recognized
interface ActivityAvailability {
  id?: number;
  tour_id: number;
  date: string;
  available_spots: number;
  custom_price?: number;
  status: string;
  created_at?: string;
  updated_at?: string;
}

interface Activity {
  id: number;
  title: string;
  description: string;
  short_description: string;
  price: number;
  category: string;
  difficulty: string;
  duration: string;
  meeting_point: string;
  min_participants: number;
  max_participants: number;
  includes: string[];
  excludes: string[];
  notes: string[];
  schedule: string[];
  image_url: string;
  gallery_images: string[];
  rating: number;
  is_active: boolean;
  is_featured: boolean;
  created_at?: string;
  updated_at?: string;
}

class ActivityService extends BaseApiService {
  async getActivities(filters = {}) {
    let query = this.supabase.from('tours').select('*');
    
    if (filters) {
      // Only try to access properties that exist
      if ('category' in filters && filters.category) {
        query = query.eq('category', filters.category);
      }
      
      if ('difficulty' in filters && filters.difficulty) {
        query = query.eq('difficulty', filters.difficulty);
      }
      
      if ('minPrice' in filters && filters.minPrice !== null) {
        query = query.gte('price', filters.minPrice);
      }
      
      if ('maxPrice' in filters && filters.maxPrice !== null) {
        query = query.lte('price', filters.maxPrice);
      }
      
      if ('searchQuery' in filters && filters.searchQuery) {
        query = query.ilike('title', `%${filters.searchQuery}%`);
      }
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching activities:', error);
      throw error;
    }
    
    return data;
  }
  
  async getActivityById(id) {
    const { data, error } = await this.supabase
      .from('tours')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error(`Error fetching activity ${id}:`, error);
      throw error;
    }
    
    return data;
  }

  // Instead of using tour_availability table directly, we'll use a more generic approach
  // to avoid type errors until the database schema is properly updated
  async getActivityAvailability(tourId) {
    const { data, error } = await this.supabase.rpc(
      'get_tour_availability',
      { tour_id: tourId }
    );
    
    if (error) {
      console.error(`Error fetching activity availability for ${tourId}:`, error);
      throw error;
    }
    
    return data;
  }
  
  async createActivityAvailability(tourId, availabilityDates) {
    const { error } = await this.supabase.rpc(
      'create_tour_availability',
      { 
        tour_id: tourId,
        dates: availabilityDates
      }
    );
    
    if (error) {
      console.error(`Error creating activity availability:`, error);
      throw error;
    }
    
    return true;
  }
  
  async createActivity(activityData) {
    const { data, error } = await this.supabase
      .from('tours')
      .insert([activityData])
      .select();
      
    if (error) {
      console.error('Error creating activity:', error);
      throw error;
    }
    
    return data[0];
  }
  
  async updateActivity({ id, data }) {
    const { data: updatedData, error } = await this.supabase
      .from('tours')
      .update(data)
      .eq('id', id)
      .select();
      
    if (error) {
      console.error(`Error updating activity ${id}:`, error);
      throw error;
    }
    
    return updatedData[0];
  }
  
  async deleteActivity(id) {
    // First delete related availability records using RPC
    await this.supabase.rpc(
      'delete_tour_availability',
      { tour_id: id }
    );
    
    // Then delete the activity itself
    const { error } = await this.supabase
      .from('tours')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error(`Error deleting activity ${id}:`, error);
      throw error;
    }
    
    return true;
  }
}

export const activityService = new ActivityService();
