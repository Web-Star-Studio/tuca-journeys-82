
import { useQuery } from '@tanstack/react-query';
import { Accommodation } from '@/types/database';
import { supabase } from '@/lib/supabase';

export const useAccommodation = (accommodationId: number | string) => {
  return useQuery({
    queryKey: ['accommodation', accommodationId],
    queryFn: async () => {
      const id = typeof accommodationId === 'string' ? parseInt(accommodationId, 10) : accommodationId;

      const { data, error } = await supabase
        .from('accommodations')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Accommodation;
    },
    enabled: !!accommodationId,
  });
};
