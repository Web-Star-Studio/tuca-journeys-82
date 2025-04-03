
import React from "react";
import { Search, Filter, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UserFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAddUserClick?: () => void;
}

const UserFilters = ({ searchQuery, setSearchQuery, onAddUserClick }: UserFiltersProps) => {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar usuários..."
            className="pl-10 w-full md:w-80"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      <Button className="gap-1" onClick={onAddUserClick}>
        <Plus className="h-4 w-4" />
        <span>Novo Usuário</span>
      </Button>
    </div>
  );
};

export default UserFilters;
