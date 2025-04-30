import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import AccommodationCard from "./accommodation/AccommodationCard";
import { useQuery } from "@tanstack/react-query";
import { accommodationService } from "@/services/accommodation-service";
import { adaptDatabaseToUIAccommodations } from "@/utils/accommodationAdapters";

const FeaturedAccommodations = () => {
  
  const [hoveredAccommodation, setHoveredAccommodation] = useState<number | null>(null);
  
  // Fetch featured accommodations from the database
  const { data: dbAccommodations, isLoading, error } = useQuery({
    queryKey: ['featured-accommodations'],
    queryFn: async () => {
      // Sort by rating descending to get the highest rated accommodations
      const allAccommodations = await accommodationService.getAccommodations({
        searchQuery: '',
        type: 'all',
        minPrice: null,
        maxPrice: null,
        minRating: 4,
        sortBy: 'rating'
      });
      
      // Return top 3 accommodations
      return allAccommodations.slice(0, 3);
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
  
  // Convert to UI accommodations
  const accommodations = dbAccommodations ? adaptDatabaseToUIAccommodations(dbAccommodations) : [];

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-center mb-4">Hospedagens Exclusivas</h2>
        <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto mb-16">
          Opções selecionadas para uma estadia perfeita em Fernando de Noronha
        </p>

        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-12 w-12 animate-spin text-tuca-ocean-blue" />
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">
              Não foi possível carregar as hospedagens neste momento. Tente novamente mais tarde.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {accommodations?.map((accommodation) => (
              <AccommodationCard key={accommodation.id} accommodation={accommodation} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link to="/hospedagens" className="inline-flex items-center text-tuca-ocean-blue hover:text-tuca-ocean-blue/80 transition-colors group">
            <span className="text-lg font-medium">Ver Todas as Hospedagens</span>
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAccommodations;
