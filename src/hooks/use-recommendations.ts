
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase-client';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from './use-profile';
import { Accommodation, Tour, Event, UserPreferences } from '@/types/database';

export const useRecommendations = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  
  const getUserPreferences = (): UserPreferences | undefined => {
    return profile?.preferences;
  };
  
  const { data: recommendedTours, isLoading: toursLoading } = useQuery({
    queryKey: ['recommended-tours', user?.id],
    queryFn: async () => {
      const preferences = getUserPreferences();
      
      let query = supabase
        .from('tours')
        .select('*')
        .order('rating', { ascending: false })
        .limit(4);
      
      if (preferences?.activities && preferences.activities.length > 0) {
        // Match tours with user's preferred activities
        // This is a simplified approach and might need to be adjusted based on your actual data structure
        const activity = preferences.activities[0].toLowerCase();
        query = query.ilike('description', `%${activity}%`);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as Tour[];
    },
    enabled: !!user?.id,
  });
  
  const { data: recommendedAccommodations, isLoading: accommodationsLoading } = useQuery({
    queryKey: ['recommended-accommodations', user?.id],
    queryFn: async () => {
      const preferences = getUserPreferences();
      
      let query = supabase
        .from('accommodations')
        .select('*')
        .order('rating', { ascending: false })
        .limit(4);
      
      if (preferences?.accommodation_types && preferences.accommodation_types.length > 0) {
        const type = preferences.accommodation_types[0].toLowerCase();
        query = query.eq('type', type);
      } else if (preferences?.budget_range) {
        // Adjust price range based on budget preference
        switch (preferences.budget_range) {
          case 'economy':
            query = query.lt('price_per_night', 200);
            break;
          case 'medium':
            query = query.gte('price_per_night', 200).lt('price_per_night', 500);
            break;
          case 'premium':
            query = query.gte('price_per_night', 500).lt('price_per_night', 800);
            break;
          case 'luxury':
            query = query.gte('price_per_night', 800);
            break;
        }
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as Accommodation[];
    },
    enabled: !!user?.id,
  });
  
  const { data: recommendedEvents, isLoading: eventsLoading } = useQuery({
    queryKey: ['recommended-events', user?.id],
    queryFn: async () => {
      const preferences = getUserPreferences();
      
      let query = supabase
        .from('events')
        .select('*')
        .gt('date', new Date().toISOString().split('T')[0]) // Only future events
        .order('date', { ascending: true })
        .limit(4);
      
      if (preferences?.travel_style) {
        // Match events with user's travel style
        const style = preferences.travel_style.toLowerCase();
        query = query.ilike('category', `%${style}%`);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as Event[];
    },
    enabled: !!user?.id,
  });
  
  return {
    recommendedTours,
    recommendedAccommodations,
    recommendedEvents,
    isLoading: toursLoading || accommodationsLoading || eventsLoading,
  };
};
