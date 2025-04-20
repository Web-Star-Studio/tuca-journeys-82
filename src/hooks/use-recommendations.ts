
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useTravelerPreferences } from "./use-traveler-preferences";

export interface Recommendation {
  id: number;
  title: string;
  image: string;
  score: number;
  type: 'tour' | 'accommodation' | 'event' | 'vehicle';
  price: number;
  location?: string;
  tags?: string[];
}

export const useRecommendations = (limit: number = 10) => {
  const { user } = useAuth();
  const { preferences } = useTravelerPreferences();
  
  return useQuery({
    queryKey: ['recommendations', user?.id, preferences?.travel_style, limit],
    queryFn: async () => {
      if (!user) return [];
      
      try {
        // For demo users, generate personalized recommendations based on preferences
        if (user.id.startsWith('demo-')) {
          // Use preferences to customize recommendations
          const travelStyle = preferences?.travel_style || 'relaxation';
          const activities = preferences?.activities || ['beach'];
          
          // Generate mock recommendations based on preferences
          return getMockRecommendations(travelStyle, activities, limit);
        }
        
        // For real users, query Supabase
        // This would be an actual recommendation algorithm in a production app
        const { data, error } = await supabase.rpc('get_personalized_recommendations', {
          user_id: user.id,
          limit_count: limit
        });
        
        if (error) throw error;
        
        return data.map((item: any) => ({
          id: item.id,
          title: item.title,
          image: item.image_url,
          score: item.score,
          type: item.type,
          price: item.price,
          location: item.location,
          tags: item.tags,
        }));
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        // Fallback to mock data
        return getMockRecommendations('relaxation', ['beach'], limit);
      }
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

const getMockRecommendations = (
  travelStyle: string, 
  activities: string[],
  limit: number
): Recommendation[] => {
  // Base recommendations
  const allRecommendations: Recommendation[] = [
    { 
      id: 1, 
      title: "Passeio de Barco ao Pôr do Sol", 
      image: "/tour-sunset.jpg", 
      score: 98,
      type: 'tour',
      price: 120,
      tags: ['sunset', 'boat', 'romantic']
    },
    { 
      id: 2, 
      title: "Mergulho nas Piscinas Naturais", 
      image: "/tour-diving.jpg", 
      score: 87,
      type: 'tour',
      price: 150,
      tags: ['diving', 'adventure', 'nature']
    },
    { 
      id: 3, 
      title: "Trilha Ecológica", 
      image: "/tour-trail.jpg", 
      score: 85,
      type: 'tour',
      price: 80,
      tags: ['hiking', 'nature', 'adventure']
    },
    { 
      id: 4, 
      title: "Tour Histórico", 
      image: "/tour-historical.jpg", 
      score: 82,
      type: 'tour',
      price: 90,
      tags: ['cultural', 'historical', 'educational']
    },
    { 
      id: 5, 
      title: "Observação de Tartarugas", 
      image: "/tour-turtles.jpg", 
      score: 76,
      type: 'tour',
      price: 100,
      tags: ['nature', 'wildlife', 'family']
    },
    { 
      id: 6, 
      title: "Tour de Caiaque", 
      image: "/tour-kayak.jpg", 
      score: 73,
      type: 'tour',
      price: 110,
      tags: ['kayak', 'adventure', 'sports']
    },
    { 
      id: 7, 
      title: "Pousada Vista Mar", 
      image: "/accommodation-1.jpg", 
      score: 91,
      type: 'accommodation',
      price: 350,
      location: 'Praia do Sueste',
      tags: ['beachfront', 'luxury', 'romantic']
    },
    { 
      id: 8, 
      title: "Chalé das Palmeiras", 
      image: "/accommodation-2.jpg", 
      score: 84,
      type: 'accommodation',
      price: 220,
      location: 'Vila dos Remédios',
      tags: ['nature', 'quiet', 'family']
    },
    { 
      id: 9, 
      title: "Festival de Música", 
      image: "/event-music.jpg", 
      score: 88,
      type: 'event',
      price: 80,
      tags: ['music', 'entertainment', 'nightlife']
    },
    { 
      id: 10, 
      title: "Aluguel de Buggy", 
      image: "/tour-buggy.jpg", 
      score: 90,
      type: 'vehicle',
      price: 200,
      tags: ['adventure', 'transport', 'freedom']
    }
  ];
  
  // Filter and sort based on preferences
  let filteredRecs = [...allRecommendations];
  
  // Apply travel style filtering
  if (travelStyle === 'adventure') {
    filteredRecs = filteredRecs.filter(rec => 
      rec.tags?.includes('adventure') || 
      rec.tags?.includes('sports') || 
      rec.tags?.includes('diving')
    );
  } else if (travelStyle === 'relaxation') {
    filteredRecs = filteredRecs.filter(rec => 
      rec.tags?.includes('romantic') || 
      rec.tags?.includes('luxury') || 
      rec.tags?.includes('beachfront')
    );
  } else if (travelStyle === 'family') {
    filteredRecs = filteredRecs.filter(rec => 
      rec.tags?.includes('family') || 
      rec.tags?.includes('nature') || 
      rec.tags?.includes('educational')
    );
  } else if (travelStyle === 'cultural') {
    filteredRecs = filteredRecs.filter(rec => 
      rec.tags?.includes('cultural') || 
      rec.tags?.includes('historical') || 
      rec.tags?.includes('educational')
    );
  }
  
  // Apply activities filtering if no results from travel style
  if (filteredRecs.length < 3 && activities.length > 0) {
    filteredRecs = allRecommendations.filter(rec => 
      activities.some(activity => rec.tags?.includes(activity))
    );
  }
  
  // If still not enough recommendations, add back some general ones
  if (filteredRecs.length < limit) {
    const remainingNeeded = limit - filteredRecs.length;
    const existingIds = filteredRecs.map(r => r.id);
    const additionalRecs = allRecommendations
      .filter(r => !existingIds.includes(r.id))
      .slice(0, remainingNeeded);
    
    filteredRecs = [...filteredRecs, ...additionalRecs];
  }
  
  // Sort by score and limit
  return filteredRecs
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};
