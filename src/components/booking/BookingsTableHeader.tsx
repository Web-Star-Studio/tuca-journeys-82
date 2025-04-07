
import React from "react";
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { useIsBelowBreakpoint } from "@/hooks/use-mobile";

const BookingsTableHeader = () => {
  const isMobile = useIsBelowBreakpoint("md");
  
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Item</TableHead>
        <TableHead>Data</TableHead>
        {!isMobile && <TableHead>Valor</TableHead>}
        <TableHead>Status</TableHead>
        <TableHead className="text-right">Ações</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default BookingsTableHeader;
