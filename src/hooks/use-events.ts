
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventService } from '@/services';
import { Event } from '@/types/event';
import { toast } from 'sonner';

/**
 * Hook for getting an event by ID
 */
export const useEvent = (id?: number) => {
  return useQuery({
    queryKey: ['event', id],
    queryFn: () => id ? eventService.getEventById(id) : null,
    enabled: !!id,
  });
};

/**
 * Hook for getting all events
 */
export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: () => eventService.getEvents(),
  });
};

/**
 * Hook for getting events by partner ID
 */
export const usePartnerEvents = (partnerId?: string) => {
  return useQuery({
    queryKey: ['events', 'partner', partnerId],
    queryFn: () => partnerId ? eventService.getEventsByPartnerId(partnerId) : [],
    enabled: !!partnerId,
  });
};

/**
 * Hook for creating an event
 */
export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (eventData: Omit<Event, 'id' | 'created_at' | 'updated_at'>) => {
      return eventService.createEvent(eventData);
    },
    onSuccess: (data) => {
      toast.success('Evento criado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['events', 'partner', data.partner_id] });
    },
    onError: (error: any) => {
      toast.error(`Erro ao criar evento: ${error.message}`);
    }
  });
};

/**
 * Hook for updating an event
 */
export const useUpdateEvent = (id?: number) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (eventData: Partial<Event>) => {
      if (!id) throw new Error('Event ID is required');
      return eventService.updateEvent(id, eventData);
    },
    onSuccess: (data) => {
      toast.success('Evento atualizado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['event', id] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['events', 'partner', data.partner_id] });
    },
    onError: (error: any) => {
      toast.error(`Erro ao atualizar evento: ${error.message}`);
    }
  });
};

/**
 * Hook for deleting an event
 */
export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (eventId: number) => {
      return eventService.deleteEvent(eventId);
    },
    onSuccess: () => {
      toast.success('Evento excluído com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: (error: any) => {
      toast.error(`Erro ao excluir evento: ${error.message}`);
    }
  });
};

/**
 * Hook for creating an event booking
 */
export const useCreateEventBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (bookingData: Omit<any, 'id' | 'created_at' | 'updated_at'>) => {
      return eventService.createEventBooking(bookingData);
    },
    onSuccess: () => {
      toast.success('Reserva para evento realizada com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (error: any) => {
      toast.error(`Erro ao reservar evento: ${error.message}`);
    }
  });
};
