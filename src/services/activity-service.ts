
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
        query = query.eq('category', filters.category as string);
      }
      
      if ('difficulty' in filters && filters.difficulty) {
        query = query.eq('difficulty', filters.difficulty as string);
      }
      
      if ('minPrice' in filters && filters.minPrice !== null) {
        query = query.gte('price', filters.minPrice);
      }
      
      if ('maxPrice' in filters && filters.maxPrice !== null) {
        query = query.lte('price', filters.maxPrice);
      }
      
      if ('searchQuery' in filters && filters.searchQuery) {
        query = query.ilike('title', `%${filters.searchQuery as string}%`);
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

  // Added function to support search by search parameters
  async searchActivities(searchParams = {}) {
    let query = this.supabase.from('tours').select('*');
    
    // Apply any search filters
    if (searchParams.query) {
      query = query.ilike('title', `%${searchParams.query}%`);
    }
    
    if (searchParams.category && searchParams.category !== 'Todos') {
      query = query.eq('category', searchParams.category);
    }
    
    if (searchParams.sortBy) {
      switch (searchParams.sortBy) {
        case 'price_asc':
          query = query.order('price', { ascending: true });
          break;
        case 'price_desc':
          query = query.order('price', { ascending: false });
          break;
        case 'rating':
          query = query.order('rating', { ascending: false });
          break;
        case 'recommended':
        default:
          query = query.order('is_featured', { ascending: false });
      }
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error searching activities:', error);
      throw error;
    }
    
    return data;
  }

  // Added function to get featured activities
  async getFeaturedActivities(limit = 6) {
    const { data, error } = await this.supabase
      .from('tours')
      .select('*')
      .eq('is_featured', true)
      .limit(limit);
      
    if (error) {
      console.error('Error fetching featured activities:', error);
      throw error;
    }
    
    return data;
  }

  // For activity availability, we'll use direct queries instead of RPCs since they're not defined
  async getActivityAvailability(tourId) {
    const { data, error } = await this.supabase
      .from('tour_availability')
      .select('*')
      .eq('tour_id', tourId);
    
    if (error) {
      console.error(`Error fetching activity availability for ${tourId}:`, error);
      throw error;
    }
    
    return data;
  }
  
  async createActivityAvailability(tourId, availabilityDates) {
    const availabilities = Array.isArray(availabilityDates) ? 
      availabilityDates.map(date => ({
        tour_id: tourId,
        date: date,
        available_spots: 10, // Default value
        status: 'available'
      })) : [];
    
    const { data, error } = await this.supabase
      .from('tour_availability')
      .insert(availabilities);
    
    if (error) {
      console.error(`Error creating activity availability:`, error);
      throw error;
    }
    
    return true;
  }
  
  // Add missing updateActivityAvailability method
  async updateActivityAvailability(tourId, availabilityData) {
    const { date, available_spots, custom_price, status } = availabilityData;
    
    const { data, error } = await this.supabase
      .from('tour_availability')
      .update({ available_spots, custom_price, status })
      .eq('tour_id', tourId)
      .eq('date', date);
      
    if (error) {
      console.error(`Error updating activity availability:`, error);
      throw error;
    }
    
    return data;
  }

  // Add missing bulkUpdateActivityAvailability method
  async bulkUpdateActivityAvailability(tourId, bulkData) {
    const { dates, available_spots, custom_price, status } = bulkData;
    
    // We need to handle each date individually since we don't have a bulk update method
    const promises = dates.map(date => 
      this.supabase
        .from('tour_availability')
        .update({ available_spots, custom_price, status })
        .eq('tour_id', tourId)
        .eq('date', date)
    );
    
    try {
      await Promise.all(promises);
      return true;
    } catch (error) {
      console.error(`Error bulk updating activity availability:`, error);
      throw error;
    }
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
  
  async updateActivity(id, data) {
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
    // First delete related availability records
    try {
      await this.supabase
        .from('tour_availability')
        .delete()
        .eq('tour_id', id);
    } catch (error) {
      console.log('No availability records or error deleting them', error);
    }
    
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
