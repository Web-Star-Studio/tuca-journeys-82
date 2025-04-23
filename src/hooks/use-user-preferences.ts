
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
        // Check if the user_preferences table exists in Supabase
        // For now, we'll use a mock implementation as the table might not exist yet
        // In a production app, this would query the actual table
        
        // Mock implementation
        const mockPreferences: UserPreferences = {
          user_id: user.id,
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
        };
        
        return mockPreferences;
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
        // In a production app with an actual user_preferences table:
        // const { data, error } = await supabase
        //  .from('user_preferences')
        //  .upsert({ user_id: user.id, ...newPreferences })
        
        // For now, we'll just simulate a successful update
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return {
          ...preferences,
          ...newPreferences,
          user_id: user.id,
          updated_at: new Date().toISOString()
        };
      } catch (error: any) {
        console.error('Error updating preferences:', error);
        throw new Error(`Erro ao atualizar preferências: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user-preferences', user?.id], data);
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
