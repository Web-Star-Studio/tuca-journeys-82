
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase-client';
import { useAuth } from '@/contexts/AuthContext';
import { UserPreferences } from '@/types/database';

export function useTravelerPreferences() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const query = useQuery({
    queryKey: ['traveler-preferences', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('user_profiles')
        .select('preferences')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      return data?.preferences as UserPreferences;
    },
    enabled: !!user?.id,
  });
  
  const mutation = useMutation({
    mutationFn: async (preferences: UserPreferences) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      // Convert preferences to a plain object for Supabase
      const preferencesObj = { ...preferences };
      
      const { error } = await supabase
        .from('user_profiles')
        .update({ preferences: preferencesObj })
        .eq('id', user.id);
      
      if (error) throw error;
      return preferences;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['traveler-preferences', user?.id] });
    },
  });
  
  return {
    preferences: query.data,
    isLoading: query.isLoading,
    error: query.error,
    updatePreferences: mutation.mutate,
    isUpdating: mutation.isPending,
  };
}
