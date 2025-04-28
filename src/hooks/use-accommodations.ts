
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Accommodation } from '@/types/database';
import { accommodationService } from '@/services/accommodation-service';
import { withTimeout, debounce } from '@/utils/asyncUtils';
import { useUI } from '@/contexts/UIContext';

export const useAccommodations = () => {
  const queryClient = useQueryClient();
  const { showGlobalSpinner } = useUI();

  // Query para buscar hospedagens com timeout para prevenir UI blocking
  const { data: accommodations, isLoading, error, refetch } = useQuery({
    queryKey: ['accommodations'],
    queryFn: async () => {
      return await withTimeout(
        () => accommodationService.getAccommodations(),
        10000, // 10 seconds timeout
        []
      );
    },
  });

  // Mutation para excluir uma hospedagem com debounce e timeout
  const deleteAccommodationMutation = useMutation({
    mutationFn: async (accommodationId: number) => {
      showGlobalSpinner(true);
      try {
        // Modified return type to match what accommodationService.deleteAccommodation returns (void)
        await withTimeout(
          () => accommodationService.deleteAccommodation(accommodationId),
          8000 // 8 seconds timeout
        );
        return { success: true }; // Return value now handled properly
      } finally {
        showGlobalSpinner(false);
      }
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

  // Mutation para criar ou atualizar uma hospedagem com timeout
  const saveAccommodationMutation = useMutation({
    mutationFn: async (accommodation: Partial<Accommodation>) => {
      showGlobalSpinner(true);
      try {
        if (accommodation.id) {
          // Modified to properly handle types
          const result = await withTimeout(
            () => accommodationService.updateAccommodation(accommodation.id!, accommodation),
            12000 // 12 seconds timeout
          );
          return result;
        } else {
          // Modified to properly handle types
          const result = await withTimeout(
            () => accommodationService.createAccommodation(accommodation),
            12000 // 12 seconds timeout
          );
          return result;
        }
      } finally {
        showGlobalSpinner(false);
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

  // Debounce the delete operation to prevent multiple rapid calls
  const debouncedDeleteAccommodation = debounce((accommodationId: number) => {
    deleteAccommodationMutation.mutate(accommodationId);
  }, 300);

  // Debounce the save operations to prevent multiple rapid calls
  const debouncedCreateAccommodation = debounce((accommodation: Partial<Accommodation>) => {
    saveAccommodationMutation.mutate(accommodation);
  }, 300);

  const debouncedUpdateAccommodation = debounce((accommodation: Partial<Accommodation>) => {
    if (!accommodation.id) throw new Error('Accommodation ID is required for update');
    saveAccommodationMutation.mutate(accommodation);
  }, 300);

  // Public interface with debounced operations
  const deleteAccommodation = (accommodationId: number) => {
    debouncedDeleteAccommodation(accommodationId);
  };

  const createAccommodation = (accommodation: Partial<Accommodation>) => {
    debouncedCreateAccommodation(accommodation);
  };

  const updateAccommodation = (accommodation: Partial<Accommodation>) => {
    debouncedUpdateAccommodation(accommodation);
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

// Hook para detalhes de uma única hospedagem com timeout
export const useAccommodation = (accommodationId?: number) => {
  return useQuery({
    queryKey: ['accommodation', accommodationId],
    queryFn: async () => {
      if (!accommodationId) throw new Error('Accommodation ID is required');
      return await withTimeout(
        () => accommodationService.getAccommodationById(accommodationId),
        8000, // 8 seconds timeout
        null
      );
    },
    enabled: !!accommodationId,
  });
};

// Hook para gerenciar disponibilidade de hospedagens com timeout
export const useAccommodationAvailability = (accommodationId?: number) => {
  const queryClient = useQueryClient();
  const { showGlobalSpinner } = useUI();

  // Consulta para obter a disponibilidade de uma hospedagem
  const availabilityQuery = useQuery({
    queryKey: ['accommodation-availability', accommodationId],
    queryFn: async () => {
      if (!accommodationId) throw new Error('Accommodation ID is required');
      return await withTimeout(
        () => accommodationService.getAccommodationAvailability(accommodationId),
        8000, // 8 seconds timeout
        []
      );
    },
    enabled: !!accommodationId,
  });

  // Mutation para atualizar a disponibilidade de uma hospedagem
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
        null
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

  // Mutation para atualizar a disponibilidade de uma hospedagem em lote com UI feedback
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
          15000, // 15 seconds timeout since this could be a larger operation
          null
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

  // Debounce the bulk update operation
  const debouncedUpdateBulkAvailability = debounce(({
    dates,
    customPrice,
    status
  }: {
    dates: Date[];
    customPrice?: number;
    status?: 'available' | 'unavailable';
  }) => {
    updateBulkAvailabilityMutation.mutate({ dates, customPrice, status });
  }, 300);

  return {
    availability: availabilityQuery.data,
    isLoading: availabilityQuery.isLoading,
    error: availabilityQuery.error,
    updateAvailability: updateAvailabilityMutation.mutate,
    updateBulkAvailability: debouncedUpdateBulkAvailability,
    isUpdating: updateAvailabilityMutation.isPending || updateBulkAvailabilityMutation.isPending
  };
};
