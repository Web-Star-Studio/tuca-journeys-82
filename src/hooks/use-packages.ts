
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from './use-toast';
import { Package } from '@/data/types/packageTypes';
import { packages, getPackageById, getPackagesByCategory } from '@/data/packages';

/**
 * Hook to manage packages data and operations
 * @param category Optional category filter for packages
 * @returns Package data and mutation functions
 */
export const usePackages = (category?: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

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
  const query = useQuery({
    queryKey: packagesQueryKey,
    queryFn: getPackages,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  /**
   * Create a new package
   */
  const createPackage = useMutation({
    mutationFn: async (newPackage: Omit<Package, 'id'>): Promise<Package> => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Create new package with generated ID
        const pkg: Package = {
          ...newPackage,
          id: Math.max(...packages.map(p => p.id), 0) + 1, // Handle empty array case
        };
        
        // In a real app, we would save this to the database
        console.log('Creating package:', pkg);
        
        return pkg;
      } catch (error) {
        console.error('Error creating package:', error);
        throw new Error('Failed to create package. Please try again later.');
      }
    },
    onSuccess: () => {
      // Invalidate the packages query to refetch data
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      
      toast({
        title: 'Pacote criado',
        description: 'O pacote foi criado com sucesso.',
      });
    },
    onError: (error: Error) => {
      console.error('Error creating package:', error);
      
      toast({
        title: 'Erro',
        description: error.message || 'Não foi possível criar o pacote. Tente novamente.',
        variant: 'destructive',
      });
    },
  });

  /**
   * Update an existing package
   */
  const updatePackage = useMutation({
    mutationFn: async (updatedPackage: Package): Promise<Package> => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Validate package exists
        const existingPackage = getPackageById(updatedPackage.id);
        if (!existingPackage) {
          throw new Error(`Package with ID ${updatedPackage.id} not found`);
        }
        
        // In a real app, we would update this in the database
        console.log('Updating package:', updatedPackage);
        
        return updatedPackage;
      } catch (error) {
        console.error('Error updating package:', error);
        throw new Error('Failed to update package. Please try again later.');
      }
    },
    onSuccess: (updatedPackage) => {
      // Invalidate specific queries to update cache
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      queryClient.invalidateQueries({ queryKey: ['package', updatedPackage.id] });
      
      toast({
        title: 'Pacote atualizado',
        description: 'O pacote foi atualizado com sucesso.',
      });
    },
    onError: (error: Error) => {
      console.error('Error updating package:', error);
      
      toast({
        title: 'Erro',
        description: error.message || 'Não foi possível atualizar o pacote. Tente novamente.',
        variant: 'destructive',
      });
    },
  });

  /**
   * Delete a package by ID
   */
  const deletePackage = useMutation({
    mutationFn: async (packageId: number): Promise<number> => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Validate package exists
        const existingPackage = getPackageById(packageId);
        if (!existingPackage) {
          throw new Error(`Package with ID ${packageId} not found`);
        }
        
        // In a real app, we would delete this from the database
        console.log('Deleting package:', packageId);
        
        return packageId;
      } catch (error) {
        console.error('Error deleting package:', error);
        throw new Error('Failed to delete package. Please try again later.');
      }
    },
    onSuccess: (packageId) => {
      // Invalidate specific queries to update cache
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      queryClient.invalidateQueries({ queryKey: ['package', packageId] });
      
      toast({
        title: 'Pacote excluído',
        description: 'O pacote foi excluído com sucesso.',
      });
    },
    onError: (error: Error) => {
      console.error('Error deleting package:', error);
      
      toast({
        title: 'Erro',
        description: error.message || 'Não foi possível excluir o pacote. Tente novamente.',
        variant: 'destructive',
      });
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    createPackage,
    updatePackage,
    deletePackage,
  };
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
