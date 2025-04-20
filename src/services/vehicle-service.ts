
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
      name: vehicleData.name,
      description: vehicleData.description,
      type: vehicleData.type,
      price_per_day: vehicleData.price_per_day,
      price: vehicleData.price,
      capacity: vehicleData.capacity,
      image_url: vehicleData.image_url,
      partner_id: vehicleData.partner_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      available_quantity: vehicleData.available_quantity,
      features: vehicleData.features || [],
      gallery_images: vehicleData.gallery_images || [],
      is_available: vehicleData.is_available || true
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
      price: 100,
      capacity: 4,
      image_url: '',
      partner_id: vehicleData.partner_id || 'partner-1',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      available_quantity: 1,
      features: [],
      gallery_images: [],
      is_available: true
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
        price: 250, // Adding this for compatibility
        capacity: 4,
        image_url: '/vehicles/buggy.jpg',
        partner_id: 'demo-partner-1',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        available_quantity: 3,
        features: ['4x4', 'Open top', 'Manual'],
        gallery_images: ['/vehicles/buggy-1.jpg', '/vehicles/buggy-2.jpg'],
        is_available: true
      },
      {
        id: 2,
        name: 'Bicicleta Elétrica',
        description: 'Bicicleta elétrica para passeios na ilha',
        type: 'bicycle',
        price_per_day: 80,
        price: 80, // Adding this for compatibility
        capacity: 1,
        image_url: '/vehicles/ebike.jpg',
        partner_id: 'demo-partner-2',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        available_quantity: 5,
        features: ['Electric', 'Basket', '30km range'],
        gallery_images: [],
        is_available: true
      }
    ];
  }
}

export const vehicleService = new VehicleService();
