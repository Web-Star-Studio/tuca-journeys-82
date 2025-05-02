
import { BaseApiService } from './base-api';
import type { 
  Restaurant, 
  RestaurantTable, 
  RestaurantReservation,
  AvailableTable
} from '@/types/restaurant';
import { toast } from 'sonner';

class RestaurantService extends BaseApiService {
  /**
   * Get all restaurants with optional filters
   */
  async getRestaurants(
    filters?: {
      cuisine_type?: string;
      price_range?: string;
      name?: string;
      is_featured?: boolean;
    }
  ) {
    let query = this.supabase.from('restaurants').select('*');

    if (filters?.cuisine_type) {
      query = query.eq('cuisine_type', filters.cuisine_type);
    }
    if (filters?.price_range) {
      query = query.eq('price_range', filters.price_range);
    }
    if (filters?.name) {
      query = query.ilike('name', `%${filters.name}%`);
    }
    if (filters?.is_featured !== undefined) {
      query = query.eq('is_featured', filters.is_featured);
    }

    const { data, error } = await query.order('name');

    if (error) {
      console.error('Error fetching restaurants:', error);
      throw error;
    }

    return data as Restaurant[];
  }

  /**
   * Get a restaurant by ID
   */
  async getRestaurantById(id: number) {
    const { data, error } = await this.supabase
      .from('restaurants')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching restaurant ${id}:`, error);
      throw error;
    }

    return data as Restaurant;
  }

  /**
   * Create a new restaurant
   */
  async createRestaurant(restaurant: Omit<Restaurant, 'id' | 'created_at' | 'updated_at' | 'rating'>) {
    const { data, error } = await this.supabase
      .from('restaurants')
      .insert([restaurant])
      .select()
      .single();

    if (error) {
      console.error('Error creating restaurant:', error);
      throw error;
    }

    return data as Restaurant;
  }

  /**
   * Update a restaurant
   */
  async updateRestaurant(
    id: number,
    restaurant: Partial<Omit<Restaurant, 'id' | 'created_at' | 'updated_at'>>
  ) {
    const { data, error } = await this.supabase
      .from('restaurants')
      .update(restaurant)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating restaurant ${id}:`, error);
      throw error;
    }

    return data as Restaurant;
  }

  /**
   * Delete a restaurant
   */
  async deleteRestaurant(id: number) {
    const { error } = await this.supabase
      .from('restaurants')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting restaurant ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get restaurant tables
   */
  async getRestaurantTables(restaurantId: number) {
    const { data, error } = await this.supabase
      .from('restaurant_tables')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .order('capacity');

    if (error) {
      console.error(`Error fetching tables for restaurant ${restaurantId}:`, error);
      throw error;
    }

    return data as RestaurantTable[];
  }

  /**
   * Add a table to a restaurant
   */
  async addTable(table: Omit<RestaurantTable, 'id' | 'is_active'>) {
    const { data, error } = await this.supabase
      .from('restaurant_tables')
      .insert([{...table, is_active: true}])
      .select()
      .single();

    if (error) {
      console.error('Error adding table:', error);
      throw error;
    }

    return data as RestaurantTable;
  }

  /**
   * Update a restaurant table
   */
  async updateTable(id: number, table: Partial<Omit<RestaurantTable, 'id'>>) {
    const { data, error } = await this.supabase
      .from('restaurant_tables')
      .update(table)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating table ${id}:`, error);
      throw error;
    }

    return data as RestaurantTable;
  }

  /**
   * Delete a restaurant table
   */
  async deleteTable(id: number) {
    const { error } = await this.supabase
      .from('restaurant_tables')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting table ${id}:`, error);
      throw error;
    }
  }

  /**
   * Check restaurant table availability
   */
  async checkAvailability(restaurantId: number, date: string, time: string, guests: number) {
    const { data, error } = await this.supabase
      .rpc('check_restaurant_availability', {
        p_restaurant_id: restaurantId,
        p_date: date,
        p_time: time,
        p_guests: guests
      });

    if (error) {
      console.error('Error checking restaurant availability:', error);
      throw error;
    }

    return data as AvailableTable[];
  }

  /**
   * Create a restaurant reservation
   */
  async createReservation(reservation: Omit<RestaurantReservation, 'id' | 'created_at' | 'updated_at'>) {
    // First check if there are available tables
    const availableTables = await this.checkAvailability(
      reservation.restaurant_id,
      reservation.reservation_date,
      reservation.reservation_time,
      reservation.guests
    );

    if (!availableTables || availableTables.length === 0 || !availableTables.some(table => table.available)) {
      throw new Error('No tables available for the selected date, time, and party size');
    }

    // Find the smallest table that fits
    const selectedTable = availableTables.find(table => table.available);
    if (!selectedTable) {
      throw new Error('No available tables found');
    }

    // Create the reservation with the selected table
    const { data, error } = await this.supabase
      .from('restaurant_reservations')
      .insert([{
        ...reservation,
        restaurant_table_id: selectedTable.table_id
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating reservation:', error);
      throw error;
    }

    return data as RestaurantReservation;
  }

  /**
   * Get user reservations
   */
  async getUserReservations(userId: string) {
    const { data, error } = await this.supabase
      .from('restaurant_reservations')
      .select(`
        *,
        restaurants(id, name, image_url, location, cuisine_type)
      `)
      .eq('user_id', userId)
      .order('reservation_date', { ascending: false });

    if (error) {
      console.error('Error fetching user reservations:', error);
      throw error;
    }

    return data as (RestaurantReservation & { restaurants: Partial<Restaurant> })[];
  }

  /**
   * Get restaurant reservations (for admin/restaurant owner)
   */
  async getRestaurantReservations(restaurantId: number, filters?: {
    date?: string;
    status?: string;
  }) {
    let query = this.supabase
      .from('restaurant_reservations')
      .select(`
        *,
        restaurant_tables(id, table_number, capacity, location)
      `)
      .eq('restaurant_id', restaurantId);

    if (filters?.date) {
      query = query.eq('reservation_date', filters.date);
    }

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    const { data, error } = await query.order('reservation_time');

    if (error) {
      console.error('Error fetching restaurant reservations:', error);
      throw error;
    }

    return data as (RestaurantReservation & { restaurant_tables: Partial<RestaurantTable> })[];
  }

  /**
   * Cancel a reservation
   */
  async cancelReservation(id: number) {
    const { data, error } = await this.supabase
      .from('restaurant_reservations')
      .update({ status: 'cancelled' })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error cancelling reservation ${id}:`, error);
      throw error;
    }

    return data as RestaurantReservation;
  }

  /**
   * Update reservation status
   */
  async updateReservationStatus(id: number, status: RestaurantReservation['status']) {
    const { data, error } = await this.supabase
      .from('restaurant_reservations')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating reservation status ${id}:`, error);
      throw error;
    }

    return data as RestaurantReservation;
  }
}

export const restaurantService = new RestaurantService();
