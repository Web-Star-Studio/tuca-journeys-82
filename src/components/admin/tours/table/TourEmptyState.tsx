
import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

const TourEmptyState: React.FC = () => {
  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={8} className="h-24 text-center">
          Nenhum passeio encontrado.
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default TourEmptyState;
