
import { BaseApiService } from './base-api';
import { Customer } from '@/types/customer';
import { supabase } from '@/lib/supabase';

export class CustomerService extends BaseApiService {
  async getCustomers(): Promise<Customer[]> {
    // Demo implementation
    return this.getMockCustomers();
  }

  async getCustomerById(id: string): Promise<Customer | null> {
    const customers = await this.getCustomers();
    return customers.find(customer => customer.id === id) || null;
  }

  async createCustomer(customerData: Partial<Customer>): Promise<Customer> {
    // Mock implementation
    return {
      id: Date.now().toString(),
      name: customerData.name || 'New Customer',
      email: customerData.email || 'customer@example.com',
      phone: customerData.phone || '',
      location: customerData.location || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      avatar_url: customerData.avatar_url || '',
      last_booking: null,
      total_bookings: 0
    };
  }

  async updateCustomer(id: string, customerData: Partial<Customer>): Promise<Customer> {
    // Mock implementation
    const customer = await this.getCustomerById(id);
    if (!customer) {
      throw new Error(`Customer with ID ${id} not found`);
    }

    return {
      ...customer,
      ...customerData,
      updated_at: new Date().toISOString()
    };
  }

  async deleteCustomer(id: string): Promise<void> {
    // Mock implementation
    console.log(`Deleting customer ${id}`);
  }

  private async getCustomersFromDB(): Promise<Customer[]> {
    // Use a simplified query to avoid type recursion issues
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*');
      
      if (error) throw error;
      
      return (data || []).map(profile => ({
        id: profile.id,
        name: profile.name || '',
        email: profile.email || '',
        location: profile.city || '',
        last_booking: null,
        total_bookings: 0,
        avatar_url: '',
        created_at: profile.created_at,
        updated_at: profile.updated_at || profile.created_at,
        phone: profile.phone || ''
      }));
    } catch (error) {
      console.error('Error fetching customers:', error);
      return [];
    }
  }

  private getMockCustomers(): Customer[] {
    return [
      {
        id: '1',
        name: 'João Silva',
        email: 'joao.silva@example.com',
        phone: '+55 11 98765-4321',
        location: 'São Paulo, SP',
        created_at: '2023-08-10T12:30:00Z',
        updated_at: '2023-09-15T14:22:00Z',
        avatar_url: '/avatars/joao.jpg',
        last_booking: '2023-09-12T09:45:00Z',
        total_bookings: 3
      },
      {
        id: '2',
        name: 'Maria Oliveira',
        email: 'maria.oliveira@example.com',
        phone: '+55 21 99876-5432',
        location: 'Rio de Janeiro, RJ',
        created_at: '2023-07-22T10:15:00Z',
        updated_at: '2023-09-01T16:08:00Z',
        avatar_url: '/avatars/maria.jpg',
        last_booking: '2023-08-28T15:30:00Z',
        total_bookings: 2
      }
    ];
  }
}

export const customerService = new CustomerService();
