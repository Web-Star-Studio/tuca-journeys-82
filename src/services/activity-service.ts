
import { BaseApiService } from './base-api';
import { Activity, ActivityFilters, ActivityAvailability, ActivityBulkAvailabilityParams } from '@/types/activity';
import { adaptComponentActivityToDB, adaptDBActivityToComponentActivity } from '@/utils/activityAdapter';
import { Database } from '@/integrations/supabase/types-extensions';

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
  async getActivityAvailability(activityId: number): Promise<ActivityAvailability[]> {
    try {
      // Use the properly typed tour_availability table from our extended Database type
      const { data, error } = await this.supabase
        .from('tour_availability')
        .select('*')
        .eq('tour_id', activityId);

      if (error) {
        console.error(`Error fetching availability for activity ${activityId}:`, error);
        throw error;
      }

      if (!data) return [];

      // Map the DB data to our ActivityAvailability type with proper type safety
      return data.map(item => ({
        id: item.id,
        activityId: item.tour_id,
        date: item.date,
        availableSpots: item.available_spots,
        customPrice: item.custom_price,
        status: item.status as 'available' | 'unavailable',
        createdAt: item.created_at,
        updatedAt: item.updated_at
      }));
    } catch (err) {
      console.error(`Error in getActivityAvailability:`, err);
      return [];
    }
  }

  async updateActivityAvailability(
    activityId: number,
    date: Date,
    availableSpots: number,
    customPrice?: number,
    status: 'available' | 'unavailable' = 'available'
  ): Promise<ActivityAvailability> {
    try {
      // Format date as YYYY-MM-DD
      const dateStr = date.toISOString().split('T')[0];
      
      // First check if record exists
      const { data: existingData } = await this.supabase
        .from('tour_availability')
        .select('id')
        .eq('tour_id', activityId)
        .eq('date', dateStr)
        .maybeSingle();

      let result;
      
      if (existingData) {
        // Update existing record
        const { data, error } = await this.supabase
          .from('tour_availability')
          .update({ 
            available_spots: availableSpots,
            custom_price: customPrice,
            status: status
          })
          .eq('id', existingData.id)
          .select()
          .single();
          
        if (error) throw error;
        result = data;
      } else {
        // Insert new record
        const { data, error } = await this.supabase
          .from('tour_availability')
          .insert({ 
            tour_id: activityId,
            date: dateStr,
            available_spots: availableSpots,
            custom_price: customPrice,
            status: status
          })
          .select()
          .single();
          
        if (error) throw error;
        result = data;
      }

      if (!result) {
        throw new Error("Failed to update or create availability record");
      }

      // Map the result to our ActivityAvailability type
      return {
        id: result.id,
        activityId: result.tour_id,
        date: result.date,
        availableSpots: result.available_spots,
        customPrice: result.custom_price,
        status: result.status as 'available' | 'unavailable',
        createdAt: result.created_at,
        updatedAt: result.updated_at
      };
    } catch (err) {
      console.error(`Error in updateActivityAvailability:`, err);
      throw err;
    }
  }
  
  async bulkUpdateActivityAvailability(params: ActivityBulkAvailabilityParams): Promise<ActivityAvailability[]> {
    try {
      const { activityId, dates, availableSpots, customPrice, status = 'available' } = params;
      
      // Create array of objects for bulk insert
      const records = dates.map(date => ({
        tour_id: activityId,
        date: date.toISOString().split('T')[0],
        available_spots: availableSpots,
        custom_price: customPrice,
        status
      }));
      
      // Use upsert to handle both insert and update cases
      const { data, error } = await this.supabase
        .from('tour_availability')
        .upsert(records, { 
          onConflict: 'tour_id,date',
          ignoreDuplicates: false 
        })
        .select();
      
      if (error) {
        throw error;
      }
      
      if (!data) {
        return [];
      }
      
      // Map the results to our ActivityAvailability type
      return data.map(item => ({
        id: item.id,
        activityId: item.tour_id,
        date: item.date,
        availableSpots: item.available_spots,
        customPrice: item.custom_price,
        status: item.status as 'available' | 'unavailable',
        createdAt: item.created_at,
        updatedAt: item.updated_at
      }));
    } catch (err) {
      console.error(`Error in bulkUpdateActivityAvailability:`, err);
      throw err;
    }
  }
}

export const activityService = new ActivityService();
