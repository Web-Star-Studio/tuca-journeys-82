
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { apiService } from '@/services/api';
import { UIBooking } from '@/types';
import { CreateBookingDTO } from '@/types/bookings';

/**
 * Hook to manage user bookings
 * Provides methods to fetch, create and cancel bookings
 */
export const useBookings = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  // Fetch user's bookings
  const { 
    data: bookings = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['bookings', user?.id],
    queryFn: async () => {
      if (!user) return [];
      return await apiService.getUserBookings(user.id);
    },
    enabled: !!user,
  });

  // Cancel booking mutation
  const cancelBookingMutation = useMutation({
    mutationFn: async (bookingId: string) => {
      if (!user) throw new Error('User not authenticated');
      return await apiService.cancelBooking(bookingId, user.id);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['bookings', user?.id] });
      toast.success('Reserva cancelada com sucesso');
    },
    onError: (error) => {
      console.error('Error cancelling booking:', error);
      toast.error('Erro ao cancelar a reserva');
    }
  });

  // Function to cancel a booking
  const cancelBooking = (id: string) => {
    cancelBookingMutation.mutate(id);
  };

  return {
    bookings,
    isLoading,
    error,
    cancelBooking,
    isCancelling: cancelBookingMutation.isPending
  };
};

/**
 * Hook to create a new booking
 */
export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: (bookingData: CreateBookingDTO) => {
      return apiService.createBooking(bookingData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings', user?.id] });
      toast.success('Reserva criada com sucesso');
    },
    onError: (error) => {
      console.error('Error creating booking:', error);
      toast.error('Erro ao criar reserva');
    }
  });
};
