
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Package } from '@/types/package';
import { packageService } from '@/services/package-service';

/**
 * Custom hook for package mutations (create, update, delete)
 * @returns Mutation functions for package operations
 */
export const usePackageMutations = () => {
  const queryClient = useQueryClient();

  // Create package mutation
  const createPackage = useMutation({
    mutationFn: (packageData: Omit<Package, 'id'>) => packageService.createPackage(packageData),
    onSuccess: () => {
      // Invalidate packages query to refetch data
      queryClient.invalidateQueries({ queryKey: ['packages'] });
    }
  });

  // Update package mutation
  const updatePackage = useMutation({
    mutationFn: (packageData: Package) => packageService.updatePackage(packageData.id, packageData),
    onSuccess: (updatedPackage) => {
      // Invalidate specific package query and packages list
      queryClient.invalidateQueries({ queryKey: ['package', updatedPackage.id] });
      queryClient.invalidateQueries({ queryKey: ['packages'] });
    }
  });

  // Delete package mutation
  const deletePackage = useMutation({
    mutationFn: (packageId: number) => packageService.deletePackage(packageId),
    onSuccess: (_, packageId) => {
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
