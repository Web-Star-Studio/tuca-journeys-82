
import { BaseApiService } from './base-api';
import { Partner } from '@/types/partner';
import { Tour } from '@/types/database';
import { Accommodation } from '@/types/database';
import { FileStorageService } from './file-storage-service';

export class PartnerService extends BaseApiService {
  /**
   * Get partner profile by user ID
   */
  async getPartnerByUserId(userId: string): Promise<Partner | null> {
    try {
      const { data, error } = await this.supabase
        .from('partners')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) throw error;
      return data as Partner;
    } catch (error) {
      this.handleError(error, 'Failed to get partner profile');
      return null;
    }
  }
  
  /**
   * Get partner by ID
   */
  async getPartnerById(partnerId: string): Promise<Partner | null> {
    try {
      const { data, error } = await this.supabase
        .from('partners')
        .select('*')
        .eq('id', partnerId)
        .maybeSingle();

      if (error) throw error;
      return data as Partner;
    } catch (error) {
      this.handleError(error, 'Failed to get partner by ID');
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
        .insert(partnerData)
        .select()
        .single();

      if (error) throw error;
      return data as Partner;
    } catch (error) {
      this.handleError(error, 'Failed to create partner profile');
      return null;
    }
  }

  /**
   * Update partner profile
   */
  async updatePartner(partnerId: string, updates: Partial<Partner>): Promise<Partner | null> {
    try {
      const { data, error } = await this.supabase
        .from('partners')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', partnerId)
        .select()
        .single();

      if (error) throw error;
      return data as Partner;
    } catch (error) {
      this.handleError(error, 'Failed to update partner profile');
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
        .select('*')
        .order('business_name');

      if (error) throw error;
      return data as Partner[];
    } catch (error) {
      this.handleError(error, 'Failed to get partners');
      return [];
    }
  }

  /**
   * Update partner profile
   */
  async updatePartnerProfile(partnerId: string, updates: Partial<Partner>): Promise<Partner | null> {
    try {
      const { data, error } = await this.supabase
        .from('partners')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', partnerId)
        .select()
        .single();

      if (error) throw error;
      return data as Partner;
    } catch (error) {
      this.handleError(error, 'Failed to update partner profile');
      return null;
    }
  }

  /**
   * Create a tour
   */
  async createTour(partnerId: string, tourData: Omit<Tour, 'id' | 'created_at' | 'updated_at' | 'partner_id'>): Promise<Tour | null> {
    try {
      const { data, error } = await this.supabase
        .from('tours')
        .insert({
          ...tourData,
          partner_id: partnerId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return data as Tour;
    } catch (error) {
      this.handleError(error, 'Failed to create tour');
      return null;
    }
  }

  /**
   * Update a tour
   */
  async updateTour(tourId: number, updates: Partial<Omit<Tour, 'id' | 'created_at' | 'partner_id'>>): Promise<Tour | null> {
    try {
      const { data, error } = await this.supabase
        .from('tours')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', tourId)
        .select()
        .single();

      if (error) throw error;
      return data as Tour;
    } catch (error) {
      this.handleError(error, 'Failed to update tour');
      return null;
    }
  }

  /**
   * Create an accommodation
   */
  async createAccommodation(partnerId: string, accomData: Omit<Accommodation, 'id' | 'created_at' | 'updated_at' | 'partner_id'>): Promise<Accommodation | null> {
    try {
      // Make sure the required fields are present and assign default values for required fields
      const accommodationData = {
        ...accomData,
        partner_id: partnerId,
        rating: accomData.rating ?? 0, // Default rating if not provided
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await this.supabase
        .from('accommodations')
        .insert(accommodationData)
        .select()
        .single();

      if (error) throw error;
      return data as Accommodation;
    } catch (error) {
      this.handleError(error, 'Failed to create accommodation');
      return null;
    }
  }

  /**
   * Update an accommodation
   */
  async updateAccommodation(accomId: number, updates: Partial<Omit<Accommodation, 'id' | 'created_at' | 'partner_id'>>): Promise<Accommodation | null> {
    try {
      const { data, error } = await this.supabase
        .from('accommodations')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', accomId)
        .select()
        .single();

      if (error) throw error;
      return data as Accommodation;
    } catch (error) {
      this.handleError(error, 'Failed to update accommodation');
      return null;
    }
  }

  /**
   * Upload service images with proper references
   */
  async uploadServiceImage(
    file: File,
    serviceType: 'tour' | 'accommodation' | 'event' | 'vehicle',
    serviceId: number,
    isMainImage: boolean = false
  ): Promise<string | null> {
    try {
      // Upload file to storage
      const uploadResult = await FileStorageService.uploadFile(
        file, 
        `${serviceType}s`, // tours, accommodations, etc.
        undefined,
        serviceId
      );

      if (!uploadResult) return null;

      // Update the database reference if this is the main image
      if (isMainImage) {
        await this.supabase
          .from(serviceType === 'tour' ? 'tours' : 
               serviceType === 'accommodation' ? 'accommodations' :
               serviceType === 'event' ? 'events' : 'vehicles')
          .update({ image_url: uploadResult.url })
          .eq('id', serviceId);
      } else {
        // Add to gallery images array
        const { data: currentData } = await this.supabase
          .from(serviceType === 'tour' ? 'tours' : 
               serviceType === 'accommodation' ? 'accommodations' :
               serviceType === 'event' ? 'events' : 'vehicles')
          .select('gallery_images')
          .eq('id', serviceId)
          .single();

        if (currentData) {
          const galleryImages = currentData.gallery_images || [];
          
          await this.supabase
            .from(serviceType === 'tour' ? 'tours' : 
                 serviceType === 'accommodation' ? 'accommodations' :
                 serviceType === 'event' ? 'events' : 'vehicles')
            .update({ 
              gallery_images: [...galleryImages, uploadResult.url] 
            })
            .eq('id', serviceId);
        }
      }

      return uploadResult.url;
    } catch (error) {
      this.handleError(error, 'Failed to upload service image');
      return null;
    }
  }
}

export const partnerService = new PartnerService();
