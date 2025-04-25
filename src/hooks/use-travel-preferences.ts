
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { TravelPreference } from '@/types/user-preferences';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export function useTravelPreferences() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const getUserPreferences = useQuery({
    queryKey: ['user-preferences', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      // Cast the table name as a known table to fix TypeScript errors
      const { data, error } = await supabase
        .from('travel_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();
        
      if (error) {
        console.error('Error fetching user preferences:', error);
        return null;
      }
      
      return data as unknown as TravelPreference;
    },
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
  
  const saveTravelPreferences = useMutation({
    mutationFn: async (preferences: TravelPreference) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      preferences.user_id = user.id;
      
      // Check if preferences already exist
      if (preferences.id) {
        // Update
        const { data, error } = await supabase
          .from('travel_preferences')
          .update({
            travel_style: preferences.travel_style,
            group_size: preferences.group_size,
            trip_duration: preferences.trip_duration,
            activities: preferences.activities,
            accommodation_types: preferences.accommodation_types,
            budget_range: preferences.budget_range,
            dietary_restrictions: preferences.dietary_restrictions,
            special_requests: preferences.special_requests,
            travel_dates: preferences.travel_dates,
            updated_at: new Date().toISOString()
          })
          .eq('id', preferences.id)
          .select()
          .single();
          
        if (error) throw error;
        return data as unknown as TravelPreference;
      } else {
        // Insert
        const { data, error } = await supabase
          .from('travel_preferences')
          .insert({
            user_id: preferences.user_id,
            travel_style: preferences.travel_style,
            group_size: preferences.group_size,
            trip_duration: preferences.trip_duration,
            activities: preferences.activities,
            accommodation_types: preferences.accommodation_types,
            budget_range: preferences.budget_range,
            dietary_restrictions: preferences.dietary_restrictions,
            special_requests: preferences.special_requests,
            travel_dates: preferences.travel_dates,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select()
          .single();
          
        if (error) throw error;
        return data as unknown as TravelPreference;
      }
    },
    onSuccess: () => {
      toast.success('Suas preferências foram salvas!');
      queryClient.invalidateQueries({ queryKey: ['user-preferences', user?.id] });
    },
    onError: (error) => {
      toast.error('Erro ao salvar preferências: ' + error.message);
      console.error('Error saving preferences:', error);
    }
  });
  
  return {
    preferences: getUserPreferences.data,
    isLoading: getUserPreferences.isLoading,
    error: getUserPreferences.error,
    savePreferences: saveTravelPreferences.mutate
  };
}
