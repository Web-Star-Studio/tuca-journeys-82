
import { useQuery } from '@tanstack/react-query';
import { Package } from '@/data/types/packageTypes';
import { packages, getPackageById, getPackagesByCategory } from '@/data/packages';

/**
 * Custom hook to query packages with optional category filter
 * @param category Optional category filter for packages
 * @returns The query result with packages data
 */
export const usePackageQuery = (category?: string) => {
  return useQuery({
    queryKey: ['packages', { category }],
    queryFn: () => {
      if (category && category !== 'all') {
        return getPackagesByCategory(category);
      }
      return packages;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
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
    queryFn: () => {
      const pkg = getPackageById(id);
      if (!pkg) {
        throw new Error(`Package with ID ${id} not found`);
      }
      return pkg;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
