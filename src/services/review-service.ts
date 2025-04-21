
import { BaseApiService } from './base-api';

interface CreateReviewParams {
  userId: string;
  itemId: number;
  itemType: 'accommodation' | 'tour' | 'event' | 'vehicle' | 'product' | 'partner';
  rating: number;
  comment?: string;
  images?: string[];
}

export class ReviewService extends BaseApiService {
  /**
   * Create a new review
   */
  async createReview(params: CreateReviewParams) {
    try {
      const { data, error } = await this.supabase
        .from('reviews')
        .insert({
          user_id: params.userId,
          item_id: params.itemId,
          item_type: params.itemType,
          rating: params.rating,
          comment: params.comment || null,
          images: params.images || [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      this.handleError(error, 'Failed to create review');
      return null;
    }
  }

  /**
   * Get reviews for a specific item
   */
  async getItemReviews(itemType: string, itemId: number) {
    try {
      const { data, error } = await this.supabase
        .from('reviews')
        .select(`
          id,
          rating,
          comment,
          images,
          created_at,
          updated_at,
          user_id,
          user_profiles:user_id (
            name,
            avatar_url
          )
        `)
        .eq('item_type', itemType)
        .eq('item_id', itemId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      this.handleError(error, 'Failed to get reviews');
      return [];
    }
  }

  /**
   * Get reviews by a specific user
   */
  async getUserReviews(userId: string) {
    try {
      const { data, error } = await this.supabase
        .from('reviews')
        .select()
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      this.handleError(error, 'Failed to get user reviews');
      return [];
    }
  }

  /**
   * Update a review
   */
  async updateReview(reviewId: number, updates: Partial<Omit<CreateReviewParams, 'userId' | 'itemId' | 'itemType'>>) {
    try {
      updates.images = updates.images || [];
      
      const { data, error } = await this.supabase
        .from('reviews')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', reviewId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      this.handleError(error, 'Failed to update review');
      return null;
    }
  }

  /**
   * Delete a review
   */
  async deleteReview(reviewId: number) {
    try {
      const { error } = await this.supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId);
      
      if (error) throw error;
      return true;
    } catch (error) {
      this.handleError(error, 'Failed to delete review');
      return false;
    }
  }
}

export const reviewService = new ReviewService();
