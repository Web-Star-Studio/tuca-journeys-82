
import React from "react";
import { AlertTriangle } from "lucide-react";

const TourErrorState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-2 text-destructive">
      <AlertTriangle className="h-8 w-8" />
      <p>Erro ao carregar passeios. Tente novamente mais tarde.</p>
    </div>
  );
};

export default TourErrorState;
