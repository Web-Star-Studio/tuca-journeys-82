
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase-client';
import { Accommodation } from '@/types';

export const useAccommodations = () => {
  return useQuery({
    queryKey: ['accommodations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('accommodations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Accommodation[];
    },
  });
};

export const useAccommodation = (id: number | string | undefined) => {
  return useQuery({
    queryKey: ['accommodation', id],
    queryFn: async () => {
      if (!id) return null;
      
      // Convert string ID to number if necessary
      const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
      
      const { data, error } = await supabase
        .from('accommodations')
        .select('*')
        .eq('id', numericId)
        .single();
      
      if (error) throw error;
      return data as Accommodation;
    },
    enabled: !!id,
  });
};
