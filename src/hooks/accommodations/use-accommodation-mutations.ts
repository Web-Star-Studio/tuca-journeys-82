
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { accommodationService } from '@/services/accommodation-service';
import { Accommodation } from '@/types/database';

/**
 * Hook for accommodation mutations (create, update, delete)
 */
export const useAccommodationMutations = () => {
  const queryClient = useQueryClient();
  
  // Create accommodation mutation
  const { mutateAsync: createAccommodation, isPending: isCreating } = useMutation({
    mutationFn: (accommodation: Partial<Accommodation>) => 
      accommodationService.createAccommodation(accommodation),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accommodations'] });
      queryClient.invalidateQueries({ queryKey: ['accommodations', 'featured'] });
    },
  });
  
  // Update accommodation mutation
  const { mutateAsync: updateAccommodation, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Accommodation> }) => 
      accommodationService.updateAccommodation(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accommodations'] });
      queryClient.invalidateQueries({ queryKey: ['accommodations', 'featured'] });
    },
  });
  
  // Delete accommodation mutation
  const { mutateAsync: deleteAccommodation, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => accommodationService.deleteAccommodation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accommodations'] });
      queryClient.invalidateQueries({ queryKey: ['accommodations', 'featured'] });
    },
  });
  
  // Toggle featured status
  const { mutateAsync: toggleFeatured, isPending: isTogglingFeatured } = useMutation({
    mutationFn: ({ id, isFeatured }: { id: number; isFeatured: boolean }) => 
      accommodationService.toggleAccommodationFeatured(id, isFeatured),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accommodations'] });
      queryClient.invalidateQueries({ queryKey: ['accommodations', 'featured'] });
    },
  });
  
  return {
    createAccommodation,
    updateAccommodation,
    deleteAccommodation,
    toggleFeatured,
    isCreating,
    isUpdating,
    isDeleting,
    isTogglingFeatured,
    isSaving: isCreating || isUpdating,
  };
};
