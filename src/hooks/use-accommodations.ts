
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase-client';
import type { Accommodation } from '@/types/database';

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

export const useAccommodation = (id?: string | number) => {
  return useQuery({
    queryKey: ['accommodation', id],
    queryFn: async () => {
      if (!id) throw new Error('Accommodation ID is required');
      
      const { data, error } = await supabase
        .from('accommodations')
        .select('*')
        .eq('id', typeof id === 'string' ? parseInt(id, 10) : id)
        .maybeSingle();
      
      if (error) throw error;
      return data as Accommodation;
    },
    enabled: !!id,
  });
};
