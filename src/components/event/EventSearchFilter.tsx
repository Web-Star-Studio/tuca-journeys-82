
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface EventSearchFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories?: string[];
  onSearchChange?: (query: string) => void;
  onCategoryChange?: (category: string) => void;
  activeCategory?: string;
}

const EventSearchFilter: React.FC<EventSearchFilterProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories = ['Todas', 'Música', 'Esporte', 'Cultural', 'Educativo', 'Gastronomia', 'Festival'],
  onSearchChange,
  onCategoryChange,
  activeCategory = 'Todas'
}) => {
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearchChange) {
      onSearchChange(query);
    }
  };

  return (
    <div className="mb-8">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Buscar eventos..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="pl-10 py-6 text-base"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === selectedCategory
                ? 'bg-tuca-ocean-blue text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventSearchFilter;
