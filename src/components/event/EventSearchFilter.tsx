
import React, { useState } from "react";
import { Search, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { EventFilters } from "@/types/event";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface EventSearchFilterProps {
  categories: string[];
  filters: EventFilters;
  onFilterChange: (filters: Partial<EventFilters>) => void;
  isLoading?: boolean;
}

const EventSearchFilter = ({
  categories,
  filters,
  onFilterChange,
  isLoading = false,
}: EventSearchFilterProps) => {
  const [searchInput, setSearchInput] = useState(filters.searchQuery || "");
  const [dateRange, setDateRange] = useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({
    startDate: filters.startDate ? new Date(filters.startDate) : undefined,
    endDate: filters.endDate ? new Date(filters.endDate) : undefined,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ searchQuery: searchInput });
  };

  const handleDateChange = (value: Date | undefined, isStart: boolean) => {
    let newRange;
    
    if (isStart) {
      newRange = { 
        ...dateRange, 
        startDate: value,
        // If end date is before start date, reset end date
        endDate: value && dateRange.endDate && value > dateRange.endDate ? undefined : dateRange.endDate
      };
    } else {
      newRange = { 
        ...dateRange, 
        endDate: value,
        // If start date is after end date, reset start date
        startDate: value && dateRange.startDate && value < dateRange.startDate ? undefined : dateRange.startDate
      };
    }
    
    setDateRange(newRange);
    
    // Convert dates to strings for the filter
    const startDateStr = newRange.startDate ? format(newRange.startDate, 'yyyy-MM-dd') : undefined;
    const endDateStr = newRange.endDate ? format(newRange.endDate, 'yyyy-MM-dd') : undefined;
    
    onFilterChange({
      startDate: startDateStr,
      endDate: endDateStr
    });
  };

  const handleFilterClear = () => {
    setSearchInput("");
    setDateRange({ startDate: undefined, endDate: undefined });
    onFilterChange({
      searchQuery: "",
      category: "Todas",
      startDate: undefined,
      endDate: undefined,
    });
  };

  // Check if any filters are active
  const hasActiveFilters = 
    (filters.searchQuery && filters.searchQuery !== "") || 
    (filters.category && filters.category !== "Todas") ||
    filters.startDate || 
    filters.endDate;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar eventos..."
            className="pl-10"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <Select
          disabled={isLoading}
          value={filters.category}
          onValueChange={(value) => onFilterChange({ category: value })}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              {dateRange.startDate && dateRange.endDate ? (
                <>
                  {format(dateRange.startDate, "dd/MM/yyyy")} - {format(dateRange.endDate, "dd/MM/yyyy")}
                </>
              ) : dateRange.startDate ? (
                <>A partir de {format(dateRange.startDate, "dd/MM/yyyy")}</>
              ) : dateRange.endDate ? (
                <>Até {format(dateRange.endDate, "dd/MM/yyyy")}</>
              ) : (
                "Selecionar datas"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-sm font-medium">Data Início</h3>
                <CalendarComponent
                  mode="single"
                  selected={dateRange.startDate}
                  onSelect={(date) => handleDateChange(date, true)}
                  initialFocus
                />
              </div>
              <Separator />
              <div>
                <h3 className="text-sm font-medium">Data Fim</h3>
                <CalendarComponent
                  mode="single"
                  selected={dateRange.endDate}
                  onSelect={(date) => handleDateChange(date, false)}
                  disabled={(date) => 
                    dateRange.startDate ? date < dateRange.startDate : false
                  }
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Button type="submit" className="w-full md:w-auto">
          Buscar
        </Button>
      </form>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Filtros ativos:</span>
          
          {filters.searchQuery && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Busca: {filters.searchQuery}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onFilterChange({ searchQuery: "" })}
              />
            </Badge>
          )}
          
          {filters.category && filters.category !== "Todas" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Categoria: {filters.category}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onFilterChange({ category: "Todas" })}
              />
            </Badge>
          )}
          
          {(dateRange.startDate || dateRange.endDate) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Data: {dateRange.startDate ? format(dateRange.startDate, "dd/MM") : ""} 
              {dateRange.startDate && dateRange.endDate ? " - " : ""} 
              {dateRange.endDate ? format(dateRange.endDate, "dd/MM") : ""}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => {
                  setDateRange({ startDate: undefined, endDate: undefined });
                  onFilterChange({ startDate: undefined, endDate: undefined });
                }}
              />
            </Badge>
          )}
          
          <Button variant="ghost" size="sm" onClick={handleFilterClear} className="text-xs">
            Limpar todos
          </Button>
        </div>
      )}
    </div>
  );
};

export default EventSearchFilter;
