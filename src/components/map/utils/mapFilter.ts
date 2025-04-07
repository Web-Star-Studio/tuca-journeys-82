
import { FilterCategory, FilterPriceRange, FilterRating } from "@/contexts/MapFilterContext";
import { PointData } from "./mapData";

export interface MapFilters {
  categories: FilterCategory[];
  priceRange: FilterPriceRange;
  rating: FilterRating;
  searchQuery: string;
}

export const filterMapData = (mapData: PointData[], filters: MapFilters): PointData[] => {
  return mapData.filter(point => {
    // Filtrar por categoria
    if (!filters.categories.includes(point.category as any)) {
      return false;
    }
    
    // Filtrar por busca
    if (filters.searchQuery && !point.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filtrar por avaliação
    if (filters.rating && point.rating < filters.rating) {
      return false;
    }
    
    // Filtrar por faixa de preço
    if ('price' in point && filters.priceRange !== 'all') {
      if (filters.priceRange === 'low' && point.price && point.price > 300) return false;
      if (filters.priceRange === 'medium' && point.price && (point.price <= 300 || point.price > 800)) return false;
      if (filters.priceRange === 'high' && point.price && point.price <= 800) return false;
    }
    
    return true;
  });
};
