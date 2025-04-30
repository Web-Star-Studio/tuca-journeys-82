
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Tour } from '@/types/database';
import { tourService } from '@/services/tour-service';
import { debounce } from '@/utils/asyncUtils';

// Standard debounce duration
const DEBOUNCE_MS = 300;

/**
 * Hook for tour mutation operations (create, update, delete, toggle featured/active)
 */
export const useTourMutations = () => {
  const queryClient = useQueryClient();

  // Mutation for deleting a tour
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

  // Mutation for creating or updating a tour
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

  // Mutation for toggling featured status
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

  // Mutation for toggling active status
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

  // Debounced versions of the mutation functions
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

  return {
    deleteTour: debouncedDeleteTour,
    saveTour: debouncedSaveTour,
    toggleTourFeatured: debouncedToggleFeatured,
    toggleTourActive: debouncedToggleActive,
    isDeleting: deleteTourMutation.isPending,
    isSaving: saveTourMutation.isPending,
  };
};
