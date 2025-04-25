
import React from "react";
import { AlertCircle } from "lucide-react";

const AccommodationErrorState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-muted-foreground py-12">
      <AlertCircle className="h-12 w-12 mb-4 text-red-500" />
      <p className="text-lg font-medium">Erro ao carregar hospedagens</p>
      <p className="text-sm mt-1">Por favor, tente novamente mais tarde.</p>
    </div>
  );
};

export default AccommodationErrorState;
