
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
    
    // Cast the response to the Partner type with type validation for business_type
    return (data as any[]).map(partner => ({
      ...partner,
      business_type: partner.business_type as Partner['business_type']
    })) as Partner[];
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
    
    // Cast the response to the Partner type with type validation
    return {
      ...data,
      business_type: (data as any).business_type as Partner['business_type']
    } as Partner;
  }

  /**
   * Get partner by user ID
   */
  async getPartnerByUserId(userId: string): Promise<Partner | null> {
    // Handle demo users with mock data for better UI experience
    if (userId.startsWith('demo-')) {
      console.log(`Returning demo partner data for user ${userId}`);
      // Return mock partner data for demo users
      return {
        id: 'demo-partner-id',
        user_id: userId,
        business_name: 'Demo Business',
        business_type: 'accommodation',
        description: 'This is a demo partner account for testing purposes.',
        logo_url: '/lovable-uploads/1ed8fc0e-6277-4755-8c6e-88af20896e06.png',
        contact_email: 'demo@example.com',
        contact_phone: '+55 99 99999-9999',
        address: 'Rua Demo, 123 - São Paulo, SP',
        is_verified: true,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }
    
    try {
      const { data, error } = await this.supabase
        .from('partners')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 is the error code for "no rows returned"
        console.error(`Error fetching partner for user ${userId}:`, error);
        throw error;
      }
      
      // Cast the response to the Partner type
      return data ? {
        ...data,
        business_type: (data as any).business_type as Partner['business_type']
      } as Partner : null;
    } catch (error: any) {
      // Log error but don't throw for demo users to prevent UI from breaking
      console.error(`Error fetching partner for user ${userId}:`, error);
      
      if (userId.startsWith('demo-')) {
        return null;
      }
      
      throw error;
    }
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
    
    // Cast the response to the Partner type
    return {
      ...data,
      business_type: (data as any).business_type as Partner['business_type']
    } as Partner;
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
    
    // Cast the response to the Partner type
    return {
      ...data,
      business_type: (data as any).business_type as Partner['business_type']
    } as Partner;
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
