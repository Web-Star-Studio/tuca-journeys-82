
import React from "react";
import TourCard from "./TourCard";
import { Button } from "@/components/ui/button";
import { Tour } from "@/data/tours";

interface TourGridProps {
  tours: Tour[];
  resetFilters: () => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

const TourGrid = ({ tours, resetFilters, sortBy, onSortChange }: TourGridProps) => {
  return (
    <div className="w-full md:w-3/4 lg:w-4/5">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-serif font-bold">
          {tours.length} Passeios Disponíveis
        </h2>
        <div className="hidden md:block">
          <select 
            className="py-2 px-4 border rounded-md"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="priceAsc">Menor Preço</option>
            <option value="priceDesc">Maior Preço</option>
            <option value="durationAsc">Menor Duração</option>
            <option value="durationDesc">Maior Duração</option>
            <option value="ratingDesc">Melhor Avaliação</option>
          </select>
        </div>
      </div>

      {tours.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">Nenhum passeio encontrado</h3>
          <p className="text-gray-500 mb-6">
            Nenhum passeio corresponde aos filtros selecionados. Por favor, ajuste seus filtros.
          </p>
          <Button onClick={resetFilters} variant="outline">
            Limpar Filtros
          </Button>
        </div>
      )}
    </div>
  );
};

export default TourGrid;
