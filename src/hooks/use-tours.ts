
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tour } from "@/types/database";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const useTours = () => {
  const queryClient = useQueryClient();

  // Fetch all tours
  const { data, isLoading, error } = useQuery({
    queryKey: ['tours'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        throw new Error(`Error fetching tours: ${error.message}`);
      }

      return data as Tour[];
    },
  });

  // Fetch a specific tour by ID
  const getTourById = async (id: number) => {
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(`Error fetching tour with id ${id}: ${error.message}`);
    }

    return data as Tour;
  };

  // Create a new tour
  const createTour = useMutation({
    mutationFn: async (newTour: Omit<Tour, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('tours')
        .insert(newTour)
        .select()
        .single();

      if (error) {
        throw new Error(`Error creating tour: ${error.message}`);
      }

      return data as Tour;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tours'] });
      toast.success("Passeio criado com sucesso!");
    },
    onError: (error) => {
      toast.error(`Erro ao criar passeio: ${error.message}`);
    },
  });

  // Update an existing tour
  const updateTour = useMutation({
    mutationFn: async (updatedTour: Partial<Tour> & { id: number }) => {
      const { id, ...tourData } = updatedTour;
      
      const { data, error } = await supabase
        .from('tours')
        .update(tourData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(`Error updating tour: ${error.message}`);
      }

      return data as Tour;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tours'] });
      queryClient.invalidateQueries({ queryKey: ['tours', variables.id] });
      toast.success("Passeio atualizado com sucesso!");
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar passeio: ${error.message}`);
    },
  });

  // Delete a tour
  const deleteTour = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('tours')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(`Error deleting tour: ${error.message}`);
      }

      return id;
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['tours'] });
      toast.success("Passeio excluído com sucesso!");
    },
    onError: (error) => {
      toast.error(`Erro ao excluir passeio: ${error.message}`);
    },
  });

  return {
    data,
    isLoading,
    error,
    getTourById,
    createTour: createTour.mutate,
    updateTour: updateTour.mutate,
    deleteTour: deleteTour.mutate,
    isPendingCreate: createTour.isPending,
    isPendingUpdate: updateTour.isPending,
    isPendingDelete: deleteTour.isPending,
  };
};
