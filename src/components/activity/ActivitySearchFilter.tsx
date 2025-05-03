
import React from "react";
import { Search, Calendar, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ActivityFilters } from "@/types/activity";
import { DatePicker } from "@/components/ui/date-picker";

interface ActivitySearchFilterProps {
  filters: ActivityFilters;
  onFilterChange: (filters: ActivityFilters) => void;
  categories: string[];
}

const ActivitySearchFilter = ({ filters, onFilterChange, categories }: ActivitySearchFilterProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchQuery: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, category: e.target.value });
  };

  const handleDateChange = (date: Date | null) => {
    onFilterChange({ ...filters, date });
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, difficulty: e.target.value });
  };

  const clearFilters = () => {
    onFilterChange({
      category: "",
      date: null,
      searchQuery: "",
      difficulty: ""
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Encontre a atividade perfeita</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Buscar atividades..."
            className="pl-10"
            value={filters.searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="relative">
          <select
            className="w-full h-10 pl-3 pr-10 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-tuca-ocean-blue"
            value={filters.category}
            onChange={handleCategoryChange}
          >
            <option value="">Todas as categorias</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div className="relative">
          <select
            className="w-full h-10 pl-3 pr-10 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-tuca-ocean-blue"
            value={filters.difficulty}
            onChange={handleDifficultyChange}
          >
            <option value="">Todos os níveis</option>
            <option value="fácil">Fácil</option>
            <option value="moderado">Moderado</option>
            <option value="difícil">Difícil</option>
            <option value="extremo">Extremo</option>
          </select>
        </div>

        <DatePicker
          date={filters.date}
          onSelect={handleDateChange}
          placeholder="Escolha a data"
        />
      </div>

      <div className="flex justify-end mt-4">
        <Button variant="outline" className="mr-2" onClick={clearFilters}>
          Limpar filtros
        </Button>
        <Button>
          <Filter className="mr-2" size={18} />
          Aplicar filtros
        </Button>
      </div>
    </div>
  );
};

export default ActivitySearchFilter;
