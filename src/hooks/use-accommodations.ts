
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Accommodation } from '@/types/database';
import { accommodationService } from '@/services/accommodation-service';

export const useAccommodations = () => {
  const queryClient = useQueryClient();

  // Query para buscar hospedagens
  const { data: accommodations, isLoading, error, refetch } = useQuery({
    queryKey: ['accommodations'],
    queryFn: async () => {
      return await accommodationService.getAccommodations();
    },
  });

  // Mutation para excluir uma hospedagem
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

  // Mutation para criar ou atualizar uma hospedagem
  const saveAccommodationMutation = useMutation({
    mutationFn: async (accommodation: Partial<Accommodation>) => {
      if (accommodation.id) {
        await accommodationService.updateAccommodation(accommodation.id, accommodation);
      } else {
        await accommodationService.createAccommodation(accommodation);
      }
      return { success: true };
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

  const deleteAccommodation = (accommodationId: number) => {
    deleteAccommodationMutation.mutate(accommodationId);
  };

  const createAccommodation = (accommodation: Partial<Accommodation>) => {
    saveAccommodationMutation.mutate(accommodation);
  };

  const updateAccommodation = (accommodation: Partial<Accommodation>) => {
    if (!accommodation.id) throw new Error('Accommodation ID is required for update');
    saveAccommodationMutation.mutate(accommodation);
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

// Hook para detalhes de uma única hospedagem
export const useAccommodation = (accommodationId?: number) => {
  return useQuery({
    queryKey: ['accommodation', accommodationId],
    queryFn: async () => {
      if (!accommodationId) throw new Error('Accommodation ID is required');
      return await accommodationService.getAccommodationById(accommodationId);
    },
    enabled: !!accommodationId,
  });
};

// Hook para gerenciar disponibilidade de hospedagens
export const useAccommodationAvailability = (accommodationId?: number) => {
  const queryClient = useQueryClient();

  // Consulta para obter a disponibilidade de uma hospedagem
  const availabilityQuery = useQuery({
    queryKey: ['accommodation-availability', accommodationId],
    queryFn: () => {
      if (!accommodationId) throw new Error('Accommodation ID is required');
      return accommodationService.getAccommodationAvailability(accommodationId);
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
      return accommodationService.updateAccommodationAvailability(
        accommodationId,
        date,
        customPrice,
        status
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

  // Mutation para atualizar a disponibilidade de uma hospedagem em lote
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
      return accommodationService.setBulkAccommodationAvailability(
        accommodationId,
        dates,
        customPrice,
        status
      );
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
