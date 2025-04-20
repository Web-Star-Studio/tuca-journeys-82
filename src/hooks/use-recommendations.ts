
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useTravelerPreferences } from "./use-traveler-preferences";
import { Tour, Accommodation, Event, UserPreferences } from "@/types/database";

export function useRecommendations() {
  const { user } = useAuth();
  const { preferences } = useTravelerPreferences();
  
  const { data: recommendedTours, isLoading: toursLoading } = useQuery({
    queryKey: ["recommendedTours", user?.id, preferences?.travel_style],
    queryFn: async () => {
      try {
        // For demo accounts or if no preferences yet, return generic recommendations
        if (user?.id?.startsWith("demo-") || !preferences || !preferences.travel_style) {
          const { data, error } = await supabase
            .from("tours")
            .select("*")
            .limit(4);
            
          if (error) throw error;
          return data as Tour[];
        }
        
        // Get tours based on travel style and activities preferences
        const { data, error } = await supabase
          .from("tours")
          .select("*")
          .eq("category", preferences.travel_style)
          .limit(4);
          
        if (error) throw error;
        
        // If we didn't get enough results, add some more popular tours
        if (data.length < 4) {
          const additionalQuery = await supabase
            .from("tours")
            .select("*")
            .not("category", "eq", preferences.travel_style)
            .order("rating", { ascending: false })
            .limit(4 - data.length);
            
          if (!additionalQuery.error && additionalQuery.data) {
            return [...data, ...additionalQuery.data] as Tour[];
          }
        }
        
        return data as Tour[];
      } catch (error) {
        console.error("Error fetching recommended tours:", error);
        return [];
      }
    },
    enabled: !!user,
  });
  
  const { data: recommendedAccommodations, isLoading: accommodationsLoading } = useQuery({
    queryKey: ["recommendedAccommodations", user?.id, preferences?.accommodation_types],
    queryFn: async () => {
      try {
        // For demo accounts or if no preferences, return generic recommendations
        if (user?.id?.startsWith("demo-") || !preferences || !preferences.accommodation_types) {
          const { data, error } = await supabase
            .from("accommodations")
            .select("*")
            .limit(4);
            
          if (error) throw error;
          return data as Accommodation[];
        }
        
        // Filter accommodations by preferred types
        // Note: In a real app, we would want to have a 'type' field in the accommodations table
        // that matches the values in accommodation_types
        const { data, error } = await supabase
          .from("accommodations")
          .select("*")
          .in("type", preferences.accommodation_types)
          .limit(4);
          
        if (error) throw error;
        
        // If we didn't get enough results, add some more
        if (data.length < 4) {
          const additionalQuery = await supabase
            .from("accommodations")
            .select("*")
            .not("type", "in", preferences.accommodation_types)
            .limit(4 - data.length);
            
          if (!additionalQuery.error && additionalQuery.data) {
            return [...data, ...additionalQuery.data] as Accommodation[];
          }
        }
        
        return data as Accommodation[];
      } catch (error) {
        console.error("Error fetching recommended accommodations:", error);
        return [];
      }
    },
    enabled: !!user,
  });
  
  const { data: upcomingEvents, isLoading: eventsLoading } = useQuery({
    queryKey: ["upcomingEvents"],
    queryFn: async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .gte("date", today)
          .order("date")
          .limit(3);
          
        if (error) throw error;
        
        return data as Event[];
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
        return [];
      }
    },
    enabled: !!user,
  });

  return {
    recommendedTours: recommendedTours || [],
    recommendedAccommodations: recommendedAccommodations || [],
    upcomingEvents: upcomingEvents || [],
    isLoading: toursLoading || accommodationsLoading || eventsLoading,
  };
}
