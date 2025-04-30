
import React, { ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import { AccommodationFilters } from "@/types/accommodation";

interface AccommodationSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  typeFilter: string;
  setTypeFilter: (type: string) => void;
  onAddNewClick: () => void;
  filters: AccommodationFilters;
  applyFilters: (filters: Partial<AccommodationFilters>) => void;
  accommodationTypes: string[];
  priceRange: { min: number, max: number };
  isProcessing?: boolean;
  children?: ReactNode;
}

const AccommodationSearch: React.FC<AccommodationSearchProps> = ({
  searchQuery,
  setSearchQuery,
  typeFilter,
  setTypeFilter,
  onAddNewClick,
  filters,
  applyFilters,
  accommodationTypes,
  priceRange,
  isProcessing = false,
  children
}) => {
  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    
    // Apply search filter after a short delay
    const timerId = setTimeout(() => {
      applyFilters({ searchQuery: e.target.value });
    }, 300);
    
    return () => clearTimeout(timerId);
  };
  
  return (
    <div className="space-y-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Hospedagens</h2>
        <Button 
          onClick={onAddNewClick}
          disabled={isProcessing}
          className="bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Hospedagem
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar hospedagens..."
            className="pl-8"
            value={searchQuery}
            onChange={handleSearchChange}
            disabled={isProcessing}
          />
        </div>
        
        <div className="flex flex-row gap-2">
          {/* Accomodation type filter */}
          <select
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-tuca-ocean-blue"
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              applyFilters({ type: e.target.value });
            }}
            disabled={isProcessing}
          >
            <option value="all">Todos os tipos</option>
            {accommodationTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          
          <Button
            variant="outline"
            size="icon"
            disabled={isProcessing}
            onClick={() => {
              // Open advanced filters modal/drawer
              console.log("Open advanced filters");
            }}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {children}
    </div>
  );
};

export default AccommodationSearch;
