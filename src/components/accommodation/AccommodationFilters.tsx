
import React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Filter } from "lucide-react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

interface AccommodationFiltersProps {
  minPrice: number;
  maxPrice: number;
  capacityFilter: number[];
  amenitiesFilter: string[];
  allAmenities: string[];
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
  setMinPrice: (price: number) => void;
  setMaxPrice: (price: number) => void;
  toggleCapacityFilter: (capacity: number) => void;
  toggleAmenityFilter: (amenity: string) => void;
  applyFilters: () => void;
  resetFilters: () => void;
  getAmenityIcon: (amenity: string) => React.ReactNode;
}

const AccommodationFilters = ({
  minPrice,
  maxPrice,
  capacityFilter,
  amenitiesFilter,
  allAmenities,
  isFilterOpen,
  setIsFilterOpen,
  setMinPrice,
  setMaxPrice,
  toggleCapacityFilter,
  toggleAmenityFilter,
  applyFilters,
  resetFilters,
  getAmenityIcon,
}: AccommodationFiltersProps) => {
  return (
    <>
      {/* Mobile filter button */}
      <div className="md:hidden w-full mb-4">
        <Collapsible
          open={isFilterOpen}
          onOpenChange={setIsFilterOpen}
          className="w-full"
        >
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full flex justify-between items-center">
              <span className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar Hospedagens
              </span>
              <span>{isFilterOpen ? "−" : "+"}</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 p-4 border rounded-md">
            {/* Filter content for mobile */}
            <div className="space-y-6">
              {/* Price range filter */}
              <div>
                <h3 className="text-lg font-medium mb-3">Faixa de Preço (por noite)</h3>
                <div className="mb-6">
                  <Slider
                    defaultValue={[minPrice, maxPrice]}
                    max={3000}
                    step={50}
                    onValueChange={(value) => {
                      setMinPrice(value[0]);
                      setMaxPrice(value[1]);
                    }}
                    className="my-6"
                  />
                  <div className="flex justify-between">
                    <span>R$ {minPrice.toLocaleString('pt-BR')}</span>
                    <span>R$ {maxPrice.toLocaleString('pt-BR')}</span>
                  </div>
                </div>
              </div>

              {/* Capacity filter */}
              <div>
                <h3 className="text-lg font-medium mb-3">Capacidade</h3>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 4, 6, 8].map((capacity) => (
                    <Button
                      key={capacity}
                      variant={capacityFilter.includes(capacity) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleCapacityFilter(capacity)}
                      className={capacityFilter.includes(capacity) ? "bg-tuca-ocean-blue" : ""}
                    >
                      {capacity} {capacity === 1 ? "pessoa" : "pessoas"}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Amenities filter */}
              <div>
                <h3 className="text-lg font-medium mb-3">Comodidades</h3>
                <div className="flex flex-wrap gap-2">
                  {allAmenities.map((amenity) => (
                    <Button
                      key={amenity}
                      variant={amenitiesFilter.includes(amenity) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleAmenityFilter(amenity)}
                      className={amenitiesFilter.includes(amenity) ? "bg-tuca-ocean-blue" : ""}
                    >
                      {amenity}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Filter actions */}
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={applyFilters}
                  className="flex-1 bg-tuca-ocean-blue hover:bg-tuca-deep-blue text-white"
                >
                  Aplicar Filtros
                </Button>
                <Button
                  onClick={resetFilters}
                  variant="outline"
                  className="flex-1"
                >
                  Limpar
                </Button>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Desktop sidebar filter */}
      <div className="hidden md:block w-full md:w-1/4 lg:w-1/5">
        <div className="sticky top-24 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-serif font-bold mb-6">Filtros</h2>

          {/* Price range filter */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3">Faixa de Preço (por noite)</h3>
            <Slider
              defaultValue={[minPrice, maxPrice]}
              max={3000}
              step={50}
              onValueChange={(value) => {
                setMinPrice(value[0]);
                setMaxPrice(value[1]);
              }}
              className="my-6"
            />
            <div className="flex justify-between text-sm">
              <span>R$ {minPrice.toLocaleString('pt-BR')}</span>
              <span>R$ {maxPrice.toLocaleString('pt-BR')}</span>
            </div>
          </div>

          {/* Capacity filter */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3">Capacidade</h3>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 4, 6, 8].map((capacity) => (
                <Button
                  key={capacity}
                  variant={capacityFilter.includes(capacity) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleCapacityFilter(capacity)}
                  className={capacityFilter.includes(capacity) ? "bg-tuca-ocean-blue" : ""}
                >
                  {capacity} {capacity === 1 ? "pessoa" : "pessoas"}
                </Button>
              ))}
            </div>
          </div>

          {/* Amenities filter */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3">Comodidades</h3>
            <div className="flex flex-col gap-2">
              {allAmenities.map((amenity) => (
                <Button
                  key={amenity}
                  variant={amenitiesFilter.includes(amenity) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleAmenityFilter(amenity)}
                  className={`justify-start ${amenitiesFilter.includes(amenity) ? "bg-tuca-ocean-blue" : ""}`}
                >
                  {getAmenityIcon(amenity) && (
                    <span className="mr-2">{getAmenityIcon(amenity)}</span>
                  )}
                  {amenity}
                </Button>
              ))}
            </div>
          </div>

          {/* Filter actions */}
          <div className="flex flex-col gap-2">
            <Button
              onClick={applyFilters}
              className="w-full bg-tuca-ocean-blue hover:bg-tuca-deep-blue text-white"
            >
              Aplicar Filtros
            </Button>
            <Button
              onClick={resetFilters}
              variant="outline"
              className="w-full"
            >
              Limpar Filtros
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccommodationFilters;
