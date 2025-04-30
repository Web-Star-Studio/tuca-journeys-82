
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { 
  Sheet, 
  SheetClose, 
  SheetContent, 
  SheetDescription, 
  SheetFooter, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { AccommodationFilters } from '@/hooks/use-accommodations';

interface AccommodationFilterProps {
  filters: AccommodationFilters;
  applyFilters: (filters: Partial<AccommodationFilters>) => void;
  accommodationTypes: string[];
  priceRange: { min: number; max: number };
  isLoading?: boolean;
}

export default function AccommodationFilter({
  filters,
  applyFilters,
  accommodationTypes,
  priceRange,
  isLoading = false
}: AccommodationFilterProps) {
  const [localFilters, setLocalFilters] = React.useState<AccommodationFilters>(filters);
  
  // Check if filters are active
  const hasActiveFilters = 
    filters.minPrice !== null || 
    filters.maxPrice !== null || 
    filters.minRating !== null || 
    filters.type !== 'all' || 
    (filters.sortBy !== 'newest' && filters.sortBy !== undefined);

  // Reset sheet filters to current applied filters when opened
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

  // Format price for display
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
    <div className="bg-white shadow-sm rounded-lg p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar hospedagens..."
            className="pl-8 w-full"
            value={filters.searchQuery || ''}
            onChange={(e) => applyFilters({ searchQuery: e.target.value })}
            disabled={isLoading}
          />
          {filters.searchQuery && (
            <button 
              className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground hover:text-foreground"
              onClick={() => applyFilters({ searchQuery: '' })}
              disabled={isLoading}
            >
              <X size={16} />
            </button>
          )}
        </div>
        
        <div className="flex flex-row gap-2">
          <Select 
            value={filters.type || 'all'} 
            onValueChange={(value) => applyFilters({ type: value })}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Tipo de Hospedagem" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              {accommodationTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Sheet onOpenChange={(open) => { if (open) handleSheetOpen(); }}>
            <SheetTrigger asChild>
              <Button 
                variant={hasActiveFilters ? "secondary" : "outline"} 
                size="icon" 
                className="relative"
                disabled={isLoading}
              >
                <SlidersHorizontal size={18} />
                {hasActiveFilters && (
                  <span className="absolute -top-1 -right-1 bg-tuca-ocean-blue text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    !
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filtrar Hospedagens</SheetTitle>
                <SheetDescription>
                  Encontre a hospedagem ideal para sua estadia
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
                    value={localFilters.sortBy || 'newest'} 
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
                    className="bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90"
                  >
                    Aplicar Filtros
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
