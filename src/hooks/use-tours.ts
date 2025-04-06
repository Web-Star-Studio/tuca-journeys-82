
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Tour } from '@/types/database';
import { demoData } from '@/utils/demoDataGenerator';

export const useTours = () => {
  // Query to fetch tours
  const { data: tours, isLoading, error, refetch } = useQuery({
    queryKey: ['tours'],
    queryFn: async () => {
      // In a real app, we'd fetch from an API
      // For demo purposes, return our generated tours
      return demoData.tours;
    },
  });

  // Mutation to delete a tour
  const deleteTourMutation = useMutation({
    mutationFn: async (tourId: number) => {
      // In a real app, we'd call an API
      console.log(`Deleting tour: ${tourId}`);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    },
    onSuccess: () => {
      toast.success('Passeio excluído com sucesso');
      refetch();
    },
    onError: (error) => {
      toast.error('Erro ao excluir o passeio');
      console.error('Error deleting tour:', error);
    }
  });

  // Mutation to create or update a tour
  const saveTourMutation = useMutation({
    mutationFn: async (tour: Partial<Tour>) => {
      // In a real app, we'd call an API
      console.log('Saving tour:', tour);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return { success: true };
    },
    onSuccess: () => {
      toast.success('Passeio salvo com sucesso');
      refetch();
    },
    onError: (error) => {
      toast.error('Erro ao salvar o passeio');
      console.error('Error saving tour:', error);
    }
  });

  const deleteTour = (tourId: number) => {
    deleteTourMutation.mutate(tourId);
  };

  const saveTour = (tour: Partial<Tour>) => {
    saveTourMutation.mutate(tour);
  };

  const getTourById = (id?: number) => {
    if (!id || !tours) return null;
    return tours.find(tour => tour.id === id) || null;
  };

  return {
    tours,
    isLoading,
    error,
    deleteTour,
    saveTour,
    getTourById,
    refetch
  };
};

// Add the missing useTour hook for single tour details
export const useTour = (tourId?: number) => {
  return useQuery({
    queryKey: ['tour', tourId],
    queryFn: async () => {
      if (!tourId) throw new Error('Tour ID is required');
      
      // In a real app, we'd fetch from an API endpoint for a single tour
      // For demo, find the tour in our demo data
      const tour = demoData.tours.find(t => t.id === tourId);
      if (!tour) throw new Error('Tour not found');
      
      return tour;
    },
    enabled: !!tourId,
  });
};
