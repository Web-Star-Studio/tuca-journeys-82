import { BaseApiService } from './base-api';
import { Vehicle } from '@/types/vehicle';

export class VehicleService extends BaseApiService {
  async getVehicles(): Promise<Vehicle[]> {
    // Placeholder implementation
    return this.getMockVehicles();
  }

  async getVehicleById(id: number): Promise<Vehicle | null> {
    const vehicles = await this.getVehicles();
    return vehicles.find(vehicle => vehicle.id === id) || null;
  }

  async getVehiclesByPartnerId(partnerId: string): Promise<Vehicle[]> {
    // For demo partners, return mock data
    if (partnerId.startsWith('demo-')) {
      return this.getMockVehicles().filter(vehicle => vehicle.partner_id === partnerId);
    }

    // Placeholder implementation
    return [];
  }

  async createVehicle(vehicleData: Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>): Promise<Vehicle> {
    // Placeholder implementation
    return {
      id: Date.now(),
      ...vehicleData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  async updateVehicle(id: number, vehicleData: Partial<Vehicle>): Promise<Vehicle> {
    // Placeholder implementation
    return {
      id,
      name: 'Updated Vehicle',
      description: 'Description',
      type: 'car',
      price_per_day: 100,
      capacity: 4,
      image_url: '',
      partner_id: vehicleData.partner_id || 'partner-1',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  async deleteVehicle(id: number): Promise<void> {
    // Placeholder implementation
    console.log(`Deleting vehicle ${id}`);
  }

  async createVehicleBooking(bookingData: any): Promise<any> {
    // Placeholder implementation
    return {
      id: Date.now(),
      ...bookingData,
      created_at: new Date().toISOString()
    };
  }

  private getMockVehicles(): Vehicle[] {
    return [
      {
        id: 1,
        name: 'Buggy 4x4',
        description: 'Buggy para explorar as praias',
        type: 'buggy',
        price_per_day: 250,
        capacity: 4,
        image_url: '/vehicles/buggy.jpg',
        partner_id: 'demo-partner-1',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 2,
        name: 'Bicicleta Elétrica',
        description: 'Bicicleta elétrica para passeios na ilha',
        type: 'bicycle',
        price_per_day: 80,
        capacity: 1,
        image_url: '/vehicles/ebike.jpg',
        partner_id: 'demo-partner-2',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
  }
}

export const vehicleService = new VehicleService();
