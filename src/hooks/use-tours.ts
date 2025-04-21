
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase-client';
import type { Tour } from '@/types/database';

export const useTours = (filters?: Record<string, any>) => {
  return useQuery({
    queryKey: ['tours', filters],
    queryFn: async () => {
      let query = supabase.from('tours').select('*');
      
      if (filters) {
        if (filters.category) {
          query = query.eq('category', filters.category);
        }
        if (filters.difficulty) {
          query = query.eq('difficulty', filters.difficulty);
        }
        if (filters.location && typeof filters.location === 'string') {
          query = query.ilike('meeting_point', `%${filters.location}%`);
        }
        if (filters.available !== undefined) {
          query = query.eq('is_available', filters.available);
        }
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Tour[];
    },
  });
};

export const useTour = (id?: string | number) => {
  return useQuery({
    queryKey: ['tour', id],
    queryFn: async () => {
      if (!id) throw new Error('Tour ID is required');
      
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('id', typeof id === 'string' ? parseInt(id, 10) : id)
        .single();
      
      if (error) throw error;
      return data as Tour;
    },
    enabled: !!id,
  });
};

export const useCreateTour = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (tour: Omit<Tour, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('tours')
        .insert(tour)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tours'] });
    },
  });
};

export const useUpdateTour = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...tour }: Partial<Tour> & { id: number }) => {
      const { data, error } = await supabase
        .from('tours')
        .update(tour)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tours'] });
      queryClient.invalidateQueries({ queryKey: ['tour', variables.id] });
    },
  });
};

export const useDeleteTour = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('tours')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tours'] });
    },
  });
};

export const usePartnerTours = (partnerId: string) => {
  return useQuery({
    queryKey: ['partner-tours', partnerId],
    queryFn: async () => {
      let query = supabase.from('tours').select('*');
      
      if (partnerId) {
        query = query.eq('partner_id', partnerId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as Tour[];
    },
    enabled: !!partnerId,
  });
};
