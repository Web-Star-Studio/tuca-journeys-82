
import { useQuery } from '@tanstack/react-query';
import { Package } from '@/data/types/packageTypes';
import { packages, getPackageById, getPackagesByCategory } from '@/data/packages';

/**
 * Custom hook to fetch all packages with optional category filtering
 * @param category Optional category to filter packages by
 * @returns Query result with packages data
 */
export const usePackageQuery = (category?: string) => {
  // Query key for consistent cache management
  const packagesQueryKey = ['packages', category];

  /**
   * Fetch packages with optional category filtering
   * @returns Promise with array of packages
   */
  const getPackages = async (): Promise<Package[]> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (category) {
        return getPackagesByCategory(category);
      }
      
      return packages;
    } catch (error) {
      console.error('Error fetching packages:', error);
      throw new Error('Failed to fetch packages. Please try again later.');
    }
  };

  // Query to fetch packages
  return useQuery({
    queryKey: packagesQueryKey,
    queryFn: getPackages,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to get a single package by ID
 * @param packageId ID of the package to fetch
 * @returns Query object with package data
 */
export const usePackageDetail = (packageId: number) => {
  const getPackageDetail = async (): Promise<Package | undefined> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const result = getPackageById(packageId);
      
      if (!result) {
        throw new Error(`Package with ID ${packageId} not found`);
      }
      
      return result;
    } catch (error) {
      console.error(`Error fetching package ${packageId}:`, error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ['package', packageId],
    queryFn: getPackageDetail,
    enabled: !!packageId, // Only run the query if packageId is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
