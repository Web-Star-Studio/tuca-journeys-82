
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Booking } from '@/types/bookings';
import { Booking as DatabaseBooking } from '@/types/database';
import { toast } from 'sonner';

export const useBookings = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  // Fetch user's bookings
  const { data: bookings, isLoading, error } = useQuery({
    queryKey: ['bookings', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            tours(*),
            accommodations(*)
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error('Error fetching bookings:', error);
        throw error;
      }
    },
    enabled: !!user,
  });

  // Cancel booking mutation
  const cancelBookingMutation = useMutation({
    mutationFn: async (bookingId: number) => {
      const { data, error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId)
        .eq('user_id', user?.id)
        .select()
        .single();
        
      if (error) throw error;
      return data;
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

  return {
    bookings,
    isLoading,
    error,
    cancelBooking: (id: number) => cancelBookingMutation.mutate(id)
  };
};

// Add the missing useCreateBooking hook
export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: (bookingData: Omit<DatabaseBooking, 'id' | 'created_at' | 'updated_at'>) => {
      return createBooking(bookingData);
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

// Helper function to create a booking
const createBooking = async (booking: Omit<DatabaseBooking, 'id' | 'created_at' | 'updated_at'>) => {
  console.log("Creating booking:", booking);
  const { data, error } = await supabase
    .from('bookings')
    .insert([booking])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};
