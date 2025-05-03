
import React from "react";
import { FolderOpen } from "lucide-react";

const ActivityEmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-muted-foreground py-12">
      <FolderOpen className="h-12 w-12 mb-4 text-tuca-light-blue" />
      <p className="text-lg font-medium">Nenhuma atividade encontrada</p>
      <p className="text-sm mt-1">Adicione uma nova atividade para começar.</p>
    </div>
  );
};

export default ActivityEmptyState;
