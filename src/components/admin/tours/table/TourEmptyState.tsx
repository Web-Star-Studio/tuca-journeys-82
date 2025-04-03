
import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { FolderOpen } from "lucide-react";

const TourEmptyState: React.FC = () => {
  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={8} className="h-32 text-center">
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <FolderOpen className="h-8 w-8 mb-2 text-tuca-light-blue" />
            <p>Nenhum passeio encontrado.</p>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default TourEmptyState;
