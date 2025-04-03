
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from './use-toast';
import { Package } from '@/data/types/packageTypes';
import { packages, getPackageById, getPackagesByCategory } from '@/data/packages';

// This is a mock implementation using the static data from packages.ts
// In a real app, this would be replaced with API calls to Supabase or other backend

export const usePackages = (category?: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get all packages with optional category filter
  const getPackages = async (): Promise<Package[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (category) {
      return getPackagesByCategory(category);
    }
    
    return packages;
  };

  // Query to fetch packages
  const query = useQuery({
    queryKey: ['packages', category],
    queryFn: getPackages,
  });

  // Create a new package
  const createPackage = useMutation({
    mutationFn: async (newPackage: Omit<Package, 'id'>) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Create new package with generated ID
      const pkg: Package = {
        ...newPackage,
        id: Math.max(...packages.map(p => p.id)) + 1,
      };
      
      // In a real app, we would save this to the database
      console.log('Creating package:', pkg);
      
      return pkg;
    },
    onSuccess: () => {
      // Invalidate the packages query to refetch data
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      
      toast({
        title: 'Pacote criado',
        description: 'O pacote foi criado com sucesso.',
      });
    },
    onError: (error) => {
      console.error('Error creating package:', error);
      
      toast({
        title: 'Erro',
        description: 'Não foi possível criar o pacote. Tente novamente.',
        variant: 'destructive',
      });
    },
  });

  // Update an existing package
  const updatePackage = useMutation({
    mutationFn: async (updatedPackage: Package) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, we would update this in the database
      console.log('Updating package:', updatedPackage);
      
      return updatedPackage;
    },
    onSuccess: (updatedPackage) => {
      // Invalidate the packages query to refetch data
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      queryClient.invalidateQueries({ queryKey: ['package', updatedPackage.id] });
      
      toast({
        title: 'Pacote atualizado',
        description: 'O pacote foi atualizado com sucesso.',
      });
    },
    onError: (error) => {
      console.error('Error updating package:', error);
      
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar o pacote. Tente novamente.',
        variant: 'destructive',
      });
    },
  });

  // Delete a package
  const deletePackage = useMutation({
    mutationFn: async (packageId: number) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, we would delete this from the database
      console.log('Deleting package:', packageId);
      
      return packageId;
    },
    onSuccess: (packageId) => {
      // Invalidate the packages query to refetch data
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      
      toast({
        title: 'Pacote excluído',
        description: 'O pacote foi excluído com sucesso.',
      });
    },
    onError: (error) => {
      console.error('Error deleting package:', error);
      
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o pacote. Tente novamente.',
        variant: 'destructive',
      });
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    createPackage,
    updatePackage,
    deletePackage,
  };
};

// Hook to get a single package by ID
export const usePackageDetail = (packageId: number) => {
  const getPackageDetail = async (): Promise<Package | undefined> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return getPackageById(packageId);
  };

  return useQuery({
    queryKey: ['package', packageId],
    queryFn: getPackageDetail,
    enabled: !!packageId, // Only run the query if packageId is provided
  });
};
