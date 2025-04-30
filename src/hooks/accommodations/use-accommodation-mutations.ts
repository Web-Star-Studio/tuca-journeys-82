
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Accommodation } from '@/types/database';
import { accommodationService } from '@/services/accommodation-service';
import { debounce } from '@/utils/asyncUtils';

// Standard debounce duration
const DEBOUNCE_MS = 300;

/**
 * Hook for accommodation mutation operations (create, update, delete, toggle featured)
 */
export const useAccommodationMutations = () => {
  const queryClient = useQueryClient();

  // Mutation for deleting an accommodation
  const deleteAccommodationMutation = useMutation({
    mutationFn: async (accommodationId: number) => {
      await accommodationService.deleteAccommodation(accommodationId);
      return { success: true };
    },
    onSuccess: () => {
      toast.success('Hospedagem excluída com sucesso');
      queryClient.invalidateQueries({ queryKey: ['accommodations'] });
    },
    onError: (error) => {
      toast.error('Erro ao excluir a hospedagem');
      console.error('Error deleting accommodation:', error);
    }
  });

  // Mutation for creating or updating an accommodation
  const saveAccommodationMutation = useMutation({
    mutationFn: async (accommodation: Partial<Accommodation>) => {
      if (accommodation.id) {
        return await accommodationService.updateAccommodation(accommodation.id, accommodation);
      } else {
        return await accommodationService.createAccommodation(accommodation);
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

  // Mutation for toggling featured status
  const toggleFeaturedMutation = useMutation({
    mutationFn: async ({ accommodationId, isFeatured }: { accommodationId: number, isFeatured: boolean }) => {
      return await accommodationService.toggleAccommodationFeatured(accommodationId, isFeatured);
    },
    onSuccess: () => {
      toast.success('Status de destaque alterado com sucesso');
      queryClient.invalidateQueries({ queryKey: ['accommodations'] });
      queryClient.invalidateQueries({ queryKey: ['accommodations', 'featured'] });
    },
    onError: (error) => {
      toast.error('Erro ao alterar status de destaque');
      console.error('Error toggling featured status:', error);
    }
  });

  // Debounced versions of the mutation functions
  const debouncedDeleteAccommodation = debounce((accommodationId: number) => {
    return deleteAccommodationMutation.mutateAsync(accommodationId);
  }, DEBOUNCE_MS);

  const debouncedSaveAccommodation = debounce((accommodation: Partial<Accommodation>) => {
    return saveAccommodationMutation.mutateAsync(accommodation);
  }, DEBOUNCE_MS);

  const debouncedToggleFeatured = debounce(({ accommodationId, isFeatured }: { accommodationId: number, isFeatured: boolean }) => {
    return toggleFeaturedMutation.mutateAsync({ accommodationId, isFeatured });
  }, DEBOUNCE_MS);

  return {
    deleteAccommodation: debouncedDeleteAccommodation,
    saveAccommodation: debouncedSaveAccommodation,
    toggleAccommodationFeatured: debouncedToggleFeatured,
    isDeleting: deleteAccommodationMutation.isPending,
    isSaving: saveAccommodationMutation.isPending,
  };
};
