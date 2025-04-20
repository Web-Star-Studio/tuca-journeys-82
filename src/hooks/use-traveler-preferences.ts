
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { UserPreferences } from '@/types/database';

export const useTravelerPreferences = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  // Define states for local preferences
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Query to fetch preferences
  const { data, isLoading: isFetching, refetch } = useQuery({
    queryKey: ['userPreferences', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      // For demo users, return mock data
      if (user.id.startsWith('demo-')) {
        return getMockPreferences(user.id);
      }
      
      try {
        const { data, error } = await supabase
          .from('user_preferences') // Changed from 'traveler_preferences' to 'user_preferences'
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          throw error;
        }
        
        if (!data) {
          // Return default preferences if none exist
          return {
            user_id: user.id,
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
        
        return data as UserPreferences;
      } catch (error) {
        console.error('Error fetching user preferences:', error);
        return null;
      }
    },
    enabled: !!user,
  });

  // Update local state when data changes
  useEffect(() => {
    if (data) {
      setPreferences(data);
      setIsLoading(false);
    } else if (!isFetching) {
      setIsLoading(false);
    }
  }, [data, isFetching]);

  // Mutation for saving preferences
  const { mutate: savePreferences, isPending: isSaving } = useMutation({
    mutationFn: async (newPreferences: UserPreferences) => {
      if (!user) throw new Error('User not authenticated');
      
      // For demo users, just update local state
      if (user.id.startsWith('demo-')) {
        await new Promise(resolve => setTimeout(resolve, 800)); // simulate delay
        return newPreferences;
      }
      
      // For real users, save to database
      const { data, error } = await supabase
        .from('user_preferences') // Changed from 'traveler_preferences' to 'user_preferences'
        .upsert([{
          ...newPreferences,
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();
        
      if (error) throw error;
      
      return data as UserPreferences;
    },
    onSuccess: (data) => {
      // Update cache
      queryClient.setQueryData(['userPreferences', user?.id], data);
      
      // Show success toast
      toast({
        title: 'Preferências salvas',
        description: 'Suas preferências foram atualizadas com sucesso.',
      });
      
      setPreferences(data);
    },
    onError: (error) => {
      console.error('Error saving preferences:', error);
      
      // Show error toast
      toast({
        title: 'Erro ao salvar',
        description: 'Não foi possível salvar suas preferências. Tente novamente.',
        variant: 'destructive',
      });
    }
  });

  // Function to update specific preferences
  const updatePreferences = (updates: Partial<UserPreferences>) => {
    if (!preferences || !user) return;
    
    const updatedPreferences = {
      ...preferences,
      ...updates,
      user_id: user.id,
    };
    
    savePreferences(updatedPreferences as UserPreferences);
  };

  // Mock preferences for demo users
  const getMockPreferences = (userId: string): UserPreferences => {
    return {
      user_id: userId,
      travel_style: 'adventure',
      activities: ['hiking', 'swimming', 'sightseeing'],
      accommodation_types: ['hotel', 'resort'],
      budget_range: 'medium',
      travel_frequency: 'occasional',
      transport_modes: ['airplane', 'car'],
      dietary_restrictions: {
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        dairyFree: false
      },
      accessibility: {
        mobilitySupport: false,
        visualAids: false,
        hearingAids: false
      },
      notifications: {
        email: true,
        push: true,
        sms: false,
        marketing: true,
        recommendations: true,
        booking_updates: true
      },
      updated_at: new Date().toISOString()
    };
  };

  return {
    preferences,
    isLoading: isLoading || isFetching,
    isSaving,
    updatePreferences,
    refetchPreferences: refetch
  };
};
