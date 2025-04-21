
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Accommodation } from '@/types/database';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const useUpdateAccommodation = (accommodationId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (accommodationData: Partial<Accommodation>) => {
      // Ensure rating is set with a default value if not provided
      const updateData = {
        ...accommodationData,
        updated_at: new Date().toISOString(),
        rating: accommodationData.rating ?? 0, // Use nullish coalescing to handle 0 values
      };

      const { data, error } = await supabase
        .from('accommodations')
        .update(updateData)
        .eq('id', accommodationId)
        .select()
        .single();

      if (error) throw error;
      return data as Accommodation;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accommodations'] });
      queryClient.invalidateQueries({ queryKey: ['accommodation', accommodationId] });
      toast.success('Hospedagem atualizada com sucesso!');
    },
    onError: (error: any) => {
      toast.error(`Erro ao atualizar hospedagem: ${error.message}`);
    },
  });
};
