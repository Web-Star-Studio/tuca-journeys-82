
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase-client';
import { Tour } from '@/types';

export const useTours = () => {
  const queryClient = useQueryClient();

  const toursQuery = useQuery({
    queryKey: ['tours'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Tour[];
    },
  });

  const getTourById = async (id: number): Promise<Tour | null> => {
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Tour;
  };

  const saveTourMutation = useMutation({
    mutationFn: async (tourData: Partial<Tour>) => {
      // Prepare tour data ensuring all required fields are set
      const preparedData: any = {
        title: tourData.title || 'New Tour',
        description: tourData.description || 'Tour description',
        short_description: tourData.short_description || 'Short description',
        price: tourData.price || 0,
        duration: tourData.duration || '1 hour',
        category: tourData.category || 'adventure',
        difficulty: tourData.difficulty || 'easy',
        rating: tourData.rating || 0,
        min_participants: tourData.min_participants || 1,
        max_participants: tourData.max_participants || 10,
        image_url: tourData.image_url || '/placeholder.jpg',
        gallery_images: tourData.gallery_images || [],
        includes: tourData.includes || [],
        excludes: tourData.excludes || [],
        notes: tourData.notes || [],
        schedule: tourData.schedule || [],
        ...tourData
      };

      if (tourData.id) {
        // Update existing tour
        const { data, error } = await supabase
          .from('tours')
          .update(preparedData)
          .eq('id', tourData.id)
          .select()
          .single();

        if (error) throw error;
        return data as Tour;
      } else {
        // Create new tour
        const { data, error } = await supabase
          .from('tours')
          .insert([preparedData])
          .select()
          .single();

        if (error) throw error;
        return data as Tour;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tours'] });
    },
  });

  const deleteTourMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('tours')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tours'] });
    },
  });

  return {
    tours: toursQuery.data || [],
    isLoading: toursQuery.isLoading,
    error: toursQuery.error,
    saveTour: saveTourMutation.mutate,
    deleteTour: deleteTourMutation.mutate,
    getTourById
  };
};
