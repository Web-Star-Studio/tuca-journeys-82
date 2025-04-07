
import React from "react";
import { Button } from "@/components/ui/button";
import { FilterCategory, useMapFilters } from "@/contexts/MapFilterContext";
import { allCategories, getCategoryColor, getCategoryIcon, getCategoryLabel } from "../utils/categoryUtils";

const CategoryFilter = () => {
  const { filters, toggleCategory } = useMapFilters();

  return (
    <div className="flex flex-wrap gap-1 md:flex-nowrap">
      {allCategories.map((category) => (
        <Button
          key={category}
          size="sm"
          variant={filters.categories.includes(category) ? "default" : "outline"}
          className={`flex items-center gap-1 text-xs md:text-sm ${filters.categories.includes(category) ? getCategoryColor(category) : ''}`}
          onClick={() => toggleCategory(category)}
        >
          {getCategoryIcon(category)}
          <span className="hidden md:inline">{getCategoryLabel(category)}</span>
          <span className="md:hidden">{getCategoryLabel(category).substring(0, 3)}</span>
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
