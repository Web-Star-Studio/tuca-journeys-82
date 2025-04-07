
import React, { createContext, useContext, useState, ReactNode } from "react";

export type FilterCategory = "tours" | "accommodations" | "restaurants" | "beaches" | "attractions" | "events" | "museums" | "historical";
export type FilterPriceRange = "all" | "low" | "medium" | "high";
export type FilterRating = 1 | 2 | 3 | 4 | 5 | null;

export interface MapFiltersState {
  categories: FilterCategory[];
  priceRange: FilterPriceRange;
  rating: FilterRating;
  searchQuery: string;
}

interface MapFilterContextValue {
  filters: MapFiltersState;
  toggleCategory: (category: FilterCategory) => void;
  setPriceRange: (range: FilterPriceRange) => void;
  setRating: (rating: FilterRating) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

const defaultFilters: MapFiltersState = {
  categories: ["tours", "accommodations", "beaches", "events"],
  priceRange: "all",
  rating: null,
  searchQuery: "",
};

export const MapFilterContext = createContext<MapFilterContextValue | undefined>(undefined);

export const MapFilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<MapFiltersState>(defaultFilters);

  const toggleCategory = (category: FilterCategory) => {
    setFilters((prev) => {
      if (prev.categories.includes(category)) {
        return {
          ...prev,
          categories: prev.categories.filter((c) => c !== category),
        };
      } else {
        return {
          ...prev,
          categories: [...prev.categories, category],
        };
      }
    });
  };

  const setPriceRange = (range: FilterPriceRange) => {
    setFilters((prev) => ({ ...prev, priceRange: range }));
  };

  const setRating = (rating: FilterRating) => {
    setFilters((prev) => ({ ...prev, rating }));
  };

  const setSearchQuery = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <MapFilterContext.Provider
      value={{
        filters,
        toggleCategory,
        setPriceRange,
        setRating,
        setSearchQuery,
        resetFilters,
      }}
    >
      {children}
    </MapFilterContext.Provider>
  );
};

export const useMapFilters = () => {
  const context = useContext(MapFilterContext);
  if (context === undefined) {
    throw new Error("useMapFilters must be used within a MapFilterProvider");
  }
  return context;
};
