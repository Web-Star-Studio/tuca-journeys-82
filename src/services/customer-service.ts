
import { BaseApiService } from './base-api';

export interface Customer {
  id: string;
  name: string;
  email: string;
  location: string;
  lastBooking?: string;
  totalBookings: number;
  avatar?: string;
  phone?: string;
  createdAt: string;
  partnerId: string;
}

export class CustomerService extends BaseApiService {
  async getCustomersByPartnerId(partnerId: string): Promise<Customer[]> {
    // For demo partners, return mock data
    if (partnerId.startsWith('demo-')) {
      return [
        {
          id: '1',
          name: 'Carlos Silva',
          email: 'carlos.silva@example.com',
          location: 'Rio de Janeiro, RJ',
          lastBooking: '2024-04-10',
          totalBookings: 3,
          partnerId: partnerId,
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Maria Oliveira',
          email: 'maria.oliveira@example.com',
          location: 'São Paulo, SP',
          lastBooking: '2024-04-15',
          totalBookings: 2,
          partnerId: partnerId,
          createdAt: new Date().toISOString(),
        },
        {
          id: '3',
          name: 'João Santos',
          email: 'joao.santos@example.com',
          location: 'Belo Horizonte, MG',
          lastBooking: '2024-04-18',
          totalBookings: 1,
          partnerId: partnerId,
          createdAt: new Date().toISOString(),
        }
      ];
    }

    try {
      // For actual data, we'll query the user_profiles table and join with bookings
      // since we don't have a specific customers table
      const { data, error } = await this.supabase
        .from('user_profiles')
        .select('*')
        .eq('partner_id', partnerId);

      if (error) {
        console.error('Error fetching customers:', error);
        throw error;
      }

      // Map the data to our Customer interface
      return data.map(customer => ({
        id: customer.id.toString(),
        name: customer.name || 'Unknown',
        email: customer.email || 'unknown@example.com',
        location: customer.address ? `${customer.city}, ${customer.state}` : 'Unknown',
        lastBooking: null, // We would need to join with bookings table to get this
        totalBookings: 0,  // We would need to join with bookings table to get this
        avatar: null,
        phone: customer.phone,
        partnerId: partnerId,
        createdAt: customer.created_at
      }));
    } catch (error) {
      console.error('Error in getCustomersByPartnerId:', error);
      // If there's an error, return empty array
      return [];
    }
  }
}

export const customerService = new CustomerService();
