
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserBookings, createBooking } from '@/lib/api';
import { useToast } from './use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Booking } from '@/types/database';

export const useUserBookings = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  return useQuery({
    queryKey: ['bookings', user?.id],
    queryFn: () => {
      if (!user?.id) throw new Error("Usuário não autenticado");
      console.log("Fetching bookings for user:", user.id);
      return getUserBookings(user.id);
    },
    enabled: !!user?.id,
    retry: 1,
    meta: {
      onError: (error: Error) => {
        console.error("Error in useUserBookings:", error);
        toast({
          title: "Erro ao carregar reservas",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  });
};

export const useCreateBooking = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingData: Omit<Booking, 'id' | 'created_at' | 'updated_at'>) => {
      console.log("Creating booking with data:", bookingData);
      return createBooking(bookingData);
    },
    onSuccess: () => {
      toast({
        title: "Reserva criada",
        description: "Sua reserva foi criada com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (error: Error) => {
      console.error("Error in useCreateBooking:", error);
      toast({
        title: "Erro ao criar reserva",
        description: error.message,
        variant: "destructive",
      });
    }
  });
};
