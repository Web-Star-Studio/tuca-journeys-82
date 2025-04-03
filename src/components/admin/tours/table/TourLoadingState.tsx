
import React from "react";
import { Loader2 } from "lucide-react";

const TourLoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-2">
      <Loader2 className="h-8 w-8 animate-spin text-tuca-ocean-blue" />
      <p className="text-muted-foreground">Carregando passeios...</p>
    </div>
  );
};

export default TourLoadingState;
