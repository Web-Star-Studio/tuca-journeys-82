
import React from "react";
import { FolderOpen } from "lucide-react";

const TourEmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-muted-foreground py-12">
      <FolderOpen className="h-12 w-12 mb-4 text-tuca-light-blue" />
      <p className="text-lg font-medium">Nenhum passeio encontrado</p>
      <p className="text-sm mt-1">Adicione um novo passeio para começar.</p>
    </div>
  );
};

export default TourEmptyState;
