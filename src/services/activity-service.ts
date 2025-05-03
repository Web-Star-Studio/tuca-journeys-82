
import { BaseApiService } from './base-api';
import { Activity, ActivityFilters } from '@/types/activity';
import { adaptComponentActivityToDB, adaptDBActivityToComponentActivity } from '@/utils/activityAdapter';

class ActivityService extends BaseApiService {
  async getActivities(filters: ActivityFilters = {}) {
    let query = this.supabase
      .from('tours')  // Using tours table for now, could be renamed later
      .select('*');
      
    // Apply filters
    if (filters.category && filters.category !== "Todos") {
      query = query.eq('category', filters.category);
    }
    
    if (filters.searchQuery) {
      query = query.ilike('title', `%${filters.searchQuery}%`);
    }
    
    if (filters.minPrice !== undefined && filters.minPrice !== null) {
      query = query.gte('price', filters.minPrice);
    }
    
    if (filters.maxPrice !== undefined && filters.maxPrice !== null) {
      query = query.lte('price', filters.maxPrice);
    }
    
    if (filters.date) {
      // For now, we don't filter by date directly, as that would require checking availability
      // This would be implemented with a join on tour_availability or custom logic
    }

    if (filters.difficulty && filters.difficulty !== '') {
      query = query.eq('difficulty', filters.difficulty);
    }
    
    // Apply sorting
    if (filters.sortBy) {
      const [field, direction] = filters.sortBy.split('_');
      query = query.order(field, { ascending: direction === 'asc' });
    } else {
      query = query.order('id', { ascending: false });
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching activities:', error);
      throw error;
    }

    return data.map(adaptDBActivityToComponentActivity) as Activity[];
  }

  async searchActivities(filters: ActivityFilters = {}) {
    return this.getActivities(filters);
  }

  async getFeaturedActivities(limit: number = 3) {
    try {
      const { data, error } = await this.supabase
        .from('tours')  // Using tours table for now
        .select('*')
        .eq('is_featured', true)
        .limit(limit);

      if (error) {
        console.error('Error fetching featured activities:', error);
        throw error;
      }

      return data.map(adaptDBActivityToComponentActivity) as Activity[];
    } catch (err) {
      console.error('Exception in getFeaturedActivities:', err);
      return []; 
    }
  }

  async getActivityById(id: number) {
    const { data, error } = await this.supabase
      .from('tours')  // Using tours table for now
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching activity ${id}:`, error);
      throw error;
    }

    return adaptDBActivityToComponentActivity(data) as Activity;
  }

  async createActivity(activityData: Partial<Activity>) {
    console.log('Creating activity with data:', activityData);
    
    const dbData = adaptComponentActivityToDB(activityData);
    
    const { data, error } = await this.supabase
      .from('tours')
      .insert([dbData])
      .select()
      .single();

    if (error) {
      console.error('Error creating activity:', error);
      throw error;
    }

    return adaptDBActivityToComponentActivity(data);
  }

  async updateActivity(id: number, activityData: Partial<Activity>) {
    console.log('Updating activity with data:', activityData);

    const dbData = adaptComponentActivityToDB(activityData);

    const { data, error } = await this.supabase
      .from('tours')
      .update(dbData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating activity ${id}:`, error);
      throw error;
    }

    return adaptDBActivityToComponentActivity(data);
  }

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
  
  // Added method to get categories
  async getActivityCategories() {
    return ["Todos", "Barco", "Mergulho", "Trilha", "Terrestre", "Ecológico", "Cultural", "Gastronômico"];
  }

  // Methods for activity availability
  async getActivityAvailability(activityId: number) {
    const { data, error } = await this.supabase
      .from('tour_availability')  // Using tour_availability table for now
      .select('*')
      .eq('tour_id', activityId);

    if (error) {
      console.error(`Error fetching availability for activity ${activityId}:`, error);
      throw error;
    }

    return data;
  }

  async updateActivityAvailability(
    activityId: number,
    date: Date,
    availableSpots: number,
    customPrice?: number,
    status: 'available' | 'unavailable' = 'available'
  ) {
    const dateStr = date.toISOString().split('T')[0];
    
    const { data, error } = await this.supabase
      .from('tour_availability')
      .upsert({
        tour_id: activityId,
        date: dateStr,
        available_spots: availableSpots,
        custom_price: customPrice,
        status
      })
      .select()
      .single();

    if (error) {
      console.error(`Error updating availability for activity ${activityId}:`, error);
      throw error;
    }

    return data;
  }
}

export const activityService = new ActivityService();
