
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Star, Filter, Search, X, Bed, MapPin, UtensilsCrossed, Palmtree, LandPlot } from "lucide-react";
import { useMapFilters, FilterCategory, FilterPriceRange } from "@/contexts/MapFilterContext";

const MapFilters = () => {
  const { filters, toggleCategory, setPriceRange, setRating, setSearchQuery, resetFilters } = useMapFilters();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInputValue);
  };

  const handleClearSearch = () => {
    setSearchInputValue("");
    setSearchQuery("");
  };

  const getCategoryIcon = (category: FilterCategory) => {
    switch(category) {
      case "tours": return <MapPin size={16} />;
      case "accommodations": return <Bed size={16} />;
      case "restaurants": return <UtensilsCrossed size={16} />;
      case "beaches": return <Palmtree size={16} />;
      case "attractions": return <LandPlot size={16} />;
    }
  };

  const getCategoryColor = (category: FilterCategory) => {
    switch(category) {
      case "tours": return "bg-tuca-ocean-blue text-white";
      case "accommodations": return "bg-green-500 text-white";
      case "restaurants": return "bg-amber-500 text-white";
      case "beaches": return "bg-blue-400 text-white";
      case "attractions": return "bg-purple-500 text-white";
    }
  };

  const getCategoryLabel = (category: FilterCategory) => {
    switch(category) {
      case "tours": return "Passeios";
      case "accommodations": return "Hospedagens";
      case "restaurants": return "Restaurantes";
      case "beaches": return "Praias";
      case "attractions": return "Atrações";
    }
  };

  return (
    <div className="absolute left-0 right-0 top-0 z-20 p-3 md:p-4">
      <div className="bg-white rounded-lg shadow-lg p-3 md:p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
          {/* Barra de pesquisa */}
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
                placeholder="Buscar em Fernando de Noronha"
                className="pl-9 pr-9"
              />
              {searchInputValue && (
                <button 
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </form>

          {/* Controles de filtro visíveis em desktop ou quando expandidos em mobile */}
          <div className={`md:flex items-center gap-2 ${isFiltersOpen ? 'flex mt-3 md:mt-0' : 'hidden'}`}>
            {/* Filtro de categoria */}
            <div className="flex flex-wrap gap-1 md:flex-nowrap">
              {(["tours", "accommodations", "restaurants", "beaches", "attractions"] as FilterCategory[]).map((category) => (
                <Button
                  key={category}
                  size="sm"
                  variant={filters.categories.includes(category) ? "default" : "outline"}
                  className={`flex items-center gap-1 text-xs md:text-sm ${filters.categories.includes(category) ? getCategoryColor(category) : ''}`}
                  onClick={() => toggleCategory(category)}
                >
                  {getCategoryIcon(category)}
                  <span className="hidden md:inline">{getCategoryLabel(category)}</span>
                  <span className="md:hidden">{getCategoryLabel(category).substring(0, 3)}</span>
                </Button>
              ))}
            </div>
            
            {/* Filtro de preço */}
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
                      {filters.priceRange === 'low' ? 'Baixo' : filters.priceRange === 'medium' ? 'Médio' : 'Alto'}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <div className="space-y-4">
                  <h3 className="font-medium">Faixa de Preço</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {(["all", "low", "medium", "high"] as FilterPriceRange[]).map((range) => (
                      <Button
                        key={range}
                        size="sm"
                        variant={filters.priceRange === range ? "default" : "outline"}
                        className={filters.priceRange === range ? "bg-tuca-ocean-blue" : ""}
                        onClick={() => setPriceRange(range)}
                      >
                        {range === 'all' && 'Todos'}
                        {range === 'low' && 'Baixo'}
                        {range === 'medium' && 'Médio'}
                        {range === 'high' && 'Alto'}
                      </Button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            {/* Filtro de avaliação */}
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="whitespace-nowrap"
                >
                  Avaliação
                  {filters.rating && (
                    <Badge variant="secondary" className="ml-2">
                      {filters.rating}+
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <div className="space-y-4">
                  <h3 className="font-medium">Avaliação mínima</h3>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-6 w-6 ${filters.rating && star <= filters.rating ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"}`}
                          onClick={() => setRating(star as 1 | 2 | 3 | 4 | 5)}
                        />
                      ))}
                    </div>
                    {filters.rating && (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => setRating(null)}
                      >
                        Limpar
                      </Button>
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Botão de reset */}
            <Button 
              size="sm" 
              variant="ghost"
              onClick={resetFilters}
              className="whitespace-nowrap"
            >
              Limpar filtros
            </Button>
          </div>

          {/* Botão de expandir/recolher filtros (apenas em mobile) */}
          <Button
            size="icon"
            variant="outline"
            className="md:hidden ml-auto"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <Filter size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MapFilters;
