
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { bookingService } from '@/services';
import { UIBooking } from '@/types';

/**
 * Hook to fetch user bookings
 * 
 * @returns List of user bookings and loading/error states
 */
export const useBookingsList = () => {
  const { user } = useAuth();
  
  const { 
    data: bookings = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['bookings', user?.id],
    queryFn: async () => {
      if (!user) return [];
      return await bookingService.getUserBookings(user.id);
    },
    enabled: !!user,
  });
  
  return {
    bookings,
    isLoading,
    error,
  };
};
