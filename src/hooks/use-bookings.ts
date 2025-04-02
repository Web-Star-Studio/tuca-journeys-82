
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
      return getUserBookings(user.id);
    },
    enabled: !!user?.id,
    onError: (error: Error) => {
      toast({
        title: "Erro ao carregar reservas",
        description: error.message,
        variant: "destructive",
      });
    }
  });
};

export const useCreateBooking = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (bookingData: Omit<Booking, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      if (!user?.id) throw new Error("Usuário não autenticado");
      
      const booking = {
        ...bookingData,
        user_id: user.id,
      };
      
      return createBooking(booking);
    },
    onSuccess: () => {
      toast({
        title: "Reserva criada",
        description: "Sua reserva foi criada com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao criar reserva",
        description: error.message,
        variant: "destructive",
      });
    }
  });
};
