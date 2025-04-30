
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Tour } from '@/types/database';
import { tourService } from '@/services/tour-service';
import { debounce } from '@/utils/asyncUtils';

// Standard debounce duration
const DEBOUNCE_MS = 300;

/**
 * Hook for basic tour operations (fetching all tours, featured tours, and getting a tour by ID)
 */
export const useToursBase = () => {
  const queryClient = useQueryClient();

  // Query for fetching all tours
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
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: false,
  });

  // Query for fetching featured tours
  const { 
    data: featuredTours, 
    isLoading: isFeaturedLoading 
  } = useQuery({
    queryKey: ['tours', 'featured'],
    queryFn: async () => {
      return await tourService.getFeaturedTours();
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: false,
  });

  // Optimization for getTourById to avoid fetching the entire tour list
  const getTourById = async (id?: number): Promise<Tour | null> => {
    if (!id) return null;
    
    // First check if the tour is already in the cache
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
    getTourById,
    refetch,
  };
};

// Hook for fetching a single tour with optimizations
export const useTour = (tourId?: number) => {
  return useQuery({
    queryKey: ['tour', tourId],
    queryFn: async () => {
      if (!tourId) throw new Error('Tour ID is required');
      return await tourService.getTourById(tourId);
    },
    enabled: !!tourId,
    staleTime: 1000 * 60 * 2, // Cache for 2 minutes
    refetchOnWindowFocus: false,
  });
};
