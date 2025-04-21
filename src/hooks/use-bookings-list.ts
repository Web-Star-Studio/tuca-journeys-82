import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { bookingService } from '@/services';
import { UIBooking } from '@/types';
import { toast } from 'sonner';

/**
 * Hook to fetch user bookings
 * 
 * @param options Configuration options for the query
 * @returns List of user bookings and loading/error states
 */
export const useBookingsList = (options: { 
  enabled?: boolean; 
  limit?: number;
  status?: 'all' | 'confirmed' | 'pending' | 'cancelled';
} = {}) => {
  const { 
    enabled = true,
    limit,
    status = 'all'
  } = options;
  
  const { user } = useAuth();
  
  const { 
    data: bookings = [], 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['bookings', user?.id, limit, status],
    queryFn: async () => {
      if (!user?.id) return [];
      
      try {
        // Use SOMELY the Supabase real query: remove mocks/demos
        const allBookings = await bookingService.getUserBookings(user.id);
        
        // Filter by status if needed
        let filteredBookings = allBookings;
        if (status !== 'all') {
          filteredBookings = allBookings.filter(booking => booking.status === status);
        }
        
        // Apply limit if needed
        if (limit && limit > 0) {
          filteredBookings = filteredBookings.slice(0, limit);
        }
        
        return filteredBookings;
      } catch (err) {
        console.error("Error fetching user bookings:", err);
        toast.error("Erro ao carregar suas reservas");
        return [];
      }
    },
    enabled: !!user?.id && enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  return {
    bookings,
    isLoading,
    error,
    refetch
  };
};
