
export interface MapFilters {
  search: string;
  category: string;
  priceRange: [number, number];
  rating: number;
}

export const filterMapData = (data: any[], filters: MapFilters) => {
  // Start with all data
  let filtered = [...data];

  // Filter by search term if provided
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      item => 
        (item.name && item.name.toLowerCase().includes(searchLower)) || 
        (item.description && item.description.toLowerCase().includes(searchLower))
    );
  }

  // Filter by category if not "all"
  if (filters.category && filters.category !== 'all') {
    // Handle specific category mappings
    let categoryToFilter = filters.category;
    
    // Map our FilterCategory types to the actual data categories
    const categoryMappings: Record<string, string[]> = {
      'tours': ['Passeio'],
      'accommodations': ['Hospedagem'],
      'beaches': ['Praia'],
      'events': ['Evento'],
      'attractions': ['Atração'],
      'restaurants': ['Restaurante', 'Gastronomia'],
      'museums': ['Museu'],
      'historical': ['História', 'Histórico']
    };
    
    const matchingCategories = categoryMappings[filters.category] || [filters.category];
    
    filtered = filtered.filter(item => {
      if (!item.category) return false;
      return matchingCategories.some(cat => 
        item.category.toLowerCase() === cat.toLowerCase()
      );
    });
  }

  // Filter by rating if set
  if (filters.rating > 0) {
    // Check if the item has a rating property and if it's greater than or equal to the filter rating
    filtered = filtered.filter(item => {
      // Skip rating filter if the item doesn't have a rating
      if (item.rating === undefined || item.rating === null) return true;
      return typeof item.rating === 'number' && item.rating >= filters.rating;
    });
  }

  // Filter by price range
  if (filters.priceRange && filters.priceRange.length === 2) {
    const [min, max] = filters.priceRange;
    filtered = filtered.filter(item => {
      // Skip price filter if the item doesn't have a price
      if (item.price === undefined) return true;
      
      // If max is set to the highest value, only check min
      if (max === 1000) {
        return typeof item.price === 'number' && item.price >= min;
      } 
      
      // Otherwise check if price is within range
      return typeof item.price === 'number' && item.price >= min && item.price <= max;
    });
  }

  return filtered;
};
