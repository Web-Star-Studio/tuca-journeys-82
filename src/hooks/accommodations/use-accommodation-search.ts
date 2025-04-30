
import { useQuery } from '@tanstack/react-query';
import { accommodationService } from '@/services/accommodation-service';
import { useState } from 'react';
import { AccommodationFilters } from '@/types/accommodation';
import { Accommodation } from '@/types/database';

/**
 * Hook for searching accommodations with pagination support
 */
export const useSearchAccommodations = (initialFilters: AccommodationFilters = {
  searchQuery: '',
  type: 'all',
  minPrice: null,
  maxPrice: null,
  minRating: null,
  sortBy: 'newest',
  amenities: [],
  maxGuests: null
}) => {
  const [filters, setFilters] = useState<AccommodationFilters>(initialFilters);
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
      // Use AccommodationFilters type which now includes limit and offset
      const result = await accommodationService.getAccommodations({
        ...filters,
        limit: itemsPerPage,
        offset: (page - 1) * itemsPerPage
      } as AccommodationFilters); // Add explicit type assertion
      
      // Calculate total count from a hypothetical total_count property or estimate from results
      const totalCount = result.length > 0 && 'total_count' in result[0] 
        ? (result[0] as any).total_count 
        : result.length;
      
      return {
        accommodations: result,
        total: totalCount
      };
    },
    staleTime: 1000 * 60, // Cache for 1 minute
    refetchOnWindowFocus: false,
  });

  const totalPages = data?.total ? Math.ceil(data.total / itemsPerPage) : 0;

  const updateFilters = (newFilters: Partial<AccommodationFilters>) => {
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
