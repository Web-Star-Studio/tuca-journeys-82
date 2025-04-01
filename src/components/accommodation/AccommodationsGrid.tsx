
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AccommodationCard from "./AccommodationCard";
import { Accommodation } from "@/data/accommodations";

interface AccommodationsGridProps {
  filteredAccommodations: Accommodation[];
  resetFilters: () => void;
  onSortChange: (value: string) => void;
  sortBy: string;
}

const AccommodationsGrid = ({ 
  filteredAccommodations, 
  resetFilters, 
  onSortChange,
  sortBy 
}: AccommodationsGridProps) => {
  return (
    <div className="w-full md:w-3/4 lg:w-4/5">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-serif font-bold">
          {filteredAccommodations.length} Hospedagens Disponíveis
        </h2>
        <div className="hidden md:block">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="priceAsc">Menor Preço</SelectItem>
              <SelectItem value="priceDesc">Maior Preço</SelectItem>
              <SelectItem value="ratingDesc">Melhor Avaliação</SelectItem>
              <SelectItem value="capacityAsc">Menor Capacidade</SelectItem>
              <SelectItem value="capacityDesc">Maior Capacidade</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredAccommodations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAccommodations.map((accommodation) => (
            <AccommodationCard key={accommodation.id} accommodation={accommodation} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">Nenhuma hospedagem encontrada</h3>
          <p className="text-gray-500 mb-6">
            Nenhuma hospedagem corresponde aos filtros selecionados. Por favor, ajuste seus filtros.
          </p>
          <Button onClick={resetFilters} variant="outline">
            Limpar Filtros
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccommodationsGrid;
