
import { useQuery } from '@tanstack/react-query';
import { Package } from '@/types/package';
import { packageService } from '@/services/package-service';

/**
 * Custom hook to query packages with optional category filter
 * @param category Optional category filter for packages
 * @returns The query result with packages data
 */
export const usePackageQuery = (category?: string) => {
  return useQuery({
    queryKey: ['packages', { category }],
    queryFn: async () => {
      const packages: Package[] = await packageService.getPackages();
      if (category && category !== 'all') {
        return packages.filter(pkg => pkg.category?.toLowerCase() === category.toLowerCase());
      }
      return packages;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};

/**
 * Custom hook to query a single package by ID
 * @param id The package ID
 * @returns The query result with package data
 */
export const usePackageDetail = (id: number) => {
  return useQuery({
    queryKey: ['package', id],
    queryFn: () => packageService.getPackageById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
