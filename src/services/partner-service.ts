
import { BaseApiService } from './base-api';
import { DemoService } from './demo-service';
import { Partner } from '@/types/partner';

export class PartnerService extends BaseApiService {
  /**
   * Get partner by user ID
   */
  async getPartnerByUserId(userId: string | undefined): Promise<Partner | null> {
    try {
      if (!userId) return null;

      // Handle demo users
      if (DemoService.isDemoUser(userId)) {
        if (userId.includes('partner')) {
          return {
            id: 'demo-partner-id',
            user_id: userId,
            business_name: 'Demo Partner Business',
            business_type: 'tour' as Partner['business_type'],
            is_verified: true,
            is_active: true
          };
        }
        return null;
      }

      // Handle real users
      const { data, error } = await this.supabase
        .from('partners')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        this.handleError(error, 'Error fetching partner data');
      }
      
      // Type assertion to ensure the returned data matches our Partner type
      return data as Partner;
    } catch (error) {
      console.error('Error in getPartnerByUserId:', error);
      return null;
    }
  }

  /**
   * Check if user is a verified partner
   */
  async isVerifiedPartner(userId: string): Promise<boolean> {
    try {
      if (!userId) return false;
      
      const partner = await this.getPartnerByUserId(userId);
      return !!partner && partner.is_verified === true;
    } catch (error) {
      console.error('Error checking verified partner status:', error);
      return false;
    }
  }

  /**
   * Get partner by ID
   */
  async getPartnerById(id: string): Promise<Partner | null> {
    try {
      if (!id) return null;

      const { data, error } = await this.supabase
        .from('partners')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        this.handleError(error, 'Error fetching partner data');
      }
      
      return data as Partner;
    } catch (error) {
      console.error('Error in getPartnerById:', error);
      return null;
    }
  }

  /**
   * Create a new partner
   */
  async createPartner(partnerData: Partial<Partner>): Promise<Partner | null> {
    try {
      const { data, error } = await this.supabase
        .from('partners')
        .insert([partnerData])
        .select()
        .single();

      if (error) {
        this.handleError(error, 'Error creating partner');
        return null;
      }

      return data as Partner;
    } catch (error) {
      console.error('Error in createPartner:', error);
      return null;
    }
  }

  /**
   * Update a partner
   */
  async updatePartner(id: string, partnerData: Partial<Partner>): Promise<Partner | null> {
    try {
      const { data, error } = await this.supabase
        .from('partners')
        .update(partnerData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        this.handleError(error, 'Error updating partner');
        return null;
      }

      return data as Partner;
    } catch (error) {
      console.error('Error in updatePartner:', error);
      return null;
    }
  }

  /**
   * Get all partners
   */
  async getPartners(): Promise<Partner[]> {
    try {
      const { data, error } = await this.supabase
        .from('partners')
        .select('*');

      if (error) {
        this.handleError(error, 'Error fetching partners');
        return [];
      }

      return data as Partner[];
    } catch (error) {
      console.error('Error in getPartners:', error);
      return [];
    }
  }
}

export const partnerService = new PartnerService();
