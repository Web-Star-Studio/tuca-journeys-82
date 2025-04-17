
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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
  onCategoryChange,
}: EventSearchFilterProps) => {
  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-medium">Eventos e Experiências</h2>
        
        <div className="relative w-full md:w-auto md:min-w-[300px]">
          <Input
            type="search"
            placeholder="Pesquisar eventos..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-white/90 border-gray-200 focus:border-tuca-ocean-blue transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            className={`rounded-full text-sm py-1.5 px-4 cursor-pointer hover:bg-tuca-light-blue/80 transition-all ${
              activeCategory === category 
                ? "bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90" 
                : "hover:text-tuca-ocean-blue"
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default EventSearchFilter;
