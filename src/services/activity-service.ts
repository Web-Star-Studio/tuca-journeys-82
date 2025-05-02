
import { BaseApiService } from './base-api';
import type { Activity, ActivityAvailability, ActivityFilters } from '@/types/activity';
import { toast } from 'sonner';

class ActivityService extends BaseApiService {
  /**
   * Get all activities with optional filters
   */
  async getActivities(filters: ActivityFilters = {}) {
    let query = this.supabase.from('tours').select('*');
    
    // Apply filters if provided
    if (filters.category && filters.category !== 'Todos') {
      query = query.eq('category', filters.category);
    }
    if (filters.difficulty) {
      query = query.eq('difficulty', filters.difficulty);
    }
    if (filters.minPrice !== undefined && filters.minPrice !== null) {
      query = query.gte('price', filters.minPrice);
    }
    if (filters.maxPrice !== undefined && filters.maxPrice !== null) {
      query = query.lte('price', filters.maxPrice);
    }
    if (filters.searchQuery) {
      query = query.ilike('title', `%${filters.searchQuery}%`);
    }

    const { data, error } = await query.order('title');

    if (error) {
      console.error('Error fetching activities:', error);
      throw error;
    }

    return data as Activity[];
  }

  /**
   * Get activity by ID
   */
  async getActivityById(id: number) {
    const { data, error } = await this.supabase
      .from('tours')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching activity ${id}:`, error);
      throw error;
    }

    return data as Activity;
  }

  /**
   * Create a new activity
   */
  async createActivity(activity: Omit<Activity, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await this.supabase
      .from('tours')
      .insert([activity])
      .select()
      .single();

    if (error) {
      console.error('Error creating activity:', error);
      throw error;
    }

    return data as Activity;
  }

  /**
   * Update an activity
   */
  async updateActivity(id: number, activity: Partial<Activity>) {
    const { data, error } = await this.supabase
      .from('tours')
      .update(activity)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating activity ${id}:`, error);
      throw error;
    }

    return data as Activity;
  }

  /**
   * Delete an activity
   */
  async deleteActivity(id: number) {
    const { error } = await this.supabase
      .from('tours')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting activity ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get activity availability
   */
  async getActivityAvailability(activityId: number) {
    // Fix: This should use the correct table name that exists in your database
    const { data, error } = await this.supabase
      .from('tour_availability')
      .select('*')
      .eq('tour_id', activityId)
      .order('date');

    if (error) {
      console.error(`Error fetching availability for activity ${activityId}:`, error);
      throw error;
    }

    // Cast to the expected type
    return data as unknown as ActivityAvailability[];
  }

  /**
   * Update activity availability
   */
  async updateActivityAvailability(activityId: number, availability: {
    date: Date;
    available_spots: number;
    custom_price?: number;
    status?: string;
  }) {
    const { date, available_spots, custom_price, status } = availability;
    
    // Check if availability entry exists
    const { data: existingData } = await this.supabase
      .from('tour_availability')
      .select('id')
      .eq('tour_id', activityId)
      .eq('date', date.toISOString().split('T')[0])
      .maybeSingle();

    let result;
    
    if (existingData) {
      // Update existing availability
      result = await this.supabase
        .from('tour_availability')
        .update({
          available_spots,
          custom_price,
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingData.id)
        .select()
        .single();
    } else {
      // Create new availability
      result = await this.supabase
        .from('tour_availability')
        .insert([{
          tour_id: activityId,
          date: date.toISOString().split('T')[0],
          available_spots,
          custom_price,
          status
        }])
        .select()
        .single();
    }

    if (result.error) {
      console.error(`Error updating availability for activity ${activityId}:`, result.error);
      throw result.error;
    }

    return result.data;
  }

  /**
   * Bulk update activity availability
   */
  async bulkUpdateActivityAvailability(activityId: number, bulkData: {
    dates: Date[];
    available_spots: number;
    custom_price?: number;
    status?: string;
  }) {
    const { dates, available_spots, custom_price, status } = bulkData;
    
    const availabilityEntries = dates.map(date => ({
      tour_id: activityId,
      date: date.toISOString().split('T')[0],
      available_spots,
      custom_price,
      status: status || 'available'
    }));

    // Make an array of objects for bulk insert or update
    const entries = availabilityEntries.map(entry => ({
      ...entry
    }));

    // Use insert with onConflict to handle both inserts and updates
    const { data, error } = await this.supabase
      .from('tour_availability')
      .upsert(entries, {
        onConflict: 'tour_id,date',
        ignoreDuplicates: false
      });

    if (error) {
      console.error(`Error bulk updating availability for activity ${activityId}:`, error);
      throw error;
    }

    return data;
  }

  /**
   * Search activities
   */
  async searchActivities(params: any = {}) {
    let query = this.supabase.from('tours').select('*');
    
    if (params.query) {
      query = query.textSearch('search_vector', params.query);
    }
    
    if (params.category && params.category !== 'Todos') {
      query = query.eq('category', params.category);
    }
    
    // Add sorting
    switch (params.sortBy) {
      case 'price_asc':
        query = query.order('price', { ascending: true });
        break;
      case 'price_desc':
        query = query.order('price', { ascending: false });
        break;
      case 'rating':
        query = query.order('rating', { ascending: false });
        break;
      default:
        // Default sort (recommended or featured)
        query = query.order('is_featured', { ascending: false }).order('rating', { ascending: false });
        break;
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error searching activities:', error);
      throw error;
    }

    return data as Activity[];
  }

  /**
   * Get featured activities
   */
  async getFeaturedActivities(limit = 6) {
    const { data, error } = await this.supabase
      .from('tours')
      .select('*')
      .eq('is_featured', true)
      .order('rating', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching featured activities:', error);
      throw error;
    }

    return data as Activity[];
  }
}

export const activityService = new ActivityService();
