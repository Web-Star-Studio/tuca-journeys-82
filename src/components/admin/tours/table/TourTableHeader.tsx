
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const TourTableHeader: React.FC = () => {
  return (
    <TableHeader className="bg-tuca-light-blue/30">
      <TableRow>
        <TableHead className="font-medium">ID</TableHead>
        <TableHead className="font-medium">Imagem</TableHead>
        <TableHead className="font-medium">Nome</TableHead>
        <TableHead className="font-medium">Categoria</TableHead>
        <TableHead className="font-medium">Preço</TableHead>
        <TableHead className="font-medium">Duração</TableHead>
        <TableHead className="font-medium">Avaliação</TableHead>
        <TableHead className="text-right font-medium">Ações</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default TourTableHeader;
