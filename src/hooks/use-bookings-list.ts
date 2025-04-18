
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { bookingService } from '@/services';
import { UIBooking } from '@/types';
import { toast } from 'sonner';

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
        // Check if this is a demo user (has 'demo-' prefix)
        if (user.id.startsWith('demo-')) {
          // Return mock data for demo users
          return getMockBookingsData();
        }
        
        // For real users, fetch from the database
        return await bookingService.getUserBookings(user.id);
      } catch (err) {
        console.error("Error fetching user bookings:", err);
        toast.error("Erro ao carregar suas reservas");
        return [];
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

/**
 * Returns mock booking data for demo users
 */
const getMockBookingsData = (): UIBooking[] => {
  return [
    {
      id: "demo-1001",
      user_id: "demo-user",
      tour_id: 1,
      accommodation_id: undefined,
      item_type: "tour",
      item_name: "Passeio de Barco ao Pôr do Sol",
      user_name: "Demo User",
      user_email: "demo@example.com",
      start_date: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 days from now
      end_date: new Date(Date.now() + 86400000 * 5).toISOString(),
      guests: 2,
      total_price: 350,
      status: 'confirmed',
      payment_status: 'paid',
      payment_method: "credit_card",
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
      updated_at: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      id: "demo-1002",
      user_id: "demo-user",
      accommodation_id: 2,
      tour_id: undefined,
      item_type: "accommodation",
      item_name: "Pousada Vista Mar",
      user_name: "Demo User",
      user_email: "demo@example.com",
      start_date: new Date(Date.now() + 86400000 * 15).toISOString(), // 15 days from now
      end_date: new Date(Date.now() + 86400000 * 20).toISOString(), // 5 day stay
      guests: 2,
      total_price: 1250,
      status: 'pending',
      payment_status: 'pending',
      payment_method: undefined,
      created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      updated_at: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: "demo-1003",
      user_id: "demo-user",
      tour_id: 5,
      accommodation_id: undefined,
      item_type: "tour",
      item_name: "Tour Histórico",
      user_name: "Demo User",
      user_email: "demo@example.com",
      start_date: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
      end_date: new Date(Date.now() - 86400000 * 10).toISOString(),
      guests: 1,
      total_price: 120,
      status: 'cancelled',
      payment_status: 'refunded',
      payment_method: "credit_card",
      created_at: new Date(Date.now() - 86400000 * 30).toISOString(), // 30 days ago
      updated_at: new Date(Date.now() - 86400000 * 8).toISOString() // Updated a couple days after cancel
    }
  ];
};
