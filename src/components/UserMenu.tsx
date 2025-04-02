
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, LogOut, BookOpen, CreditCard } from "lucide-react";

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (!user) {
    return (
      <div className="flex space-x-2">
        <Link to="/login">
          <Button 
            variant="secondary" 
            size="sm"
            className="text-tuca-ocean-blue hover:text-tuca-deep-blue font-medium"
          >
            Entrar
          </Button>
        </Link>
        <Link to="/cadastro">
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-tuca-deep-blue to-tuca-ocean-blue hover:from-tuca-ocean-blue hover:to-tuca-deep-blue transition-all duration-300"
          >
            Cadastrar
          </Button>
        </Link>
      </div>
    );
  }

  const displayName = user.user_metadata?.name || user.email || "";
  const initials = displayName ? getInitials(displayName) : "UN";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-10 h-10 rounded-full">
          <Avatar className="w-10 h-10 border">
            <AvatarFallback className="bg-tuca-ocean-blue text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-2.5">
          <div className="font-medium">{displayName}</div>
          <div className="text-xs text-muted-foreground">{user.email}</div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/reservar" className="flex cursor-pointer">
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Minhas Reservas</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/perfil" className="flex cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Meu Perfil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/pagamentos" className="flex cursor-pointer">
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Meus Pagamentos</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
