
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
          
          // Add missing fields to match Tour interface
          return (data || []).map(tour => ({
            ...tour,
            is_available: true, // Add virtual field
            location: tour.meeting_point || "Unknown" // Add virtual field
          })) as Tour[];
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
            const completeAdditionalData = additionalQuery.data.map(tour => ({
              ...tour,
              is_available: true, // Add virtual field
              location: tour.meeting_point || "Unknown" // Add virtual field
            }));
            
            const completeData = data.map(tour => ({
              ...tour,
              is_available: true, // Add virtual field
              location: tour.meeting_point || "Unknown" // Add virtual field
            }));
            
            return [...completeData, ...completeAdditionalData] as Tour[];
          }
        }
        
        return data.map(tour => ({
          ...tour,
          is_available: true, // Add virtual field
          location: tour.meeting_point || "Unknown" // Add virtual field
        })) as Tour[];
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
          
          return (data || []).map(accommodation => ({
            ...accommodation,
            is_available: true, // Add virtual field
            location: accommodation.address, // Add virtual field
            category: accommodation.type, // Add virtual field
            rating: 4.5 // Add default rating if not present
          })) as Accommodation[];
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
            const completeAdditionalData = additionalQuery.data.map(accommodation => ({
              ...accommodation,
              is_available: true, // Add virtual field
              location: accommodation.address, // Add virtual field
              category: accommodation.type, // Add virtual field
              rating: 4.5 // Add default rating if not present
            }));
            
            const completeData = data.map(accommodation => ({
              ...accommodation,
              is_available: true, // Add virtual field
              location: accommodation.address, // Add virtual field
              category: accommodation.type, // Add virtual field
              rating: 4.5 // Add default rating if not present
            }));
            
            return [...completeData, ...completeAdditionalData] as Accommodation[];
          }
        }
        
        return data.map(accommodation => ({
          ...accommodation,
          is_available: true, // Add virtual field
          location: accommodation.address, // Add virtual field
          category: accommodation.type, // Add virtual field
          rating: 4.5 // Add default rating if not present
        })) as Accommodation[];
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
        
        return (data || []).map(event => ({
          ...event,
          title: event.name, // Add title as alias for name
          time: event.start_time, // Add time as alias for start_time
          is_available: true, // Add virtual field
          organizer: event.partner_id || "Unknown" // Add default organizer if not present
        })) as Event[];
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
