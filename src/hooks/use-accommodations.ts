
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Accommodation } from '@/types/database';
import { generateDemoAccommodations } from '@/utils/demoDataGenerator';

export const useAccommodations = () => {
  // Query to fetch accommodations
  const { data: accommodations = [], isLoading, error, refetch } = useQuery({
    queryKey: ['accommodations'],
    queryFn: async () => {
      // In a real app, we'd fetch from an API
      // For demo purposes, return our generated accommodations
      const demoAccommodations = generateDemoAccommodations();
      
      // Make sure they match the expected type
      return demoAccommodations.map(acc => ({
        ...acc,
        is_available: acc.is_available ?? true,
        location: acc.location || acc.address || '',
        category: acc.category || acc.type || 'Standard'
      })) as Accommodation[];
    },
  });

  // Mutation to delete an accommodation
  const deleteAccommodationMutation = useMutation({
    mutationFn: async (accommodationId: number) => {
      // In a real app, we'd call an API
      console.log(`Deleting accommodation: ${accommodationId}`);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    },
    onSuccess: () => {
      toast.success('Acomodação excluída com sucesso');
      refetch();
    },
    onError: (error) => {
      toast.error('Erro ao excluir a acomodação');
      console.error('Error deleting accommodation:', error);
    }
  });

  // Mutation to create an accommodation
  const createAccommodationMutation = useMutation({
    mutationFn: async (accommodation: Partial<Accommodation>) => {
      // In a real app, we'd call an API
      console.log('Creating accommodation:', accommodation);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return { success: true };
    },
    onSuccess: () => {
      toast.success('Acomodação criada com sucesso');
      refetch();
    },
    onError: (error) => {
      toast.error('Erro ao criar a acomodação');
      console.error('Error creating accommodation:', error);
    }
  });

  // Mutation to update an accommodation
  const updateAccommodationMutation = useMutation({
    mutationFn: async (accommodation: Partial<Accommodation>) => {
      // In a real app, we'd call an API
      console.log('Updating accommodation:', accommodation);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return { success: true };
    },
    onSuccess: () => {
      toast.success('Acomodação atualizada com sucesso');
      refetch();
    },
    onError: (error) => {
      toast.error('Erro ao atualizar a acomodação');
      console.error('Error updating accommodation:', error);
    }
  });

  const deleteAccommodation = (accommodationId: number) => {
    deleteAccommodationMutation.mutate(accommodationId);
  };

  const saveAccommodation = (accommodation: Partial<Accommodation>) => {
    // If accommodation has an id, it's an update, otherwise it's a create
    if (accommodation.id) {
      updateAccommodationMutation.mutate(accommodation);
    } else {
      createAccommodationMutation.mutate(accommodation);
    }
  };

  const createAccommodation = (accommodation: Partial<Accommodation>) => {
    createAccommodationMutation.mutate(accommodation);
  };

  const updateAccommodation = (accommodation: Partial<Accommodation>) => {
    updateAccommodationMutation.mutate(accommodation);
  };

  const getAccommodationById = (id?: number) => {
    if (!id || !accommodations) return null;
    
    const accommodation = accommodations.find(acc => acc.id === id);
    if (!accommodation) return null;
    
    // Ensure it's correctly typed
    return {
      ...accommodation,
      is_available: accommodation.is_available ?? true,
      location: accommodation.location || accommodation.address || '',
      category: accommodation.category || accommodation.type || 'Standard'
    } as Accommodation;
  };

  return {
    accommodations,
    isLoading,
    error,
    deleteAccommodation,
    saveAccommodation,
    createAccommodation,
    updateAccommodation,
    getAccommodationById,
    refetch
  };
};

// Add the missing hook for single accommodation details
export const useAccommodation = (accommodationId?: number) => {
  return useQuery({
    queryKey: ['accommodation', accommodationId],
    queryFn: async () => {
      if (!accommodationId) throw new Error('Accommodation ID is required');
      
      // In a real app, we'd fetch from an API endpoint for a single accommodation
      // For demo, find the accommodation in our demo data
      const accommodations = generateDemoAccommodations();
      const accommodation = accommodations.find(a => a.id === accommodationId);
      if (!accommodation) throw new Error('Accommodation not found');
      
      return {
        ...accommodation,
        is_available: accommodation.is_available ?? true,
        location: accommodation.location || accommodation.address || '',
        category: accommodation.category || accommodation.type || 'Standard'
      } as Accommodation;
    },
    enabled: !!accommodationId,
  });
};
