
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
        // Check if the user_profiles table exists and has a preferences column
        const { data, error } = await supabase
          .from('user_profiles')
          .select('preferences')
          .eq('id', user.id)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          throw error;
        }
        
        // If we have user preferences data, convert it
        if (data?.preferences) {
          const userPrefs = data.preferences as any;
          
          // Ensure it has the required structure
          return {
            user_id: user.id,
            travel_style: userPrefs.travel_style,
            activities: userPrefs.activities,
            accommodation_types: userPrefs.accommodation_types,
            budget_range: userPrefs.budget_range,
            travel_frequency: userPrefs.travel_frequency,
            transport_modes: userPrefs.transport_modes,
            dietary_restrictions: userPrefs.dietary_restrictions || {
              vegetarian: false,
              vegan: false,
              glutenFree: false,
              dairyFree: false
            },
            accessibility: userPrefs.accessibility || {
              mobilitySupport: false,
              visualAids: false,
              hearingAids: false
            },
            notifications: userPrefs.notifications || {
              email: true,
              push: true,
              sms: false,
              marketing: true,
              recommendations: true,
              booking_updates: true
            }
          } as UserPreferences;
        }
        
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
      
      // Save preferences to user_profiles.preferences JSON column
      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          preferences: {
            travel_style: newPreferences.travel_style,
            activities: newPreferences.activities,
            accommodation_types: newPreferences.accommodation_types,
            budget_range: newPreferences.budget_range,
            travel_frequency: newPreferences.travel_frequency,
            transport_modes: newPreferences.transport_modes,
            dietary_restrictions: newPreferences.dietary_restrictions,
            accessibility: newPreferences.accessibility,
            notifications: newPreferences.notifications,
            updated_at: new Date().toISOString()
          }
        })
        .eq('id', user.id)
        .select()
        .single();
        
      if (error) throw error;
      
      // Convert stored preferences back to our format
      return {
        ...newPreferences,
        user_id: user.id,
        updated_at: new Date().toISOString()
      };
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
