
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

interface AccommodationSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  typeFilter: string;
  setTypeFilter: (type: string) => void;
  onAddNewClick: () => void;
}

const AccommodationSearch: React.FC<AccommodationSearchProps> = ({
  searchQuery,
  setSearchQuery,
  typeFilter,
  setTypeFilter,
  onAddNewClick,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white p-4 rounded-md border">
      <div className="flex flex-1 gap-4 w-full sm:w-auto">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar hospedagens..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={typeFilter}
          onValueChange={setTypeFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os tipos</SelectItem>
            <SelectItem value="hotel">Hotel</SelectItem>
            <SelectItem value="pousada">Pousada</SelectItem>
            <SelectItem value="resort">Resort</SelectItem>
            <SelectItem value="apartamento">Apartamento</SelectItem>
            <SelectItem value="casa">Casa</SelectItem>
            <SelectItem value="chalé">Chalé</SelectItem>
            <SelectItem value="villa">Villa</SelectItem>
            <SelectItem value="hostel">Hostel</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={onAddNewClick} className="w-full sm:w-auto">
        <Plus className="h-4 w-4 mr-2" />
        Nova Hospedagem
      </Button>
    </div>
  );
};

export default AccommodationSearch;
