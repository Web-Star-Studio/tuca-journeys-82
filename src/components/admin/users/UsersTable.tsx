
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

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
  avatar: string | null;
}

interface UsersTableProps {
  users: User[];
  onDeleteClick: (user: User) => void;
}

const UsersTable = ({ users, onDeleteClick }: UsersTableProps) => {
  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuário</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Função</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data de Cadastro</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
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
                <TableCell>
                  <Badge
                    variant={user.role === "admin" ? "default" : "outline"}
                    className={user.role === "admin" ? "bg-tuca-ocean-blue" : ""}
                  >
                    {user.role === "admin" ? "Administrador" : "Cliente"}
                  </Badge>
                </TableCell>
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
                <TableCell>{new Date(user.created_at).toLocaleDateString("pt-BR")}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-tuca-ocean-blue"
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-blue-600"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-600"
                      onClick={() => onDeleteClick(user)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
