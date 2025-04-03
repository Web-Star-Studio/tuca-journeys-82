
import React from "react";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PackageSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  onAddNewClick: () => void;
}

const PackageSearch: React.FC<PackageSearchProps> = ({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  onAddNewClick,
}) => {
  // Get package categories
  const categories = [
    { value: "all", label: "Todos" }, // Changed from empty string to "all"
    { value: "romantic", label: "Romântico" },
    { value: "adventure", label: "Aventura" },
    { value: "family", label: "Família" },
    { value: "premium", label: "Premium" },
    { value: "budget", label: "Econômico" },
  ];

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar pacotes..."
            className="pl-10 w-full md:w-80"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button className="gap-1" onClick={onAddNewClick}>
        <Plus className="h-4 w-4" />
        <span>Novo Pacote</span>
      </Button>
    </div>
  );
};

export default PackageSearch;
