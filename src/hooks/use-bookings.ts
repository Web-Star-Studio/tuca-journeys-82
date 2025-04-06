
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { demoData } from '@/utils/demoDataGenerator';

export const useBookings = () => {
  // Query to fetch bookings
  const { data: bookings, isLoading, error, refetch } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      // In a real app, we'd fetch from an API
      // For demo purposes, return our generated bookings
      return demoData.bookings;
    },
  });

  // Mutation to delete a booking
  const deleteBookingMutation = useMutation({
    mutationFn: async (bookingId: string) => {
      // In a real app, we'd call an API
      console.log(`Deleting booking: ${bookingId}`);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    },
    onSuccess: () => {
      toast.success('Reserva cancelada com sucesso');
      refetch();
    },
    onError: (error) => {
      toast.error('Erro ao cancelar a reserva');
      console.error('Error deleting booking:', error);
    }
  });

  const cancelBooking = (bookingId: string) => {
    deleteBookingMutation.mutate(bookingId);
  };

  return {
    bookings,
    isLoading,
    error,
    cancelBooking,
    refetch
  };
};
