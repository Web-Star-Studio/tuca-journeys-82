import { BaseApiService } from './base-api';
import { Vehicle, VehicleBooking } from '@/types/vehicle';

/**
 * Service for handling vehicle-related API calls
 */
export class VehicleService extends BaseApiService {
  /**
   * Get all vehicles
   */
  async getVehicles(): Promise<Vehicle[]> {
    const { data, error } = await this.supabase
      .from('vehicles')
      .select('*');
    
    if (error) {
      console.error('Error fetching vehicles:', error);
      throw error;
    }
    
    return data as Vehicle[];
  }

  /**
   * Get a specific vehicle by ID
   */
  async getVehicleById(id: number): Promise<Vehicle> {
    const { data, error } = await this.supabase
      .from('vehicles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching vehicle ${id}:`, error);
      throw error;
    }
    
    return data as Vehicle;
  }

  /**
   * Get vehicles by partner ID
   */
  async getVehiclesByPartnerId(partnerId: string): Promise<Vehicle[]> {
    const { data, error } = await this.supabase
      .from('vehicles')
      .select('*')
      .eq('partner_id', partnerId);
    
    if (error) {
      console.error(`Error fetching vehicles for partner ${partnerId}:`, error);
      throw error;
    }
    
    return data as Vehicle[];
  }

  /**
   * Create a new vehicle
   */
  async createVehicle(vehicleData: Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>): Promise<Vehicle> {
    const { data, error } = await this.supabase
      .from('vehicles')
      .insert([vehicleData])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating vehicle:', error);
      throw error;
    }
    
    return data as Vehicle;
  }

  /**
   * Update a vehicle
   */
  async updateVehicle(id: number, vehicleData: Partial<Vehicle>): Promise<Vehicle> {
    const { data, error } = await this.supabase
      .from('vehicles')
      .update(vehicleData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating vehicle ${id}:`, error);
      throw error;
    }
    
    return data as Vehicle;
  }

  /**
   * Delete a vehicle
   */
  async deleteVehicle(id: number): Promise<void> {
    const { error } = await this.supabase
      .from('vehicles')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting vehicle ${id}:`, error);
      throw error;
    }
  }

  /**
   * Create a vehicle booking
   */
  async createVehicleBooking(bookingData: Omit<VehicleBooking, 'id' | 'created_at' | 'updated_at'>): Promise<VehicleBooking> {
    const { data, error } = await this.supabase
      .from('vehicle_bookings')
      .insert([bookingData])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating vehicle booking:', error);
      throw error;
    }
    
    return {
      ...data,
      status: data.status as VehicleBooking['status'],
      payment_status: data.payment_status as VehicleBooking['payment_status']
    } as VehicleBooking;
  }

  /**
   * Get vehicle bookings by user ID
   */
  async getVehicleBookingsByUserId(userId: string): Promise<VehicleBooking[]> {
    const { data, error } = await this.supabase
      .from('vehicle_bookings')
      .select(`
        *,
        vehicles(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error(`Error fetching vehicle bookings for user ${userId}:`, error);
      throw error;
    }
    
    return data.map(booking => ({
      ...booking,
      status: booking.status as VehicleBooking['status'],
      payment_status: booking.payment_status as VehicleBooking['payment_status']
    })) as unknown as VehicleBooking[];
  }

  /**
   * Get vehicle bookings by partner ID
   */
  async getVehicleBookingsByPartnerId(partnerId: string): Promise<VehicleBooking[]> {
    const { data, error } = await this.supabase
      .from('vehicle_bookings')
      .select(`
        *,
        vehicles!inner(*)
      `)
      .eq('vehicles.partner_id', partnerId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error(`Error fetching vehicle bookings for partner ${partnerId}:`, error);
      throw error;
    }
    
    return data.map(booking => ({
      ...booking,
      status: booking.status as VehicleBooking['status'],
      payment_status: booking.payment_status as VehicleBooking['payment_status']
    })) as unknown as VehicleBooking[];
  }

  /**
   * Cancel a vehicle booking
   */
  async cancelVehicleBooking(bookingId: number): Promise<VehicleBooking> {
    const { data, error } = await this.supabase
      .from('vehicle_bookings')
      .update({ 
        status: 'cancelled' as const,
        payment_status: 'refunded' as const
      })
      .eq('id', bookingId)
      .select()
      .single();
    
    if (error) {
      console.error(`Error cancelling vehicle booking ${bookingId}:`, error);
      throw error;
    }
    
    return {
      ...data,
      status: data.status as VehicleBooking['status'],
      payment_status: data.payment_status as VehicleBooking['payment_status']
    } as VehicleBooking;
  }
}

export const vehicleService = new VehicleService();
