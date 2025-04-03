
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const TourTableHeader: React.FC = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Imagem</TableHead>
        <TableHead>Nome</TableHead>
        <TableHead>Categoria</TableHead>
        <TableHead>Preço</TableHead>
        <TableHead>Duração</TableHead>
        <TableHead>Avaliação</TableHead>
        <TableHead className="text-right">Ações</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default TourTableHeader;
