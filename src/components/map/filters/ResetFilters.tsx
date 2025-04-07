
import React from "react";
import { Button } from "@/components/ui/button";
import { useMapFilters } from "@/contexts/MapFilterContext";

const ResetFilters = () => {
  const { resetFilters } = useMapFilters();
  
  return (
    <Button 
      size="sm" 
      variant="ghost"
      onClick={resetFilters}
      className="whitespace-nowrap"
    >
      Limpar filtros
    </Button>
  );
};

export default ResetFilters;
