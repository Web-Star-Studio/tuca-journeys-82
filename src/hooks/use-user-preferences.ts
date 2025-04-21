
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase-client';
import { useAuth } from '@/contexts/AuthContext';
import { UserPreferences } from '@/types/database';

export const useUserPreferences = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);
  
  const { data: preferences, isLoading, error } = useQuery({
    queryKey: ['user-preferences', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('user_profiles')
        .select('preferences')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      return data?.preferences as UserPreferences | null;
    },
    enabled: !!user?.id,
  });
  
  const updatePreferences = async (newPreferences: Partial<UserPreferences>) => {
    if (!user?.id) return;
    
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ preferences: newPreferences })
        .eq('id', user.id);
      
      if (error) throw error;
      
      queryClient.invalidateQueries({ queryKey: ['user-preferences', user.id] });
      return true;
    } catch (err) {
      console.error('Error updating preferences:', err);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };
  
  return {
    preferences,
    isLoading: isLoading || isUpdating,
    error,
    updatePreferences,
  };
};
