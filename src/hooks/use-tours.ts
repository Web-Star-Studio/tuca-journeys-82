
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Tour } from '@/types/database';
import { tourService } from '@/services/tour-service';
import { debounce } from '@/utils/asyncUtils';

// Standard debounce duration
const DEBOUNCE_MS = 300;

export const useTours = () => {
  const queryClient = useQueryClient();

  // Query para buscar todos os passeios
  const { 
    data: tours, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['tours'],
    queryFn: async () => {
      return await tourService.getTours();
    },
    staleTime: 1000 * 60 * 5, // Cache por 5 minutos
    refetchOnWindowFocus: false,
  });

  // Query para buscar passeios em destaque
  const { 
    data: featuredTours, 
    isLoading: isFeaturedLoading 
  } = useQuery({
    queryKey: ['tours', 'featured'],
    queryFn: async () => {
      return await tourService.getFeaturedTours();
    },
    staleTime: 1000 * 60 * 5, // Cache por 5 minutos
    refetchOnWindowFocus: false,
  });

  // Mutation para excluir um passeio com debounce
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

  // Mutation para criar ou atualizar um passeio com otimizações
  const saveTourMutation = useMutation({
    mutationFn: async (tour: Partial<Tour>) => {
      if (tour.id) {
        return await tourService.updateTour(tour.id, tour);
      } else {
        return await tourService.createTour(tour);
      }
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

  // Mutation para alternar o status de destaque
  const toggleFeaturedMutation = useMutation({
    mutationFn: async ({ tourId, isFeatured }: { tourId: number, isFeatured: boolean }) => {
      return await tourService.toggleTourFeatured(tourId, isFeatured);
    },
    onSuccess: () => {
      toast.success('Status de destaque alterado com sucesso');
      queryClient.invalidateQueries({ queryKey: ['tours'] });
      queryClient.invalidateQueries({ queryKey: ['tours', 'featured'] });
    },
    onError: (error) => {
      toast.error('Erro ao alterar status de destaque');
      console.error('Error toggling featured status:', error);
    }
  });

  // Mutation para alternar o status de ativação
  const toggleActiveMutation = useMutation({
    mutationFn: async ({ tourId, isActive }: { tourId: number, isActive: boolean }) => {
      return await tourService.toggleTourActive(tourId, isActive);
    },
    onSuccess: () => {
      toast.success('Status de ativação alterado com sucesso');
      queryClient.invalidateQueries({ queryKey: ['tours'] });
    },
    onError: (error) => {
      toast.error('Erro ao alterar status de ativação');
      console.error('Error toggling active status:', error);
    }
  });

  // Versão com debounce para cada operação
  const debouncedDeleteTour = debounce((tourId: number) => {
    return deleteTourMutation.mutateAsync(tourId);
  }, DEBOUNCE_MS);

  const debouncedSaveTour = debounce((tour: Partial<Tour>) => {
    return saveTourMutation.mutateAsync(tour);
  }, DEBOUNCE_MS);

  const debouncedToggleFeatured = debounce(({ tourId, isFeatured }: { tourId: number, isFeatured: boolean }) => {
    return toggleFeaturedMutation.mutateAsync({ tourId, isFeatured });
  }, DEBOUNCE_MS);

  const debouncedToggleActive = debounce(({ tourId, isActive }: { tourId: number, isActive: boolean }) => {
    return toggleActiveMutation.mutateAsync({ tourId, isActive });
  }, DEBOUNCE_MS);

  // Otimização do getTourById para evitar buscar toda a lista de passeios
  const getTourById = async (id?: number): Promise<Tour | null> => {
    if (!id) return null;
    
    // Primeiro verifica se o tour já está no cache
    if (tours) {
      const cachedTour = tours.find(tour => tour.id === id);
      if (cachedTour) return cachedTour;
    }
    
    try {
      return await tourService.getTourById(id);
    } catch (error) {
      console.error(`Failed to get tour by ID: ${id}`, error);
      return null;
    }
  };

  return {
    tours,
    featuredTours,
    isLoading,
    isFeaturedLoading,
    error,
    deleteTour: debouncedDeleteTour,
    saveTour: debouncedSaveTour,
    toggleTourFeatured: debouncedToggleFeatured,
    toggleTourActive: debouncedToggleActive,
    getTourById,
    refetch,
    isDeleting: deleteTourMutation.isPending,
    isSaving: saveTourMutation.isPending,
  };
};

// Hook para detalhes de um único passeio com otimizações
export const useTour = (tourId?: number) => {
  return useQuery({
    queryKey: ['tour', tourId],
    queryFn: async () => {
      if (!tourId) throw new Error('Tour ID is required');
      return await tourService.getTourById(tourId);
    },
    enabled: !!tourId,
    staleTime: 1000 * 60 * 2, // Cache por 2 minutos
    refetchOnWindowFocus: false,
  });
};

// Search hook for tours
export const useSearchTours = (query: string) => {
  return useQuery({
    queryKey: ['tours', 'search', query],
    queryFn: async () => {
      return await tourService.searchTours(query);
    },
    enabled: !!query,
    staleTime: 1000 * 60, // Cache for 1 minute
    refetchOnWindowFocus: false,
  });
};

// Hook para gerenciar disponibilidade de passeios com debounce
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
    staleTime: 1000 * 60 * 5, // Cache por 5 minutos
    refetchOnWindowFocus: false,
  });

  // Mutation para atualizar a disponibilidade com debounce
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

  // Versão com debounce para updateAvailability
  const debouncedUpdateAvailability = debounce((params: {
    date: Date;
    availableSpots: number;
    customPrice?: number;
    status?: 'available' | 'unavailable';
  }) => {
    return updateAvailabilityMutation.mutateAsync(params);
  }, DEBOUNCE_MS);

  // Mutation para atualizar a disponibilidade em lote
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

  // Versão com debounce para updateBulkAvailability
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
