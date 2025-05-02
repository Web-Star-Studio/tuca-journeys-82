
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface RestaurantSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const RestaurantSearch: React.FC<RestaurantSearchProps> = ({
  searchQuery,
  onSearchChange
}) => {
  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        placeholder="Search restaurants..."
        className="pl-10"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default RestaurantSearch;
