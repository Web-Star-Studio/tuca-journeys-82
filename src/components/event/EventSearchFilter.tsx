
import React from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface EventSearchFilterProps {
  searchQuery: string;
  activeCategory: string;
  categories: string[];
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
}

const EventSearchFilter = ({ 
  searchQuery, 
  activeCategory, 
  categories,
  onSearchChange,
  onCategoryChange
}: EventSearchFilterProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar eventos..."
          className="pl-10 pr-4 py-2 border rounded-full w-full md:w-80"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={category === activeCategory ? "default" : "outline"}
            className={
              category === activeCategory
                ? "rounded-full bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90 text-white"
                : "rounded-full text-foreground hover:bg-background hover:text-tuca-ocean-blue"
            }
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default EventSearchFilter;
