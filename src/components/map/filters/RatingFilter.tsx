
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Star } from "lucide-react";
import { FilterRating, useMapFilters } from "@/contexts/MapFilterContext";

const RatingFilter = () => {
  const { filters, setRating } = useMapFilters();
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          size="sm" 
          variant="outline"
          className="whitespace-nowrap"
        >
          Avaliação
          {filters.rating && (
            <Badge variant="secondary" className="ml-2">
              {filters.rating}+
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <div className="space-y-4">
          <h3 className="font-medium">Avaliação mínima</h3>
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 ${filters.rating && star <= filters.rating ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"}`}
                  onClick={() => setRating(star as FilterRating)}
                />
              ))}
            </div>
            {filters.rating && (
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setRating(null)}
              >
                Limpar
              </Button>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default RatingFilter;
