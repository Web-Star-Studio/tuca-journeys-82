
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Tour } from '@/types/database';
import { tourService } from '@/services/tour-service';

export const useTours = () => {
  const queryClient = useQueryClient();

  // Query para buscar passeios
  const { data: tours, isLoading, error, refetch } = useQuery({
    queryKey: ['tours'],
    queryFn: async () => {
      return await tourService.getTours();
    },
  });

  // Mutation para excluir um passeio
  const deleteTourMutation = useMutation({
    mutationFn: async (tourId: number) => {
      await tourService.deleteTour(tourId);
      return { success: true };
    },
    onSuccess: () => {
      toast.success('Passeio excluído com sucesso');
      queryClient.invalidateQueries({ queryKey: ['tours'] });
    },
    onError: (error) => {
      toast.error('Erro ao excluir o passeio');
      console.error('Error deleting tour:', error);
    }
  });

  // Mutation para criar ou atualizar um passeio
  const saveTourMutation = useMutation({
    mutationFn: async (tour: Partial<Tour>) => {
      if (tour.id) {
        await tourService.updateTour(tour.id, tour);
      } else {
        await tourService.createTour(tour);
      }
      return { success: true };
    },
    onSuccess: () => {
      toast.success('Passeio salvo com sucesso');
      queryClient.invalidateQueries({ queryKey: ['tours'] });
    },
    onError: (error) => {
      toast.error('Erro ao salvar o passeio');
      console.error('Error saving tour:', error);
    }
  });

  const deleteTour = (tourId: number): Promise<void> => {
    return deleteTourMutation.mutateAsync(tourId).then(() => {});
  };

  const saveTour = (tour: Partial<Tour>): Promise<void> => {
    return saveTourMutation.mutateAsync(tour).then(() => {});
  };

  const getTourById = (id?: number): Tour | null => {
    if (!id || !tours) return null;
    return tours.find(tour => tour.id === id) || null;
  };

  return {
    tours,
    isLoading,
    error,
    deleteTour,
    saveTour,
    getTourById,
    refetch
  };
};

// Hook para detalhes de um único passeio
export const useTour = (tourId?: number) => {
  return useQuery({
    queryKey: ['tour', tourId],
    queryFn: async () => {
      if (!tourId) throw new Error('Tour ID is required');
      return await tourService.getTourById(tourId);
    },
    enabled: !!tourId,
  });
};

// Hook para gerenciar disponibilidade de passeios
export const useTourAvailability = (tourId?: number) => {
  const queryClient = useQueryClient();

  // Consulta para obter a disponibilidade de um passeio
  const availabilityQuery = useQuery({
    queryKey: ['tour-availability', tourId],
    queryFn: () => {
      if (!tourId) throw new Error('Tour ID is required');
      return tourService.getTourAvailability(tourId);
    },
    enabled: !!tourId,
  });

  // Mutation para atualizar a disponibilidade de um passeio
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

  // Mutation para atualizar a disponibilidade de um passeio em lote
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

  return {
    availability: availabilityQuery.data,
    isLoading: availabilityQuery.isLoading,
    error: availabilityQuery.error,
    updateAvailability: updateAvailabilityMutation.mutate,
    updateBulkAvailability: updateBulkAvailabilityMutation.mutate,
    isUpdating: updateAvailabilityMutation.isPending || updateBulkAvailabilityMutation.isPending
  };
};
