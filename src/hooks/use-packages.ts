
import { usePackageQuery, usePackageDetail } from './packages/usePackageQuery';
import { usePackageMutations } from './packages/usePackageMutations';

/**
 * Hook to manage packages data and operations
 * @param category Optional category filter for packages
 * @returns Package data and mutation functions
 */
export const usePackages = (category?: string) => {
  const query = usePackageQuery(category);
  const { createPackage, updatePackage, deletePackage } = usePackageMutations();

  return {
    data: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    createPackage,
    updatePackage,
    deletePackage,
  };
};

// Re-export the usePackageDetail hook
export { usePackageDetail };
