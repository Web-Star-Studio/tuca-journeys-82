
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Package } from '@/data/types/packageTypes';

/**
 * Custom hook for package mutations (create, update, delete)
 * @returns Mutation functions for package operations
 */
export const usePackageMutations = () => {
  const queryClient = useQueryClient();

  // Create package mutation
  const createPackage = useMutation({
    mutationFn: async (packageData: Omit<Package, 'id'>) => {
      // In a real application, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      
      // Mock implementation - create with random ID
      return {
        ...packageData,
        id: Math.floor(Math.random() * 1000) + 10
      } as Package;
    },
    onSuccess: () => {
      // Invalidate packages query to refetch data
      queryClient.invalidateQueries({ queryKey: ['packages'] });
    }
  });

  // Update package mutation
  const updatePackage = useMutation({
    mutationFn: async (packageData: Package) => {
      // In a real application, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      
      // Mock implementation - return the updated package
      return packageData;
    },
    onSuccess: (updatedPackage) => {
      // Invalidate specific package query and packages list
      queryClient.invalidateQueries({ queryKey: ['package', updatedPackage.id] });
      queryClient.invalidateQueries({ queryKey: ['packages'] });
    }
  });

  // Delete package mutation
  const deletePackage = useMutation({
    mutationFn: async (packageId: number) => {
      // In a real application, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      
      // Mock implementation - just return the ID of deleted package
      return packageId;
    },
    onSuccess: (packageId) => {
      // Invalidate specific package query and packages list
      queryClient.invalidateQueries({ queryKey: ['package', packageId] });
      queryClient.invalidateQueries({ queryKey: ['packages'] });
    }
  });

  return {
    createPackage,
    updatePackage,
    deletePackage
  };
};
