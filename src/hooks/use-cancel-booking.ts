
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

/**
 * Hook for cancelling a booking - using demo data
 */
export const useCancelBooking = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: async (bookingId: string) => {
      if (!user) throw new Error('User not authenticated');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Cancelling booking:', bookingId);
      
      // In a real app, this would make an API call to cancel the booking
      // For demo purposes, we'll just return success
      return { success: true };
    },
    onSuccess: (_, bookingId) => {
      // Invalidate and refetch to update the UI with mock data
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['booking', bookingId] });
      toast.success('Reserva cancelada com sucesso');
    },
    onError: (error) => {
      console.error('Error cancelling booking:', error);
      toast.error('Erro ao cancelar a reserva');
    }
  });

  return {
    cancelBooking: (id: string) => mutation.mutate(id),
    isCancelling: mutation.isPending
  };
};

