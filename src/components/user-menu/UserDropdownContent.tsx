
import React from "react";
import { Link } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { BookOpen, User as UserIcon, CreditCard, LogOut } from "lucide-react";

interface UserDropdownContentProps {
  user: User;
  onSignOut: () => Promise<void>;
}

const UserDropdownContent = ({ user, onSignOut }: UserDropdownContentProps) => {
  const displayName = user.user_metadata?.name || user.email || "";
  
  return (
    <DropdownMenuContent align="end" className="w-56 shadow-lg border-tuca-light-blue/20">
      <div className="px-3 py-2.5 border-b border-tuca-light-blue/10">
        <div className="font-medium text-tuca-deep-blue">{displayName}</div>
        <div className="text-xs text-muted-foreground">{user.email}</div>
      </div>
      
      <div className="p-1">
        <DropdownMenuItem asChild>
          <Link to="/reservar" className="flex cursor-pointer hover:bg-tuca-light-blue hover:text-tuca-deep-blue transition-colors rounded-md">
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Minhas Reservas</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link to="/perfil" className="flex cursor-pointer hover:bg-tuca-light-blue hover:text-tuca-deep-blue transition-colors rounded-md">
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Meu Perfil</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link to="/pagamentos" className="flex cursor-pointer hover:bg-tuca-light-blue hover:text-tuca-deep-blue transition-colors rounded-md">
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Meus Pagamentos</span>
          </Link>
        </DropdownMenuItem>
      </div>
      
      <DropdownMenuSeparator />
      
      <div className="p-1">
        <DropdownMenuItem 
          onClick={onSignOut} 
          className="cursor-pointer hover:bg-red-50 hover:text-red-600 transition-colors rounded-md"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </div>
    </DropdownMenuContent>
  );
};

export default UserDropdownContent;
