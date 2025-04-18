
import { BaseApiService } from './base-api';
import { Partner } from '@/types/partner';

/**
 * Service for handling partner-related API calls
 */
export class PartnerService extends BaseApiService {
  /**
   * Get all partners
   */
  async getPartners(): Promise<Partner[]> {
    const { data, error } = await this.supabase
      .from('partners')
      .select('*');
    
    if (error) {
      console.error('Error fetching partners:', error);
      throw error;
    }
    
    return data;
  }

  /**
   * Get a specific partner by ID
   */
  async getPartnerById(id: string): Promise<Partner> {
    const { data, error } = await this.supabase
      .from('partners')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching partner ${id}:`, error);
      throw error;
    }
    
    return data;
  }

  /**
   * Get partner by user ID
   */
  async getPartnerByUserId(userId: string): Promise<Partner | null> {
    const { data, error } = await this.supabase
      .from('partners')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is the error code for "no rows returned"
      console.error(`Error fetching partner for user ${userId}:`, error);
      throw error;
    }
    
    return data || null;
  }

  /**
   * Create a new partner
   */
  async createPartner(partnerData: Omit<Partner, 'id' | 'created_at' | 'updated_at'>): Promise<Partner> {
    const { data, error } = await this.supabase
      .from('partners')
      .insert([partnerData])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating partner:', error);
      throw error;
    }
    
    return data;
  }

  /**
   * Update a partner
   */
  async updatePartner(id: string, partnerData: Partial<Partner>): Promise<Partner> {
    const { data, error } = await this.supabase
      .from('partners')
      .update(partnerData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating partner ${id}:`, error);
      throw error;
    }
    
    return data;
  }

  /**
   * Verify a partner
   */
  async verifyPartner(id: string): Promise<Partner> {
    return this.updatePartner(id, { is_verified: true });
  }

  /**
   * Set partner active state
   */
  async setPartnerActiveState(id: string, isActive: boolean): Promise<Partner> {
    return this.updatePartner(id, { is_active: isActive });
  }
}

export const partnerService = new PartnerService();
