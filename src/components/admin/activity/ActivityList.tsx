
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity } from "@/types/activity";
import { formatCurrency } from "@/utils/format-utils";
import { MoreHorizontal, Edit, Trash, Calendar } from "lucide-react";

interface ActivityListProps {
  activities: Activity[];
  onEdit: (activity: Activity) => void;
  onDelete: (activity: Activity) => void;
}

const ActivityList: React.FC<ActivityListProps> = ({
  activities,
  onEdit,
  onDelete,
}) => {
  if (!activities.length) {
    return (
      <div className="bg-muted/30 rounded-lg p-8 text-center">
        <h3 className="text-lg font-medium mb-2">Nenhuma atividade encontrada</h3>
        <p className="text-muted-foreground">Adicione uma nova atividade ou ajuste os filtros.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Atividade</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Participantes</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity) => (
            <TableRow key={activity.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <img 
                    src={activity.image_url || '/placeholder-activity.jpg'} 
                    alt={activity.title}
                    className="h-10 w-16 rounded object-cover"
                  />
                  <div>
                    <span className="font-medium block">{activity.title}</span>
                    <span className="text-xs text-muted-foreground">{activity.duration}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{activity.category}</TableCell>
              <TableCell>{formatCurrency(activity.price)}</TableCell>
              <TableCell>
                {activity.min_participants}-{activity.max_participants} pessoas
              </TableCell>
              <TableCell>
                <Badge variant={activity.is_active ? "default" : "secondary"}>
                  {activity.is_active ? "Ativo" : "Inativo"}
                </Badge>
                {activity.is_featured && (
                  <Badge variant="outline" className="ml-2 bg-yellow-100 text-yellow-800 border-yellow-200">
                    Destaque
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onEdit(activity)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onDelete(activity)}>
                      <Trash className="h-4 w-4 mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ActivityList;
