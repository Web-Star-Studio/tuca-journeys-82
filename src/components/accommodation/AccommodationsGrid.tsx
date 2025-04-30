
import React from "react";
import AccommodationCard from "./AccommodationCard";
import { Accommodation } from "@/types/database";
import { useAccommodations } from "@/hooks/use-accommodations";
import AccommodationFilter from "./AccommodationFilter";
import { Loader2 } from "lucide-react";

interface AccommodationsGridProps {
  initialAccommodations?: Accommodation[];
}

const AccommodationsGrid = ({ initialAccommodations }: AccommodationsGridProps) => {
  // Use our enhanced hook for accommodations with filters
  const {
    accommodations,
    isLoading,
    error,
    filters,
    applyFilters,
    accommodationTypes,
    priceRange,
  } = useAccommodations({
    searchQuery: "",
    type: "all",
    minPrice: null,
    maxPrice: null,
    minRating: null,
    sortBy: "newest",
  });

  // Use either provided accommodations or fetched ones
  const displayAccommodations = initialAccommodations || accommodations || [];

  // Handle error state
  if (error) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium mb-2 text-red-500">
          Erro ao carregar hospedagens
        </h3>
        <p className="text-muted-foreground">
          Ocorreu um erro ao buscar as hospedagens. Por favor, tente novamente mais tarde.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Filter Component */}
      <AccommodationFilter
        filters={filters}
        applyFilters={applyFilters}
        accommodationTypes={accommodationTypes}
        priceRange={priceRange}
        isLoading={isLoading}
      />

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-tuca-ocean-blue" />
        </div>
      ) : displayAccommodations.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-xl font-medium mb-2">
            Nenhuma hospedagem encontrada
          </h3>
          <p className="text-muted-foreground">
            Não encontramos hospedagens que correspondam aos filtros selecionados.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayAccommodations.map((accommodation) => (
            <AccommodationCard key={accommodation.id} accommodation={accommodation} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AccommodationsGrid;
