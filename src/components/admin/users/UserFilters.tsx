
import React, { useState } from "react";
import { Search, Filter, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

interface UserFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAddUserClick?: () => void;
  roleFilter: string;
  setRoleFilter: (role: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

const UserFilters = ({ 
  searchQuery, 
  setSearchQuery, 
  onAddUserClick,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter
}: UserFiltersProps) => {
  const [open, setOpen] = useState(false);
  
  // Count active filters
  const activeFiltersCount = 
    (roleFilter !== "all" ? 1 : 0) + 
    (statusFilter !== "all" ? 1 : 0);

  // Reset all filters
  const resetFilters = () => {
    setRoleFilter("all");
    setStatusFilter("all");
  };

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar usuários..."
            className="pl-10 w-full md:w-80"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-1 relative">
              <Filter className="h-4 w-4" />
              <span>Filtros</span>
              {activeFiltersCount > 0 && (
                <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-tuca-ocean-blue text-white">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Filtros</h4>
                {activeFiltersCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-2 text-xs"
                    onClick={resetFilters}
                  >
                    <X className="mr-1 h-3 w-3" />
                    Limpar filtros
                  </Button>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Função</label>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as funções" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as funções</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="customer">Cliente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-end">
                <Button size="sm" onClick={() => setOpen(false)}>Aplicar filtros</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <Button className="gap-1" onClick={onAddUserClick}>
        <Plus className="h-4 w-4" />
        <span>Novo Usuário</span>
      </Button>
    </div>
  );
};

export default UserFilters;
