
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Accommodation } from '@/types/database';
import { supabase } from '@/lib/supabase';
import { useCurrentPartner } from '../use-partner';
import { toast } from 'sonner';

export const useCreateAccommodation = () => {
  const queryClient = useQueryClient();
  const { data: partner } = useCurrentPartner();

  return useMutation({
    mutationFn: async (accommodationData: Omit<Accommodation, 'id' | 'created_at' | 'updated_at'>) => {
      if (!partner?.id) {
        throw new Error('Partner ID is required');
      }

      // Ensure we have all required fields with proper values
      const insertData = {
        ...accommodationData,
        partner_id: partner.id,
        rating: accommodationData.rating || 0, // Ensure rating has default value
      };

      const { data, error } = await supabase
        .from('accommodations')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;
      return data as Accommodation;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accommodations'] });
      toast.success('Hospedagem criada com sucesso!');
    },
    onError: (error: any) => {
      toast.error(`Erro ao criar hospedagem: ${error.message}`);
    },
  });
};
