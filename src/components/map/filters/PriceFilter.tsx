
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FilterPriceRange, useMapFilters } from "@/contexts/MapFilterContext";

const PriceFilter = () => {
  const { filters, setPriceRange } = useMapFilters();
  
  const getPriceRangeLabel = (range: FilterPriceRange) => {
    switch(range) {
      case 'all': return 'Todos';
      case 'low': return 'Baixo';
      case 'medium': return 'Médio';
      case 'high': return 'Alto';
    }
  };

  const allPriceRanges: FilterPriceRange[] = ["all", "low", "medium", "high"];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          size="sm" 
          variant="outline" 
          className="whitespace-nowrap"
        >
          Preço
          {filters.priceRange !== 'all' && (
            <Badge variant="secondary" className="ml-2">
              {getPriceRangeLabel(filters.priceRange)}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <div className="space-y-4">
          <h3 className="font-medium">Faixa de Preço</h3>
          <div className="grid grid-cols-3 gap-2">
            {allPriceRanges.map((range) => (
              <Button
                key={range}
                size="sm"
                variant={filters.priceRange === range ? "default" : "outline"}
                className={filters.priceRange === range ? "bg-tuca-ocean-blue" : ""}
                onClick={() => setPriceRange(range)}
              >
                {getPriceRangeLabel(range)}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PriceFilter;
