
import { Booking } from '@/types/bookings';

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

      // Category from booking's joined object, if available
      const category =
        b.item_type === 'tour'
          ? (b.tours?.category || '')
          : b.item_type === 'accommodation'
          ? (b.accommodations?.type || '')
          : '';
      if (category) {
        categoryCount[category] = (categoryCount[category] || 0) + 1;
      }

      // Destination is tour/accommodation title
      const destination =
        b.item_type === 'tour'
          ? b.tours?.title
          : b.item_type === 'accommodation'
          ? b.accommodations?.title
          : '';
      if (destination) {
        destinations[destination] = (destinations[destination] || 0) + 1;
      }
      if (type === 'tour' && b.tours?.title) tourHistory.push(b.tours.title);
      if (type === 'accommodation' && b.accommodations?.title)
        accommodationHistory.push(b.accommodations.title);
    });

    // Find most frequent type/category/destination
    const mostFrequentType =
      Object.entries(typeCount).reduce(
        (max, entry) => (entry[1] > max[1] ? entry : max),
        ['', 0]
      )[0] || null;

    const favoriteCategory =
      Object.entries(categoryCount).reduce(
        (max, entry) => (entry[1] > max[1] ? entry : max),
        ['', 0]
      )[0] || null;

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
}

export const userPreferencesService = UserPreferencesService;
