
import { Booking } from '@/types/bookings';
import { supabase } from '@/lib/supabase';

/**
 * Service to analyze a user's booking history and extract interest patterns.
 * This can be used to power personalized recommendations and UI suggestions.
 */
export class UserPreferencesService {
  /**
   * Analyze booking history and infer user interests
   * @param bookings Array of Booking objects
   * @returns An object summarizing the user's travel interests based on their bookings
   */
  static inferInterestsFromBookings(bookings: Booking[]) {
    if (!bookings || bookings.length === 0) return {
      mostFrequentType: null,
      favoriteCategory: null,
      favoriteDestinations: [],
      bookingStats: {},
      tourHistory: [],
      accommodationHistory: []
    };

    // Count item type (tour/accommodation/event) frequencies
    const typeCount: Record<string, number> = {};
    const categoryCount: Record<string, number> = {};
    const destinations: Record<string, number> = {};
    const tourHistory: string[] = [];
    const accommodationHistory: string[] = [];

    bookings.forEach(b => {
      const type = b.item_type;
      typeCount[type] = (typeCount[type] || 0) + 1;
      
      // Add item name to appropriate history
      if (b.item_name) {
        if (type === 'tour') {
          tourHistory.push(b.item_name);
        } else if (type === 'accommodation') {
          accommodationHistory.push(b.item_name);
        }
        
        // Use item_name as destination
        destinations[b.item_name] = (destinations[b.item_name] || 0) + 1;
      }
      
      // For category, we would need to fetch the category separately or 
      // have it already included in the booking data
      // For now, we'll use item_type as a fallback for category
      const category = type;
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });

    // Find most frequent type/category/destination
    const mostFrequentType =
      Object.entries(typeCount).length > 0 ?
        Object.entries(typeCount).reduce(
          (max, entry) => (entry[1] > max[1] ? entry : max),
          ['', 0]
        )[0] : null;

    const favoriteCategory =
      Object.entries(categoryCount).length > 0 ?
        Object.entries(categoryCount).reduce(
          (max, entry) => (entry[1] > max[1] ? entry : max),
          ['', 0]
        )[0] : null;

    const favoriteDestinations = Object.entries(destinations)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([dest]) => dest);

    return {
      mostFrequentType,
      favoriteCategory,
      favoriteDestinations,
      bookingStats: {
        typeCount,
        categoryCount,
        destinations,
      },
      tourHistory,
      accommodationHistory,
    };
  }

  /**
   * Fetch extended booking information including tour and accommodation details
   * @param userId User ID to fetch bookings for
   * @returns Promise with array of enhanced booking objects
   */
  static async getEnhancedUserBookings(userId: string) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          tours:tour_id (*),
          accommodations:accommodation_id (*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to get enhanced user bookings:', error);
      return [];
    }
  }
}

export const userPreferencesService = UserPreferencesService;
