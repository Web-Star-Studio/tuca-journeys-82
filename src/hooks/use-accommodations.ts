
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Accommodation } from '@/types/database';
import { accommodationService } from '@/services/accommodation-service';
import { withTimeout, debounce } from '@/utils/asyncUtils';
import { useUI } from '@/contexts/UIContext';

export const useAccommodations = () => {
  const queryClient = useQueryClient();
  const { showGlobalSpinner } = useUI();

  // Query to fetch accommodations with timeout to prevent UI blocking
  const { data: accommodations, isLoading, error, refetch } = useQuery({
    queryKey: ['accommodations'],
    queryFn: async () => {
      try {
        return await withTimeout(
          () => accommodationService.getAccommodations(),
          15000, // 15 seconds timeout
          [] as Accommodation[] // Fallback value
        );
      } catch (error) {
        console.error('Error in useAccommodations queryFn:', error);
        throw error;
      }
    },
  });

  // Mutation to delete an accommodation with debounce and timeout
  const deleteAccommodationMutation = useMutation({
    mutationFn: async (accommodationId: number) => {
      try {
        await withTimeout(
          () => accommodationService.deleteAccommodation(accommodationId),
          15000, // 15 seconds timeout
          undefined // Fallback value needs to be void/undefined, not boolean
        );
        return { success: true };
      } catch (error) {
        console.error('Error in deleteAccommodation mutationFn:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accommodations'] });
    },
    onError: (error) => {
      console.error('Error deleting accommodation:', error);
    }
  });

  // Mutation to create or update an accommodation with timeout
  const saveAccommodationMutation = useMutation({
    mutationFn: async (accommodation: Partial<Accommodation>) => {
      try {
        if (accommodation.id) {
          const result = await withTimeout(
            () => accommodationService.updateAccommodation(accommodation.id!, accommodation),
            15000, // 15 seconds timeout
            null as any // Fallback value
          );
          return result;
        } else {
          const result = await withTimeout(
            () => accommodationService.createAccommodation(accommodation),
            15000, // 15 seconds timeout
            null as any // Fallback value
          );
          return result;
        }
      } catch (error) {
        console.error('Error in saveAccommodation mutationFn:', error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success('Hospedagem salva com sucesso');
      queryClient.invalidateQueries({ queryKey: ['accommodations'] });
    },
    onError: (error) => {
      toast.error('Erro ao salvar a hospedagem');
      console.error('Error saving accommodation:', error);
    }
  });

  // Public interface
  const deleteAccommodation = (accommodationId: number) => {
    return deleteAccommodationMutation.mutateAsync(accommodationId);
  };

  const createAccommodation = (accommodation: Partial<Accommodation>) => {
    return saveAccommodationMutation.mutateAsync(accommodation);
  };

  const updateAccommodation = (accommodation: Partial<Accommodation>) => {
    if (!accommodation.id) throw new Error('Accommodation ID is required for update');
    return saveAccommodationMutation.mutateAsync(accommodation);
  };

  const getAccommodationById = (id?: number) => {
    if (!id || !accommodations) return null;
    return accommodations.find(accommodation => accommodation.id === id) || null;
  };

  return {
    accommodations,
    isLoading,
    error,
    deleteAccommodation,
    createAccommodation,
    updateAccommodation,
    getAccommodationById,
    refetch
  };
};

// Hook for details of a single accommodation with timeout
export const useAccommodation = (accommodationId?: number) => {
  return useQuery({
    queryKey: ['accommodation', accommodationId],
    queryFn: async () => {
      if (!accommodationId) throw new Error('Accommodation ID is required');
      return await withTimeout(
        () => accommodationService.getAccommodationById(accommodationId),
        15000, // 15 seconds timeout
        null // Fallback value
      );
    },
    enabled: !!accommodationId,
  });
};

// Hook to manage availability of accommodations with timeout
export const useAccommodationAvailability = (accommodationId?: number) => {
  const queryClient = useQueryClient();
  const { showGlobalSpinner } = useUI();

  // Query to get the availability of an accommodation
  const availabilityQuery = useQuery({
    queryKey: ['accommodation-availability', accommodationId],
    queryFn: async () => {
      if (!accommodationId) throw new Error('Accommodation ID is required');
      return await withTimeout(
        () => accommodationService.getAccommodationAvailability(accommodationId),
        8000, // 8 seconds timeout
        [] // Fallback value
      );
    },
    enabled: !!accommodationId,
  });

  // Mutation to update the availability of an accommodation
  const updateAvailabilityMutation = useMutation({
    mutationFn: async ({
      date,
      customPrice,
      status
    }: {
      date: Date;
      customPrice?: number;
      status?: 'available' | 'unavailable';
    }) => {
      if (!accommodationId) throw new Error('Accommodation ID is required');
      
      return withTimeout(
        () => accommodationService.updateAccommodationAvailability(
          accommodationId,
          date,
          customPrice,
          status
        ),
        5000, // 5 seconds timeout
        null // Fallback value
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accommodation-availability', accommodationId] });
    },
    onError: (error) => {
      toast.error('Erro ao atualizar disponibilidade');
      console.error('Error updating availability:', error);
    }
  });

  // Mutation to update the availability of an accommodation in batch with UI feedback
  const updateBulkAvailabilityMutation = useMutation({
    mutationFn: async ({
      dates,
      customPrice,
      status
    }: {
      dates: Date[];
      customPrice?: number;
      status?: 'available' | 'unavailable';
    }) => {
      if (!accommodationId) throw new Error('Accommodation ID is required');
      showGlobalSpinner(true);
      try {
        return await withTimeout(
          () => accommodationService.setBulkAccommodationAvailability(
            accommodationId,
            dates,
            customPrice,
            status
          ),
          15000, // 15 seconds timeout
          null // Fallback value
        );
      } finally {
        showGlobalSpinner(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accommodation-availability', accommodationId] });
      toast.success('Disponibilidade atualizada com sucesso');
    },
    onError: (error) => {
      toast.error('Erro ao atualizar disponibilidade em lote');
      console.error('Error updating bulk availability:', error);
    }
  });

  return {
    availability: availabilityQuery.data,
    isLoading: availabilityQuery.isLoading,
    error: availabilityQuery.error,
    updateAvailability: updateAvailabilityMutation.mutate,
    updateBulkAvailability: updateBulkAvailabilityMutation.mutate,
    isUpdating: updateAvailabilityMutation.isPending || updateBulkAvailabilityMutation.isPending
  };
};
