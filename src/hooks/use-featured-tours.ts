
import { useState, useEffect, useCallback, useRef } from "react";
import { useTours } from "@/hooks/use-tours";
import { adaptDBTourToComponentTour } from "@/utils/tourAdapter";
import { Tour } from "@/data/tours";

export const useFeaturedTours = (initialCategory: string = "Todos") => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const { featuredTours, isFeaturedLoading } = useTours();
  const [displayTours, setDisplayTours] = useState<Tour[]>([]);
  const lastActiveCategory = useRef(activeCategory);
  
  // Create a memoized filter function to prevent unnecessary recalculations
  const filterTours = useCallback((tours: Tour[], category: string) => {
    console.log(`Filtering tours for category: ${category}`);
    
    if (!tours) {
      console.log("No tours available to filter");
      return [];
    }
    
    if (category === "Todos") {
      console.log(`Showing all ${tours.length} tours`);
      return tours;
    }
    
    const normalizedCategory = category.toLowerCase().trim();
    
    const filtered = tours.filter(tour => {
      const normalizedTourCategory = tour.category.toLowerCase().trim();
      const isMatch = normalizedTourCategory.includes(normalizedCategory) || 
                      normalizedCategory.includes(normalizedTourCategory);
      
      console.log(`Tour ${tour.id} (${tour.title}) - Category: ${tour.category} - Match with ${category}: ${isMatch}`);
      
      return isMatch;
    });
    
    console.log(`Found ${filtered.length} tours for category "${category}"`);
    return filtered;
  }, []);
  
  // Handle category change
  const handleCategoryChange = useCallback((category: string) => {
    console.log(`Category changed from ${activeCategory} to ${category}`);
    setActiveCategory(category);
    lastActiveCategory.current = category;
  }, [activeCategory]);
  
  // Separate effect to update displayTours when tours or category changes
  useEffect(() => {
    if (!featuredTours) {
      console.log("Featured tours not loaded yet");
      return;
    }
    
    console.log(`Processing ${featuredTours.length} featured tours for category "${activeCategory}"`);
    
    // Convert from DB format to component format
    const componentTours = featuredTours.map(adaptDBTourToComponentTour);
    console.log("Converted tours:", componentTours.map(t => ({ id: t.id, title: t.title, category: t.category })));
    
    // Apply filtering
    const filtered = filterTours(componentTours, activeCategory);
    console.log(`Setting displayTours with ${filtered.length} tours`);
    
    // Force a clean state update by creating a new array
    setDisplayTours([...filtered]);
    
  }, [featuredTours, activeCategory, filterTours]);
  
  // Debug effect to monitor state changes
  useEffect(() => {
    console.log("displayTours updated:", displayTours.map(tour => tour.title));
  }, [displayTours]);

  return {
    activeCategory,
    displayTours,
    isFeaturedLoading,
    handleCategoryChange
  };
};
