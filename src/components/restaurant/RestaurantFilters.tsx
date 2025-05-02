
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import type { RestaurantFilters as FilterType } from '@/types/restaurant';

// Define cuisine types and price ranges for filtering
const CUISINE_TYPES = [
  'Brazilian', 
  'Seafood', 
  'Italian', 
  'Japanese', 
  'Mediterranean', 
  'Vegetarian'
];

const PRICE_RANGES = [
  '$', 
  '$$', 
  '$$$', 
  '$$$$'
];

interface RestaurantFiltersProps {
  filters: FilterType;
  onFilterChange: (filters: FilterType) => void;
}

const RestaurantFilters: React.FC<RestaurantFiltersProps> = ({ 
  filters, 
  onFilterChange 
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchQuery: e.target.value });
  };

  const handleCuisineChange = (value: string, checked: boolean) => {
    const cuisines = filters.cuisine_type || [];
    const updatedCuisines = checked 
      ? [...cuisines, value]
      : cuisines.filter(cuisine => cuisine !== value);
    
    onFilterChange({ ...filters, cuisine_type: updatedCuisines });
  };

  const handlePriceRangeChange = (value: string, checked: boolean) => {
    const priceRanges = filters.price_range || [];
    const updatedPriceRanges = checked
      ? [...priceRanges, value]
      : priceRanges.filter(price => price !== value);
    
    onFilterChange({ ...filters, price_range: updatedPriceRanges });
  };

  const handleRatingChange = (value: number) => {
    onFilterChange({ ...filters, rating: value });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, sortBy: e.target.value as FilterType['sortBy'] });
  };

  const handleClearFilters = () => {
    onFilterChange({});
  };

  const hasActiveFilters = !!(
    filters.searchQuery || 
    (filters.cuisine_type && filters.cuisine_type.length > 0) ||
    (filters.price_range && filters.price_range.length > 0) ||
    filters.rating || 
    filters.sortBy
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6 space-y-6">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search restaurants..."
          className="pl-8"
          value={filters.searchQuery || ''}
          onChange={handleSearchChange}
        />
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Cuisine Type</h3>
        <div className="grid grid-cols-2 gap-2">
          {CUISINE_TYPES.map((cuisine) => (
            <div key={cuisine} className="flex items-center space-x-2">
              <Checkbox 
                id={`cuisine-${cuisine}`} 
                checked={filters.cuisine_type?.includes(cuisine) || false}
                onCheckedChange={(checked) => handleCuisineChange(cuisine, checked === true)}
              />
              <Label htmlFor={`cuisine-${cuisine}`}>{cuisine}</Label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Price Range</h3>
        <div className="flex flex-wrap gap-3">
          {PRICE_RANGES.map((price) => (
            <div key={price} className="flex items-center space-x-2">
              <Checkbox 
                id={`price-${price}`} 
                checked={filters.price_range?.includes(price) || false}
                onCheckedChange={(checked) => handlePriceRangeChange(price, checked === true)}
              />
              <Label htmlFor={`price-${price}`}>{price}</Label>
            </div>
          ))}
        </div>
      </div>
      
      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleClearFilters}
            className="flex items-center gap-1"
          >
            <X className="h-4 w-4" />
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default RestaurantFilters;
