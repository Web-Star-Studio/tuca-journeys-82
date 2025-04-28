
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { User } from "@/components/admin/users/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Pencil, Trash } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UsersTableProps {
  users: User[];
  isLoading?: boolean;
  permissions?: Record<string, string[]>;
  isMasterUser?: boolean;
  actions: {
    onEmailClick: (user: User) => void;
    onEditClick: (user: User) => void;
    onDeleteClick: (user: User) => void;
    onRoleChange?: (userId: string, newRole: string) => void;
    onPermissionToggle?: (userId: string, permission: string, hasPermission: boolean) => void;
    onPromoteMaster?: (userId: string) => void;
  };
}

const UsersTable: React.FC<UsersTableProps> = ({ 
  users, 
  isLoading, 
  permissions = {}, 
  isMasterUser = false, 
  actions 
}) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy');
    } catch {
      return dateString;
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map(part => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-blue-100 text-blue-800";
      case "master":
        return "bg-purple-100 text-purple-800";
      case "partner":
        return "bg-amber-100 text-amber-800";
      case "customer":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "admin": return "Administrador";
      case "master": return "Master";
      case "partner": return "Parceiro";
      case "customer": return "Cliente";
      default: return role;
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-md border bg-white">
        <div className="p-4">
          <div className="space-y-3">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!users.length) {
    return (
      <div className="rounded-md border bg-white">
        <div className="p-8 text-center">
          <p className="text-muted-foreground">Nenhum usuário encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Usuário</TableHead>
            <TableHead>Função</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div>{user.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {user.email}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {actions.onRoleChange ? (
                  <Select 
                    value={user.role} 
                    onValueChange={(value) => actions.onRoleChange?.(user.id, value)}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Selecionar papel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Cliente</SelectItem>
                      <SelectItem value="partner">Parceiro</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                      {isMasterUser && <SelectItem value="master">Master</SelectItem>}
                    </SelectContent>
                  </Select>
                ) : (
                  <span 
                    className={`px-2 py-1 rounded-full text-xs ${getRoleBadgeClass(user.role)}`}
                  >
                    {getRoleDisplayName(user.role)}
                  </span>
                )}
              </TableCell>
              <TableCell>
                <span 
                  className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(user.status)}`}
                >
                  {user.status === 'active' ? 'Ativo' : 'Inativo'}
                </span>
              </TableCell>
              <TableCell>{formatDate(user.created_at)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => actions.onEmailClick(user)}
                    title="Enviar email"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => actions.onEditClick(user)}
                    title="Editar"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-red-50 hover:text-red-600"
                    onClick={() => actions.onDeleteClick(user)}
                    title="Excluir"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
