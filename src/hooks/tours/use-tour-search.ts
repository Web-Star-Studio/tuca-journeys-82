
import { useQuery } from '@tanstack/react-query';
import { tourService } from '@/services/tour-service';

/**
 * Hook for searching tours
 */
export const useSearchTours = (query: string) => {
  return useQuery({
    queryKey: ['tours', 'search', query],
    queryFn: async () => {
      return await tourService.searchTours(query);
    },
    enabled: !!query,
    staleTime: 1000 * 60, // Cache for 1 minute
    refetchOnWindowFocus: false,
  });
};
