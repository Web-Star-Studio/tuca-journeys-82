
import React from "react";
import { Hotel } from "lucide-react";

const AccommodationEmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-muted-foreground py-12">
      <Hotel className="h-12 w-12 mb-4 text-tuca-light-blue" />
      <p className="text-lg font-medium">Nenhuma hospedagem encontrada</p>
      <p className="text-sm mt-1">Adicione uma nova hospedagem para começar.</p>
    </div>
  );
};

export default AccommodationEmptyState;
