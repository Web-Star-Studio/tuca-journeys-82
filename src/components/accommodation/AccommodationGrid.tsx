
import React from "react";
import AccommodationCard from "./AccommodationCard";
import { Loader2 } from "lucide-react";

interface AccommodationGridProps {
  accommodations: any[];
  isLoading: boolean;
}

const AccommodationGrid = ({ accommodations, isLoading }: AccommodationGridProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!accommodations || accommodations.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium mb-2">Nenhuma hospedagem encontrada</h3>
        <p className="text-muted-foreground">
          Não encontramos hospedagens que correspondam aos filtros selecionados.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {accommodations.map((accommodation) => (
        <AccommodationCard key={accommodation.id} accommodation={accommodation} />
      ))}
    </div>
  );
};

export default AccommodationGrid;
