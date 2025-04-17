
import React from "react";
import { TableHead } from "@/components/ui/table";

const BookingsTableHeader: React.FC = () => {
  return (
    <thead className="bg-gray-50">
      <tr>
        <TableHead className="py-3">Item</TableHead>
        <TableHead>Data</TableHead>
        <TableHead>Valor</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="text-right">Ações</TableHead>
      </tr>
    </thead>
  );
};

export default BookingsTableHeader;
