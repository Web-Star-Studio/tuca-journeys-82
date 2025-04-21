
import { BaseApiService } from './base-api';
import { DemoService } from './demo-service';

export class PartnerService extends BaseApiService {
  /**
   * Get partner by user ID
   */
  async getPartnerByUserId(userId: string | undefined) {
    try {
      if (!userId) return null;

      // Handle demo users
      if (DemoService.isDemoUser(userId)) {
        if (userId.includes('partner')) {
          return {
            id: 'demo-partner-id',
            user_id: userId,
            business_name: 'Demo Partner Business',
            business_type: 'tour',
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

      return data;
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
}

export const partnerService = new PartnerService();
