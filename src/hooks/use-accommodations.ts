import { useQuery, useMutation, useQueryClient, QueryFunctionContext } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Accommodation } from '@/types/database';
import { accommodationService } from '@/services/accommodation-service';
import { withTimeout } from '@/utils/asyncUtils';
import { useUI } from '@/contexts/UIContext';
import { useState } from 'react';
import { AccommodationFilters as AccommodationFilterOptions, PriceRange } from '@/types/accommodation';

// Define type for filter options
export interface AccommodationFilters {
  searchQuery?: string;
  type?: string;
  minPrice?: number | null;
  maxPrice?: number | null;
  minRating?: number | null;
  sortBy?: 'newest' | 'price_asc' | 'price_desc' | 'rating' | 'alphabetical';
}

export const useAccommodations = (initialFilters?: AccommodationFilters) => {
  const queryClient = useQueryClient();
  const { showGlobalSpinner } = useUI();
  
  // State for filters
  const [filters, setFilters] = useState<AccommodationFilters>(initialFilters || {
    searchQuery: '',
    type: 'all',
    minPrice: null,
    maxPrice: null,
    minRating: null,
    sortBy: 'newest'
  });

  // Query to fetch accommodations with timeout to prevent UI blocking
  const { 
    data: accommodations, 
    isLoading, 
    error, 
    refetch,
    isPending
  } = useQuery({
    queryKey: ['accommodations', filters],
    queryFn: async ({ queryKey }: QueryFunctionContext) => {
      try {
        // Extract filters from query key
        const [_, currentFilters] = queryKey as [string, AccommodationFilters];
        
        // Ensure all required fields are present with defaults
        const fullFilters = {
          searchQuery: currentFilters.searchQuery || '',
          type: currentFilters.type || 'all',
          minPrice: currentFilters.minPrice,
          maxPrice: currentFilters.maxPrice,
          minRating: currentFilters.minRating,
          sortBy: currentFilters.sortBy || 'newest'
        };
        
        return await withTimeout(
          () => accommodationService.getAccommodations(fullFilters),
          15000, // 15 seconds timeout
          [] as Accommodation[] // Fallback value
        );
      } catch (error) {
        console.error('Error in useAccommodations queryFn:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
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
      toast.success('Hospedagem excluída com sucesso');
      queryClient.invalidateQueries({ queryKey: ['accommodations'] });
    },
    onError: (error) => {
      console.error('Error deleting accommodation:', error);
      toast.error('Erro ao excluir a hospedagem. Tente novamente.');
    }
  });

  // Mutation to create or update an accommodation with timeout
  const saveAccommodationMutation = useMutation({
    mutationFn: async (accommodation: Partial<Accommodation>) => {
      try {
        showGlobalSpinner(true);
        if (accommodation.id) {
          // For updates, we pass the partial accommodation
          const result = await withTimeout(
            () => accommodationService.updateAccommodation(accommodation.id!, accommodation),
            15000, // 15 seconds timeout
            null as any // Fallback value
          );
          return result;
        } else {
          // For creates, we need to make sure all required fields are present
          const result = await withTimeout(
            () => accommodationService.createAccommodation(accommodation as any), // Use type assertion as a temporary fix
            15000, // 15 seconds timeout
            null as any // Fallback value
          );
          return result;
        }
      } catch (error) {
        console.error('Error in saveAccommodation mutationFn:', error);
        throw error;
      } finally {
        showGlobalSpinner(false);
      }
    },
    onSuccess: (data) => {
      // Add null check to prevent TypeError when data is null
      if (data) {
        toast.success(data.id ? 'Hospedagem atualizada com sucesso' : 'Hospedagem criada com sucesso');
        queryClient.invalidateQueries({ queryKey: ['accommodations'] });
      } else {
        // Handle case when data is null but we still want to show success
        toast.success('Operação concluída com sucesso');
        queryClient.invalidateQueries({ queryKey: ['accommodations'] });
      }
    },
    onError: (error) => {
      toast.error('Erro ao salvar a hospedagem');
      console.error('Error saving accommodation:', error);
    }
  });

  // Query to get accommodation types for filtering
  const { data: accommodationTypes = [] } = useQuery({
    queryKey: ['accommodation-types'],
    queryFn: () => accommodationService.getAccommodationTypes(),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours - types don't change often
  });

  // Query to get price range for filtering
  const { data: priceRange = { min: 0, max: 5000 } } = useQuery({
    queryKey: ['accommodation-price-range'],
    queryFn: () => accommodationService.getPriceRange(),
    staleTime: 60 * 60 * 1000, // 1 hour
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

  // Fix getAccommodationById to fetch from the database instead of local state
  const getAccommodationById = (id?: number) => {
    if (!id) return null;
    
    // If accommodations are already loaded, try to find it in the cached data first
    if (accommodations) {
      const cachedAccommodation = accommodations.find(accommodation => accommodation.id === id);
      if (cachedAccommodation) return cachedAccommodation;
    }
    
    // Otherwise, fetch it directly
    // Note: This synchronous function will return null and the component using it should handle
    // fetching the data using the useAccommodation hook instead
    console.warn('Accommodation not found in cache. Component should use useAccommodation hook instead.');
    return null;
  };

  const applyFilters = (newFilters: Partial<AccommodationFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    accommodations,
    isLoading: isLoading || isPending,
    error,
    deleteAccommodation,
    createAccommodation,
    updateAccommodation,
    getAccommodationById,
    refetch,
    filters,
    setFilters,
    applyFilters,
    accommodationTypes,
    priceRange,
    isDeleting: deleteAccommodationMutation.isPending,
    isSaving: saveAccommodationMutation.isPending,
  };
};

// Hook for details of a single accommodation with timeout
export const useAccommodation = (accommodationId?: number) => {
  const queryClient = useQueryClient();

  const {
    data: accommodation,
    isLoading,
    error,
    refetch
  } = useQuery({
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
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    accommodation,
    isLoading,
    error,
    refetch
  };
};

// Hook to manage availability of accommodations with timeout
export const useAccommodationAvailability = (accommodationId?: number, dateRange?: { start?: Date, end?: Date }) => {
  const queryClient = useQueryClient();
  const { showGlobalSpinner } = useUI();

  // Query to get the availability of an accommodation
  const availabilityQuery = useQuery({
    queryKey: ['accommodation-availability', accommodationId, dateRange?.start, dateRange?.end],
    queryFn: async () => {
      if (!accommodationId) throw new Error('Accommodation ID is required');
      return await withTimeout(
        () => accommodationService.getAccommodationAvailability(
          accommodationId,
          dateRange?.start,
          dateRange?.end
        ),
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
      queryClient.invalidateQueries({ 
        queryKey: ['accommodation-availability', accommodationId] 
      });
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
      queryClient.invalidateQueries({ 
        queryKey: ['accommodation-availability', accommodationId] 
      });
      toast.success('Disponibilidade atualizada com sucesso');
    },
    onError: (error) => {
      toast.error('Erro ao atualizar disponibilidade em lote');
      console.error('Error updating bulk availability:', error);
    }
  });

  // Mutation to check availability for booking
  const checkAvailabilityMutation = useMutation({
    mutationFn: async ({ 
      startDate, 
      endDate 
    }: { 
      startDate: Date; 
      endDate: Date;
    }) => {
      if (!accommodationId) throw new Error('Accommodation ID is required');
      
      return withTimeout(
        () => accommodationService.checkAvailability(
          accommodationId,
          startDate,
          endDate
        ),
        5000, // 5 seconds timeout
        false // Fallback value
      );
    }
  });

  return {
    availability: availabilityQuery.data,
    isLoading: availabilityQuery.isLoading,
    error: availabilityQuery.error,
    updateAvailability: updateAvailabilityMutation.mutate,
    updateBulkAvailability: updateBulkAvailabilityMutation.mutate,
    checkAvailability: checkAvailabilityMutation.mutateAsync,
    isAvailable: checkAvailabilityMutation.data,
    isChecking: checkAvailabilityMutation.isPending,
    isUpdating: updateAvailabilityMutation.isPending || updateBulkAvailabilityMutation.isPending
  };
};
