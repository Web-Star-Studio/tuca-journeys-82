
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { bookingService } from '@/services';
import { toast } from 'sonner';

/**
 * Hook for cancelling a booking
 * 
 * @returns Mutation for cancelling a booking
 */
export const useCancelBooking = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: async (bookingId: string) => {
      if (!user) throw new Error('User not authenticated');
      return await bookingService.cancelBooking(bookingId);
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

  const cancelBooking = (id: string) => {
    mutation.mutate(id);
  };

  return {
    cancelBooking,
    isCancelling: mutation.isPending
  };
};
