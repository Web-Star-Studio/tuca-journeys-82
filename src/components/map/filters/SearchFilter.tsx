
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useMapFilters } from "@/contexts/MapFilterContext";

const SearchFilter = () => {
  const { setSearchQuery } = useMapFilters();
  const [searchInputValue, setSearchInputValue] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInputValue);
  };

  const handleClearSearch = () => {
    setSearchInputValue("");
    setSearchQuery("");
  };

  return (
    <form onSubmit={handleSearch} className="flex-1">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          value={searchInputValue}
          onChange={(e) => setSearchInputValue(e.target.value)}
          placeholder="Buscar em Fernando de Noronha"
          className="pl-9 pr-9"
        />
        {searchInputValue && (
          <button 
            type="button"
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchFilter;
