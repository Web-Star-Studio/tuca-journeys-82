
import React, { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Filter } from "lucide-react";

interface TourFiltersProps {
  categories: string[];
  selectedCategories: string[];
  toggleCategoryFilter: (category: string) => void;
  minPrice: number;
  maxPrice: number;
  setMinPrice: Dispatch<SetStateAction<number>>;
  setMaxPrice: Dispatch<SetStateAction<number>>;
  durationFilter: string[];
  toggleDurationFilter: (duration: string) => void;
  applyFilters: () => void;
  resetFilters: () => void;
  isFilterOpen: boolean;
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
}

const durations = ["1-2 horas", "2-4 horas", "4+ horas"];

const TourFilters = ({
  categories,
  selectedCategories,
  toggleCategoryFilter,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  durationFilter,
  toggleDurationFilter,
  applyFilters,
  resetFilters,
  isFilterOpen,
  setIsFilterOpen
}: TourFiltersProps) => {
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
                Filtrar Passeios
              </span>
              <span>{isFilterOpen ? "−" : "+"}</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 p-4 border rounded-md">
            {/* Filter content for mobile */}
            <div className="space-y-6">
              {/* Categories filter */}
              <div>
                <h3 className="text-lg font-medium mb-3">Categorias</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategories.includes(category) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleCategoryFilter(category)}
                      className={selectedCategories.includes(category) ? "bg-tuca-ocean-blue" : ""}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Price range filter */}
              <div>
                <h3 className="text-lg font-medium mb-3">Faixa de Preço</h3>
                <div className="mb-6">
                  <Slider
                    defaultValue={[minPrice, maxPrice]}
                    value={[minPrice, maxPrice]}
                    max={700}
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

              {/* Duration filter */}
              <div>
                <h3 className="text-lg font-medium mb-3">Duração</h3>
                <div className="flex flex-wrap gap-2">
                  {durations.map((duration) => (
                    <Button
                      key={duration}
                      variant={durationFilter.includes(duration) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleDurationFilter(duration)}
                      className={durationFilter.includes(duration) ? "bg-tuca-ocean-blue" : ""}
                    >
                      {duration}
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

          {/* Categories filter */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3">Categorias</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategories.includes(category) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleCategoryFilter(category)}
                  className={selectedCategories.includes(category) ? "bg-tuca-ocean-blue" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Price range filter */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3">Faixa de Preço</h3>
            <Slider
              defaultValue={[minPrice, maxPrice]}
              value={[minPrice, maxPrice]}
              max={700}
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

          {/* Duration filter */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3">Duração</h3>
            <div className="flex flex-wrap gap-2">
              {durations.map((duration) => (
                <Button
                  key={duration}
                  variant={durationFilter.includes(duration) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleDurationFilter(duration)}
                  className={durationFilter.includes(duration) ? "bg-tuca-ocean-blue" : ""}
                >
                  {duration}
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

export default TourFilters;
