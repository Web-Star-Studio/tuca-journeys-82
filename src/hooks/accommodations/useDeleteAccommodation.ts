
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const useDeleteAccommodation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (accommodationId: number) => {
      const { error } = await supabase
        .from('accommodations')
        .delete()
        .eq('id', accommodationId);

      if (error) throw error;
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accommodations'] });
      toast.success('Hospedagem excluída com sucesso!');
    },
    onError: (error: any) => {
      toast.error(`Erro ao excluir hospedagem: ${error.message}`);
    },
  });
};
