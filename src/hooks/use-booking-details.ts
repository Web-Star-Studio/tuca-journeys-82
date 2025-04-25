
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { demoData } from '@/utils/demoDataGenerator';

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
      if (!user?.id || !id) return null;
      
      try {
        console.log("Using demo booking data for ID:", id);
        // Find the specific booking from our demo data
        const booking = demoData.bookings.find(b => b.id === id);
        
        if (!booking) {
          console.log("Booking not found in demo data");
          return null;
        }
        
        return booking;
      } catch (err) {
        console.error(`Error fetching booking ${id}:`, err);
        toast.error("Erro ao carregar detalhes da reserva");
        return null;
      }
    },
    enabled: !!user?.id && !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  return {
    booking,
    isLoading,
    error,
  };
};
