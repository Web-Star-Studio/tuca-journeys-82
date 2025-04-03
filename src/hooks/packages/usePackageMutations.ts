
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Package } from '@/data/types/packageTypes';
import { getPackageById } from '@/data/packages';

/**
 * Custom hook for package mutation operations (create, update, delete)
 * @returns Object containing mutation functions
 */
export const usePackageMutations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

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
          id: Math.max(...(queryClient.getQueryData<Package[]>(['packages']) || []).map(p => p.id), 0) + 1,
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
    createPackage,
    updatePackage,
    deletePackage
  };
};
