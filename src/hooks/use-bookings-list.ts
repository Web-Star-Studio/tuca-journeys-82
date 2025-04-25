
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { bookingService } from '@/services';
import { UIBooking } from '@/types';
import { toast } from 'sonner';
import { demoData } from '@/utils/demoDataGenerator';

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
      if (!user?.id) return [];
      
      try {
        // Using demo data instead of API call
        console.log("Using demo bookings data instead of API");
        return demoData.bookings;
      } catch (err) {
        console.error("Error fetching bookings demo data:", err);
        toast.error("Erro ao carregar suas reservas");
        throw err;
      }
    },
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  return {
    bookings,
    isLoading,
    error,
  };
};
