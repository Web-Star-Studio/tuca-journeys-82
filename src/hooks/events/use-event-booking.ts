
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { eventService } from '@/services/event-service';
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

/**
 * Hook for booking event tickets
 */
export const useEventBooking = () => {
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false);

  const mutation = useMutation({
    mutationFn: async ({ 
      eventId, 
      userId, 
      ticketCount, 
      attendeeInfo 
    }: { 
      eventId: number; 
      userId: string; 
      ticketCount: number; 
      attendeeInfo: any 
    }) => {
      setIsProcessing(true);
      try {
        const result = await eventService.bookEventTickets(eventId, userId, ticketCount, attendeeInfo);
        return result;
      } finally {
        setIsProcessing(false);
      }
    },
    onSuccess: (data, variables) => {
      toast.success("Ingressos reservados com sucesso!");
      queryClient.invalidateQueries({ queryKey: ['events', variables.eventId] });
      queryClient.invalidateQueries({ queryKey: ['events', 'bookings', variables.userId] });
    },
    onError: (error) => {
      console.error('Error booking tickets:', error);
      toast.error(error instanceof Error ? error.message : 'Falha ao reservar ingressos');
    }
  });

  return {
    bookTickets: mutation.mutate,
    isLoading: isProcessing || mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error
  };
};

/**
 * Hook for retrieving user's event bookings
 */
export const useUserEventBookings = (userId?: string) => {
  return useQuery({
    queryKey: ['events', 'bookings', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('event_bookings')
        .select(`
          *,
          events:event_id (*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Error fetching user event bookings:', error);
        throw error;
      }
      
      return data;
    },
    enabled: !!userId,
  });
};
