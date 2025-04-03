
import React from "react";
import { Mail, Edit, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, UserTableActions } from "./types";

interface UsersTableProps {
  users: User[];
  actions?: UserTableActions;
  showActions?: boolean;
  showRole?: boolean;
  showStatus?: boolean;
  showDate?: boolean;
}

const UsersTable = ({ 
  users, 
  actions = {},
  showActions = true,
  showRole = true,
  showStatus = true,
  showDate = true,
}: UsersTableProps) => {
  const { onEmailClick, onEditClick, onDeleteClick } = actions;
  
  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Get role display name
  const getRoleDisplayName = (role: string) => {
    return role === "admin" ? "Administrador" : "Cliente";
  };

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuário</TableHead>
            <TableHead>Email</TableHead>
            {showRole && <TableHead>Função</TableHead>}
            {showStatus && <TableHead>Status</TableHead>}
            {showDate && <TableHead>Data de Cadastro</TableHead>}
            {showActions && <TableHead className="text-right">Ações</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={showActions ? 6 : 5} className="h-24 text-center">
                Nenhum usuário encontrado.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar || undefined} />
                      <AvatarFallback className="bg-tuca-light-blue text-tuca-deep-blue">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                {showRole && (
                  <TableCell>
                    <Badge
                      variant={user.role === "admin" ? "default" : "outline"}
                      className={user.role === "admin" ? "bg-tuca-ocean-blue" : ""}
                    >
                      {getRoleDisplayName(user.role)}
                    </Badge>
                  </TableCell>
                )}
                {showStatus && (
                  <TableCell>
                    <div className="flex items-center">
                      {user.status === "active" ? (
                        <Badge variant="outline" className="border-green-500 text-green-600 flex items-center">
                          <Check className="mr-1 h-3 w-3" /> Ativo
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-gray-400 text-gray-500 flex items-center">
                          <X className="mr-1 h-3 w-3" /> Inativo
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                )}
                {showDate && (
                  <TableCell>{new Date(user.created_at).toLocaleDateString("pt-BR")}</TableCell>
                )}
                {showActions && (
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {onEmailClick && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-tuca-ocean-blue"
                          onClick={() => onEmailClick(user)}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                      )}
                      {onEditClick && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-blue-600"
                          onClick={() => onEditClick(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {onDeleteClick && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600"
                          onClick={() => onDeleteClick(user)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
