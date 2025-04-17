
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { UserPreferences } from '@/types/database';

export const useUserPreferences = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  // Query to fetch user preferences
  const { data: preferences, isLoading: isFetching } = useQuery({
    queryKey: ['user-preferences', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      try {
        // In a real app, we would fetch from the database
        // For this demo, we'll return mock data
        return {
          travel_style: 'adventure',
          activities: ['hiking', 'diving', 'beach'],
          accommodation_types: ['pousada', 'hotel'],
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
      } catch (error) {
        console.error('Error fetching user preferences:', error);
        throw error;
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
        // In a real app, we would update the database
        console.log('Updating preferences:', newPreferences);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return { success: true, data: { ...preferences, ...newPreferences } };
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: (result) => {
      queryClient.setQueryData(['user-preferences', user?.id], result.data);
      toast.success('Preferências atualizadas com sucesso');
    },
    onError: (error: any) => {
      toast.error(`Erro ao atualizar preferências: ${error.message}`);
    }
  });

  return {
    preferences,
    isLoading: isFetching || isLoading,
    updatePreferences: (data: Partial<UserPreferences>) => updatePreferencesMutation.mutate(data)
  };
};
