
import { useQuery } from '@tanstack/react-query';
import { accommodationService } from '@/services/accommodation-service';
import { Accommodation } from '@/types/database';

/**
 * Hook for basic accommodation operations (fetching all accommodations, featured accommodations, and getting an accommodation by ID)
 */
export const useAccommodationsBase = () => {
  // Query for fetching all accommodations
  const { 
    data: accommodations, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['accommodations'],
    queryFn: async () => {
      return await accommodationService.getAccommodations({
        searchQuery: '',
        type: 'all',
        minPrice: null,
        maxPrice: null,
        minRating: null,
        sortBy: 'newest', // Changed from 'created_at' to 'newest' to match allowed values
        amenities: [],
        maxGuests: null
      });
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: false,
  });

  // Query for fetching featured accommodations
  const { 
    data: featuredAccommodations, 
    isLoading: isFeaturedLoading 
  } = useQuery({
    queryKey: ['accommodations', 'featured'],
    queryFn: async () => {
      return await accommodationService.getAccommodations({
        searchQuery: '',
        type: 'all',
        minPrice: null,
        maxPrice: null,
        minRating: 4,
        sortBy: 'rating',
        amenities: [],
        maxGuests: null
      });
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: false,
  });

  // Optimization for getAccommodationById to avoid fetching the entire accommodation list
  const getAccommodationById = async (id?: number): Promise<Accommodation | null> => {
    if (!id) return null;
    
    // First check if the accommodation is already in the cache
    if (accommodations) {
      const cachedAccommodation = accommodations.find(accommodation => accommodation.id === id);
      if (cachedAccommodation) return cachedAccommodation;
    }
    
    try {
      return await accommodationService.getAccommodationById(id);
    } catch (error) {
      console.error(`Failed to get accommodation by ID: ${id}`, error);
      return null;
    }
  };

  return {
    accommodations,
    featuredAccommodations,
    isLoading,
    isFeaturedLoading,
    error,
    getAccommodationById,
    refetch,
  };
};

// Hook for fetching a single accommodation with optimizations
export const useAccommodation = (accommodationId?: number) => {
  return useQuery({
    queryKey: ['accommodation', accommodationId],
    queryFn: async () => {
      if (!accommodationId) throw new Error('Accommodation ID is required');
      return await accommodationService.getAccommodationById(accommodationId);
    },
    enabled: !!accommodationId,
    staleTime: 1000 * 60 * 2, // Cache for 2 minutes
    refetchOnWindowFocus: false,
  });
};
