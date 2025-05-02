
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { activityService } from '@/services/activity-service';

/**
 * Hook for searching activities
 */
export const useSearchActivities = (initialFilters = {}) => {
  const [searchParams, setSearchParams] = useState({
    query: '',
    category: 'Todos',
    sortBy: 'recommended',
    minPrice: undefined,
    maxPrice: undefined,
    difficulty: '',
    ...initialFilters,
  });

  const [selectedCategory, setSelectedCategory] = useState(searchParams.category);

  const { data: activities, isLoading } = useQuery({
    queryKey: ['search-activities', searchParams],
    queryFn: () => activityService.searchActivities(searchParams),
  });

  // Function to update search params
  const updateSearch = (newParams) => {
    setSearchParams((prev) => ({ ...prev, ...newParams }));
  };

  // Function to handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    updateSearch({ category });
  };

  return {
    activities,
    isLoading,
    searchParams,
    updateSearch,
    selectedCategory,
    handleCategoryChange,
  };
};

/**
 * Hook for featured activities
 */
export const useFeaturedActivities = (limit = 6) => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  
  const { data: featuredActivities, isLoading: isFeaturedLoading } = useQuery({
    queryKey: ['featured-activities', limit],
    queryFn: () => activityService.getFeaturedActivities(limit),
  });
  
  // Filter activities by category
  const displayActivities = featuredActivities
    ? activeCategory === 'Todos'
      ? featuredActivities
      : featuredActivities.filter(activity => activity.category === activeCategory)
    : [];

  return {
    featuredActivities,
    displayActivities,
    activeCategory,
    handleCategoryChange: setActiveCategory,
    isFeaturedLoading
  };
};
