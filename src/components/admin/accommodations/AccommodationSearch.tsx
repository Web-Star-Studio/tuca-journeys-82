
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search, SlidersHorizontal, X } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter
} from "@/components/ui/sheet";
import { AccommodationFilters } from "@/hooks/use-accommodations";
import { Slider } from "@/components/ui/slider";

interface AccommodationSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  typeFilter: string;
  setTypeFilter: (type: string) => void;
  onAddNewClick: () => void;
  filters: AccommodationFilters;
  applyFilters: (filters: Partial<AccommodationFilters>) => void;
  accommodationTypes?: string[];
  priceRange?: { min: number; max: number };
  isProcessing?: boolean;
}

const AccommodationSearch = ({
  searchQuery,
  setSearchQuery,
  typeFilter,
  setTypeFilter,
  onAddNewClick,
  filters,
  applyFilters,
  accommodationTypes = [],
  priceRange = { min: 0, max: 5000 },
  isProcessing = false
}: AccommodationSearchProps) => {
  // Local state for filter sheet
  const [localFilters, setLocalFilters] = React.useState<AccommodationFilters>(filters);
  
  // Reset filters to current applied filters when sheet opens
  const handleSheetOpen = () => {
    setLocalFilters(filters);
  };
  
  // Apply filters and close sheet
  const handleApplyFilters = () => {
    applyFilters(localFilters);
  };
  
  // Reset all filters
  const handleResetFilters = () => {
    const resetFilters: AccommodationFilters = {
      searchQuery: '',
      type: 'all',
      minPrice: null,
      maxPrice: null,
      minRating: null,
      sortBy: 'newest'
    };
    setLocalFilters(resetFilters);
    applyFilters(resetFilters);
  };
  
  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    applyFilters({ searchQuery: newQuery });
  };
  
  // Handle type filter changes
  const handleTypeChange = (value: string) => {
    setTypeFilter(value);
    applyFilters({ type: value });
  };
  
  // Check if filters are active (excluding searchQuery and type which have their own UI)
  const hasActiveFilters = 
    filters.minPrice !== null || 
    filters.maxPrice !== null || 
    filters.minRating !== null || 
    (filters.sortBy !== 'newest' && filters.sortBy !== undefined);
  
  const formatPrice = (price: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);

  const updateLocalSortBy = (value: string) => {
    // Type guard to ensure value is a valid sortBy option
    const sortValue = value as AccommodationFilters['sortBy'];
    setLocalFilters({
      ...localFilters,
      sortBy: sortValue
    });
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-3 lg:space-y-0 mb-6">
      <div className="flex w-full lg:w-auto flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        {/* Search Input */}
        <div className="relative w-full sm:w-64 md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar hospedagens..."
            className="pl-8"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <button 
              className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground hover:text-foreground"
              onClick={() => {
                setSearchQuery('');
                applyFilters({ searchQuery: '' });
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>
        
        {/* Type Selector */}
        <Select 
          value={typeFilter} 
          onValueChange={handleTypeChange}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Tipo de Hospedagem" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os tipos</SelectItem>
            {accommodationTypes.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {/* Advanced Filters Sheet */}
        <Sheet onOpenChange={(open) => { if (open) handleSheetOpen(); }}>
          <SheetTrigger asChild>
            <Button 
              variant={hasActiveFilters ? "secondary" : "outline"} 
              size="icon" 
              className="relative"
            >
              <SlidersHorizontal size={18} />
              {hasActiveFilters && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  !
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filtros Avançados</SheetTitle>
              <SheetDescription>
                Refine sua busca por hospedagens
              </SheetDescription>
            </SheetHeader>
            
            <div className="py-6 space-y-6">
              {/* Price Range Filter */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Faixa de Preço</h3>
                  <span className="text-sm text-muted-foreground">
                    {localFilters.minPrice !== null ? formatPrice(localFilters.minPrice) : formatPrice(priceRange.min)} - 
                    {localFilters.maxPrice !== null ? formatPrice(localFilters.maxPrice) : formatPrice(priceRange.max)}
                  </span>
                </div>
                <Slider
                  defaultValue={[
                    localFilters.minPrice ?? priceRange.min, 
                    localFilters.maxPrice ?? priceRange.max
                  ]}
                  min={priceRange.min}
                  max={priceRange.max}
                  step={10}
                  onValueChange={(values) => {
                    setLocalFilters({
                      ...localFilters,
                      minPrice: values[0],
                      maxPrice: values[1]
                    });
                  }}
                />
              </div>
              
              {/* Rating Filter */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Avaliação Mínima</h3>
                  <span className="text-sm text-muted-foreground">
                    {localFilters.minRating !== null ? `${localFilters.minRating} estrelas` : 'Qualquer'}
                  </span>
                </div>
                <Slider
                  defaultValue={[localFilters.minRating ?? 0]}
                  min={0}
                  max={5}
                  step={0.5}
                  onValueChange={(values) => {
                    setLocalFilters({
                      ...localFilters,
                      minRating: values[0] > 0 ? values[0] : null
                    });
                  }}
                />
              </div>
              
              {/* Sort Order */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Ordenar Por</h3>
                <Select 
                  value={localFilters.sortBy ?? 'newest'} 
                  onValueChange={updateLocalSortBy}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Mais recentes</SelectItem>
                    <SelectItem value="price_asc">Menor preço</SelectItem>
                    <SelectItem value="price_desc">Maior preço</SelectItem>
                    <SelectItem value="rating">Melhor avaliação</SelectItem>
                    <SelectItem value="alphabetical">Ordem alfabética</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <SheetFooter className="sm:justify-between flex-col sm:flex-row gap-3 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={handleResetFilters}
              >
                Limpar Filtros
              </Button>
              <SheetClose asChild>
                <Button 
                  type="submit" 
                  onClick={handleApplyFilters}
                >
                  Aplicar Filtros
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      
      <Button onClick={onAddNewClick} disabled={isProcessing}>
        <Plus className="mr-2 h-4 w-4" /> Nova Hospedagem
      </Button>
    </div>
  );
};

export default AccommodationSearch;
