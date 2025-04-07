
import { FilterCategory, FilterPriceRange, FilterRating, MapFiltersState } from "@/contexts/MapFilterContext";
import { MapFilters } from "./mapFilter";

// Convert price range string to number tuple
const getPriceRangeValues = (priceRange: FilterPriceRange): [number, number] => {
  switch(priceRange) {
    case "low": return [0, 100];
    case "medium": return [100, 300];
    case "high": return [300, 1000];
    default: return [0, 1000]; // "all" or any other value
  }
};

// Adapter to convert context state to filter format
export const adaptFiltersForMap = (contextFilters: MapFiltersState): MapFilters => {
  return {
    search: contextFilters.searchQuery,
    category: contextFilters.categories.length === 0 ? 'all' : contextFilters.categories[0],
    priceRange: getPriceRangeValues(contextFilters.priceRange),
    rating: contextFilters.rating || 0
  };
};
