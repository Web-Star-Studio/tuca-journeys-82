
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export interface TravelerPreferences {
  user_id: string;
  travel_style?: string;
  activities?: string[];
  accommodation_types?: string[];
  budget_range?: string;
  travel_frequency?: string;
  transport_modes?: string[];
  dietary_restrictions?: {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    other?: string;
  };
  accessibility?: {
    mobilitySupport: boolean;
    visualAids: boolean;
    hearingAids: boolean;
    other?: string;
  };
  notification_preferences?: {
    email: boolean;
    push: boolean;
    sms: boolean;
    marketing: boolean;
    booking_updates: boolean;
    promotions: boolean;
  };
  updated_at?: string;
}

export const useTravelerPreferences = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Get user preferences from Supabase or mock for demo users
  const { data: preferences, isLoading: isFetching, refetch } = useQuery({
    queryKey: ['traveler-preferences', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      try {
        // Mock preferences for demo users
        if (user.id.startsWith('demo-')) {
          return getMockPreferences(user.id);
        }
        
        // Try to get real preferences from Supabase
        const { data, error } = await supabase
          .from('traveler_preferences')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching user preferences:', error);
          throw new Error(error.message);
        }
        
        // Return data if found, or default preferences if not
        return data || getMockPreferences(user.id);
      } catch (error) {
        console.error('Error in preferences query:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar suas preferências. Tente novamente.",
          variant: "destructive",
        });
        return getMockPreferences(user.id);
      }
    },
    enabled: !!user?.id
  });

  // Create mutation to update preferences
  const updatePreferencesMutation = useMutation({
    mutationFn: async (newPreferences: Partial<TravelerPreferences>) => {
      if (!user?.id) {
        throw new Error('Usuário não autenticado');
      }
      
      setIsLoading(true);
      
      try {
        // For demo users, just mock the update
        if (user.id.startsWith('demo-')) {
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          
          return {
            ...preferences,
            ...newPreferences,
            user_id: user.id,
            updated_at: new Date().toISOString()
          };
        }
        
        // For real users, update in Supabase
        const prefsToUpdate = {
          user_id: user.id,
          ...newPreferences,
          updated_at: new Date().toISOString()
        };
        
        const { data, error } = await supabase
          .from('traveler_preferences')
          .upsert(prefsToUpdate)
          .select();
          
        if (error) {
          throw new Error(error.message);
        }
        
        return data[0];
      } catch (error: any) {
        console.error('Error updating preferences:', error);
        throw new Error(`Erro ao atualizar preferências: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['traveler-preferences', user?.id], data);
      toast({
        title: "Preferências atualizadas",
        description: "Suas preferências de viagem foram salvas com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível salvar suas preferências.",
        variant: "destructive",
      });
    }
  });

  // Create a function to get default/mock preferences
  const getMockPreferences = (userId: string): TravelerPreferences => {
    return {
      user_id: userId,
      travel_style: 'relaxation',
      activities: ['beach', 'sightseeing', 'hiking'],
      accommodation_types: ['hotel', 'pousada'],
      budget_range: 'medium',
      travel_frequency: 'quarterly',
      transport_modes: ['car', 'airplane'],
      dietary_restrictions: {
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        dairyFree: false,
      },
      accessibility: {
        mobilitySupport: false,
        visualAids: false,
        hearingAids: false,
      },
      notification_preferences: {
        email: true,
        push: true,
        sms: false,
        marketing: true,
        booking_updates: true,
        promotions: true,
      },
      updated_at: new Date().toISOString()
    };
  };

  // Create a wrapper function for the mutation
  const updatePreferences = useCallback((data: Partial<TravelerPreferences>) => {
    return updatePreferencesMutation.mutate(data);
  }, [updatePreferencesMutation]);

  return {
    preferences,
    isLoading: isFetching || isLoading,
    updatePreferences,
    refetch
  };
};
