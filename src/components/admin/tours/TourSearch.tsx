
import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TourSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const TourSearch: React.FC<TourSearchProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar passeios..."
          className="pl-10 w-full md:w-80"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Button variant="outline" size="icon">
        <Filter className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TourSearch;
