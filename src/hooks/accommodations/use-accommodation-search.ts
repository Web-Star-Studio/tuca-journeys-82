
import { useQuery } from '@tanstack/react-query';
import { accommodationService } from '@/services/accommodation-service';
import { useState } from 'react';
import { AccommodationFilterParams } from '@/types/accommodation';

/**
 * Hook for searching accommodations with pagination support
 */
export const useSearchAccommodations = (initialFilters: AccommodationFilterParams = {
  searchQuery: '',
  type: 'all',
  minPrice: null,
  maxPrice: null,
  minRating: null,
  sortBy: 'created_at',
  amenities: [],
  maxGuests: null
}) => {
  const [filters, setFilters] = useState<AccommodationFilterParams>(initialFilters);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const { 
    data, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['accommodations', 'search', filters, page],
    queryFn: async () => {
      const result = await accommodationService.getAccommodations({
        ...filters,
        limit: itemsPerPage,
        offset: (page - 1) * itemsPerPage
      });
      
      return {
        accommodations: result,
        total: result.length > 0 ? result[0].total_count || result.length : 0
      };
    },
    staleTime: 1000 * 60, // Cache for 1 minute
    refetchOnWindowFocus: false,
  });

  const totalPages = data?.total ? Math.ceil(data.total / itemsPerPage) : 0;

  const updateFilters = (newFilters: Partial<AccommodationFilterParams>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
    setPage(1); // Reset to first page when filters change
  };

  return {
    accommodations: data?.accommodations || [],
    isLoading,
    error,
    refetch,
    filters,
    updateFilters,
    pagination: {
      page,
      setPage,
      totalPages,
      itemsPerPage,
      total: data?.total || 0
    }
  };
};
