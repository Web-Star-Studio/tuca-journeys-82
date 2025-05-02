
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { RestaurantTable } from '@/types/restaurant';

interface TableListProps {
  tables: RestaurantTable[];
  onEdit: (table: RestaurantTable) => void;
  onDelete: (tableId: number) => void;
}

const TableList: React.FC<TableListProps> = ({
  tables,
  onEdit,
  onDelete
}) => {
  if (tables.length === 0) {
    return (
      <div className="text-center py-8 bg-muted/20 rounded-lg">
        <p className="text-muted-foreground">Nenhuma mesa cadastrada</p>
        <p className="text-sm text-muted-foreground mt-2">
          Clique em "Adicionar Mesa" para cadastrar a primeira mesa
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Número</TableHead>
          <TableHead>Capacidade</TableHead>
          <TableHead>Localização</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tables.map((table) => (
          <TableRow key={table.id}>
            <TableCell className="font-medium">{table.table_number}</TableCell>
            <TableCell>{table.capacity} lugares</TableCell>
            <TableCell>{formatLocation(table.location)}</TableCell>
            <TableCell>
              <StatusBadge isActive={table.is_active} />
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(table)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onDelete(table.id)}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const formatLocation = (location: string): string => {
  switch (location.toLowerCase()) {
    case 'indoor':
      return 'Interno';
    case 'outdoor':
      return 'Externo';
    case 'terrace':
      return 'Terraço';
    case 'window':
      return 'Janela';
    case 'bar':
      return 'Bar';
    case 'private':
      return 'Área Privativa';
    default:
      return location;
  }
};

const StatusBadge: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  if (isActive) {
    return <Badge variant="default" className="bg-green-600">Disponível</Badge>;
  }
  return <Badge variant="secondary">Indisponível</Badge>;
};

export default TableList;
