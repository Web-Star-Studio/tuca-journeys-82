
import React from "react";
import { Button } from "@/components/ui/button";

interface NoToursFoundProps {
  category: string;
  onReset: () => void;
}

const NoToursFound = ({ category, onReset }: NoToursFoundProps) => {
  return (
    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
      <h3 className="text-xl font-medium mb-3">Nenhum passeio na categoria {category}</h3>
      <p className="text-muted-foreground mb-6">
        No momento não temos passeios em destaque nesta categoria.
      </p>
      <Button 
        variant="outline" 
        className="rounded-full"
        onClick={onReset}
      >
        Ver todos os passeios
      </Button>
    </div>
  );
};

export default NoToursFound;
