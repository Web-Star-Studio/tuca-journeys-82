
import React from "react";
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";

const BookingsTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Item</TableHead>
        <TableHead>Data</TableHead>
        <TableHead>Valor</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="text-right">Ações</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default BookingsTableHeader;
