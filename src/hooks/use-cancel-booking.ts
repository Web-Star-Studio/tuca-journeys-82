
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingService } from '@/services';
import { toast } from 'sonner';

/**
 * Hook for cancelling a booking
 */
export const useCancelBooking = () => {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (bookingId: string) => {
      return bookingService.cancelBooking(bookingId);
    },
    onSuccess: (data) => {
      toast.success('Reserva cancelada com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.setQueryData(['booking', data.id], data);
    },
    onError: (error: any) => {
      toast.error(`Erro ao cancelar reserva: ${error.message}`);
    }
  });
  
  return {
    cancelBooking: mutation.mutate,
    isCancelling: mutation.isPending,
    ...mutation
  };
};
