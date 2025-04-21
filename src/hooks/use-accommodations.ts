
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Accommodation } from '@/types/database';
import { supabase } from '@/lib/supabase';
import { useCurrentPartner } from './use-partner';
import { toast } from 'sonner';

export const useAccommodations = (partnerId?: string) => {
  const { data: currentPartner } = useCurrentPartner();
  const partnerIdToUse = partnerId || currentPartner?.id;
  
  const { data: accommodations, isLoading, error } = useQuery({
    queryKey: ['accommodations', partnerIdToUse],
    queryFn: async () => {
      // If no partner ID, fetch all accommodations
      let query = supabase.from('accommodations').select('*');
      
      // If partner ID is provided, filter by that partner
      if (partnerIdToUse) {
        query = query.eq('partner_id', partnerIdToUse);
      }
      
      // Execute query
      const { data, error } = await query;
      if (error) throw error;
      
      return data as Accommodation[];
    },
    enabled: true,
  });
  
  return { accommodations, isLoading, error };
};

export const useAccommodation = (accommodationId: number | string) => {
  return useQuery({
    queryKey: ['accommodation', accommodationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('accommodations')
        .select('*')
        .eq('id', accommodationId)
        .single();
        
      if (error) throw error;
      return data as Accommodation;
    },
    enabled: !!accommodationId,
  });
};

export const useCreateAccommodation = () => {
  const queryClient = useQueryClient();
  const { data: partner } = useCurrentPartner();
  
  return useMutation({
    mutationFn: async (accommodationData: Omit<Accommodation, 'id' | 'created_at' | 'updated_at'>) => {
      if (!partner?.id) {
        throw new Error('Partner ID is required');
      }
      
      const { data, error } = await supabase
        .from('accommodations')
        .insert({
          ...accommodationData,
          partner_id: partner.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();
        
      if (error) throw error;
      return data as Accommodation;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accommodations'] });
      toast.success('Hospedagem criada com sucesso!');
    },
    onError: (error) => {
      toast.error(`Erro ao criar hospedagem: ${error.message}`);
    },
  });
};

export const useUpdateAccommodation = (accommodationId: number) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (accommodationData: Partial<Accommodation>) => {
      const { data, error } = await supabase
        .from('accommodations')
        .update({
          ...accommodationData,
          updated_at: new Date().toISOString(),
        })
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
    onError: (error) => {
      toast.error(`Erro ao atualizar hospedagem: ${error.message}`);
    },
  });
};

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
    onError: (error) => {
      toast.error(`Erro ao excluir hospedagem: ${error.message}`);
    },
  });
};
