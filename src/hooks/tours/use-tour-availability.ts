
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { tourService } from '@/services/tour-service';
import { debounce } from '@/utils/asyncUtils';

// Standard debounce duration
const DEBOUNCE_MS = 300;

/**
 * Hook for managing tour availability
 */
export const useTourAvailability = (tourId?: number) => {
  const queryClient = useQueryClient();

  // Query for obtaining tour availability
  const availabilityQuery = useQuery({
    queryKey: ['tour-availability', tourId],
    queryFn: () => {
      if (!tourId) throw new Error('Tour ID is required');
      return tourService.getTourAvailability(tourId);
    },
    enabled: !!tourId,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: false,
  });

  // Mutation for updating availability
  const updateAvailabilityMutation = useMutation({
    mutationFn: async ({
      date,
      availableSpots,
      customPrice,
      status
    }: {
      date: Date;
      availableSpots: number;
      customPrice?: number;
      status?: 'available' | 'unavailable';
    }) => {
      if (!tourId) throw new Error('Tour ID is required');
      return tourService.updateTourAvailability(
        tourId,
        date,
        availableSpots,
        customPrice,
        status
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tour-availability', tourId] });
    },
    onError: (error) => {
      toast.error('Erro ao atualizar disponibilidade');
      console.error('Error updating availability:', error);
    }
  });

  // Debounced version for updateAvailability
  const debouncedUpdateAvailability = debounce((params: {
    date: Date;
    availableSpots: number;
    customPrice?: number;
    status?: 'available' | 'unavailable';
  }) => {
    return updateAvailabilityMutation.mutateAsync(params);
  }, DEBOUNCE_MS);

  // Mutation for updating availability in bulk
  const updateBulkAvailabilityMutation = useMutation({
    mutationFn: async ({
      dates,
      availableSpots,
      customPrice,
      status
    }: {
      dates: Date[];
      availableSpots: number;
      customPrice?: number;
      status?: 'available' | 'unavailable';
    }) => {
      if (!tourId) throw new Error('Tour ID is required');
      return tourService.setBulkTourAvailability(
        tourId,
        dates,
        availableSpots,
        customPrice,
        status
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tour-availability', tourId] });
      toast.success('Disponibilidade atualizada com sucesso');
    },
    onError: (error) => {
      toast.error('Erro ao atualizar disponibilidade em lote');
      console.error('Error updating bulk availability:', error);
    }
  });

  // Debounced version for updateBulkAvailability
  const debouncedUpdateBulkAvailability = debounce((params: {
    dates: Date[];
    availableSpots: number;
    customPrice?: number;
    status?: 'available' | 'unavailable';
  }) => {
    return updateBulkAvailabilityMutation.mutateAsync(params);
  }, DEBOUNCE_MS);

  return {
    availability: availabilityQuery.data,
    isLoading: availabilityQuery.isLoading,
    error: availabilityQuery.error,
    updateAvailability: (params: any) => debouncedUpdateAvailability(params),
    updateBulkAvailability: (params: any) => debouncedUpdateBulkAvailability(params),
    isUpdating: updateAvailabilityMutation.isPending || updateBulkAvailabilityMutation.isPending
  };
};
