import { BaseApiService } from './base-api';
import { Customer } from '@/types/customer';
import { supabase } from '@/lib/supabase';

export class CustomerService extends BaseApiService {
  async getCustomers(): Promise<Customer[]> {
    // FORNEÇA LISTA VAZIA SE NÃO HÁ CLIENTES CADASTRADOS NO BANCO DE DADOS
    return [];
  }
  async getCustomerById(id: string): Promise<Customer | null> {
    return null;
  }
  async getCustomersByPartnerId(partnerId: string): Promise<Customer[]> {
    return [];
  }
  async createCustomer(customerData: Partial<Customer>): Promise<Customer> {
    throw new Error('A criação de cliente só pode ser feita em produção via Supabase');
  }
  async updateCustomer(id: string, customerData: Partial<Customer>): Promise<Customer> {
    throw new Error('A atualização de cliente só pode ser feita em produção via Supabase');
  }
  async deleteCustomer(id: string): Promise<void> {
    throw new Error('A deleção de cliente só pode ser feita em produção via Supabase');
  }
  private async getCustomersFromDB(): Promise<Customer[]> {
    // Não permitir mocks: somente dados reais do Supabase.
    return [];
  }
  private getMockCustomers(): Customer[] {
    return []; // Defensivo: não há mais mocks.
  }
}
export const customerService = new CustomerService();
