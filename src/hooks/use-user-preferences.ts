
import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { UserPreferences } from '@/types/database';
import { supabase } from '@/lib/supabase';

export const useUserPreferences = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  // Query to fetch user preferences
  const { data: preferences, isLoading: isFetching, refetch } = useQuery({
    queryKey: ['user-preferences', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      try {
        // Fetch preferences from the database
        const { data, error } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
          throw error;
        }
        
        // If no preferences exist yet, return default values
        if (!data) {
          return {
            travel_style: 'adventure',
            activities: ['hiking', 'beach'],
            accommodation_types: ['pousada'],
            budget_range: 'medium',
            travel_frequency: 'quarterly',
            notifications: {
              email: true,
              push: true,
              sms: false,
              marketing: true,
              recommendations: true,
              booking_updates: true
            }
          } as UserPreferences;
        }
        
        return data;
      } catch (error) {
        console.error('Error fetching user preferences:', error);
        toast.error("Erro ao carregar suas preferências");
        return null;
      }
    },
    enabled: !!user?.id,
  });

  // Mutation to update user preferences
  const updatePreferencesMutation = useMutation({
    mutationFn: async (newPreferences: Partial<UserPreferences>) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      setIsLoading(true);
      
      try {
        const prefsToUpsert = {
          user_id: user.id,
          ...newPreferences,
          updated_at: new Date().toISOString()
        };
        
        // Check if preferences already exist
        const { data: existingPrefs } = await supabase
          .from('user_preferences')
          .select('id')
          .eq('user_id', user.id)
          .maybeSingle();
          
        if (existingPrefs) {
          // Update existing preferences
          const { data, error } = await supabase
            .from('user_preferences')
            .update(prefsToUpsert)
            .eq('user_id', user.id)
            .select();
            
          if (error) throw error;
          return data;
        } else {
          // Insert new preferences
          const { data, error } = await supabase
            .from('user_preferences')
            .insert([prefsToUpsert])
            .select();
            
          if (error) throw error;
          return data;
        }
      } catch (error: any) {
        console.error('Error updating preferences:', error);
        throw new Error(`Erro ao atualizar preferências: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-preferences', user?.id] });
      toast.success('Preferências atualizadas com sucesso');
    },
    onError: (error: any) => {
      toast.error(`Erro ao atualizar preferências: ${error.message}`);
    }
  });

  const updatePreferences = useCallback((data: Partial<UserPreferences>) => {
    return updatePreferencesMutation.mutate(data);
  }, [updatePreferencesMutation]);

  return {
    preferences,
    isLoading: isFetching || isLoading,
    updatePreferences,
    refetch
  };
};
