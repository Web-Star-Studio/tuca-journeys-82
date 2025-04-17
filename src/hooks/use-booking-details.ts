
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { bookingService } from '@/services';
import { UIBooking } from '@/types';

/**
 * Hook to fetch details for a specific booking
 * 
 * @param id - Booking ID to fetch
 * @returns Booking details and loading/error states
 */
export const useBookingDetails = (id: string | undefined) => {
  const { user } = useAuth();
  
  const { 
    data: booking, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['booking', id],
    queryFn: async () => {
      if (!user || !id) return null;
      const bookings = await bookingService.getUserBookings(user.id);
      return bookings.find(booking => booking.id === id) || null;
    },
    enabled: !!user && !!id,
  });
  
  return {
    booking,
    isLoading,
    error,
  };
};
