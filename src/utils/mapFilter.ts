import { MapFilters } from "@/components/map/utils/mapFilter";

// Helper function to calculate distance between two points in kilometers
const calculateDistance = (
  point1: [number, number], 
  point2: [number, number]
): number => {
  // Haversine formula to calculate distance between two points on Earth
  const toRadians = (degrees: number) => degrees * (Math.PI / 180);
  
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(point2[1] - point1[1]);
  const dLon = toRadians(point2[0] - point1[0]);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRadians(point1[1])) * Math.cos(toRadians(point2[1])) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in kilometers
  
  return distance;
};

export const filterMapData = (data: any[], filters: MapFilters) => {
  // Start with all data
  let filtered = [...data];

  // Filter by search term if provided
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      item => 
        (item.name && item.name.toLowerCase().includes(searchLower)) || 
        (item.description && item.description.toLowerCase().includes(searchLower)) ||
        (item.title && item.title.toLowerCase().includes(searchLower))
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

  // Filter by distance if set
  if (filters.distanceFilter && filters.distanceFilter.center && filters.distanceFilter.maxDistance > 0) {
    filtered = filtered.filter(item => {
      // Skip if the item doesn't have coordinates
      if (!item.coordinates) return true;
      
      const distance = calculateDistance(item.coordinates, filters.distanceFilter!.center);
      return distance <= filters.distanceFilter!.maxDistance;
    });
  }

  // Filter by date if set (for events)
  if (filters.dateFilter && filters.dateFilter.startDate && filters.dateFilter.endDate) {
    const startDate = new Date(filters.dateFilter.startDate);
    const endDate = new Date(filters.dateFilter.endDate);
    
    filtered = filtered.filter(item => {
      // Only filter items that have a date property (like events)
      if (!item.date) return true;
      
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    });
  }

  return filtered;
};
