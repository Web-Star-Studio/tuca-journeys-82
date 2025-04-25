
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { categories } from "@/data/events";

interface EventSearchFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  // Add these new props to match Events.tsx
  activeCategory?: string;
  categories?: string[];
  onSearchChange?: (query: string) => void;
  onCategoryChange?: (category: string) => void;
}

const EventSearchFilter = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory,
  // Add fallback handling for the new props
  activeCategory,
  categories: categoryOptions,
  onSearchChange,
  onCategoryChange
}: EventSearchFilterProps) => {
  // Handle both API styles
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearchChange) onSearchChange(value);
  };
  
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (onCategoryChange) onCategoryChange(value);
  };
  
  // Use activeCategory as fallback if provided
  const effectiveCategory = activeCategory || selectedCategory;
  
  // Use provided categories or default to imported categories
  const categoriesList = categoryOptions || categories;
  
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar eventos..."
          className="pl-10"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <Select value={effectiveCategory} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Categoria" />
        </SelectTrigger>
        <SelectContent>
          {categoriesList.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default EventSearchFilter;
