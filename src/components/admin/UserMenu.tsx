
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User, LogOut, Settings, UserCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSignOut } from "@/hooks/auth/use-sign-out";
import { useToast } from "@/hooks/use-toast";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface UserMenuProps {
  user: SupabaseUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const { signOut } = useSignOut();
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  
  if (!user) return null;
  
  // Get user display name, use email if no name is available
  const displayName = user.user_metadata?.name || user.email || "Usuário";
  
  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split("@")[0] // Remove domain part if it's an email
      .substring(0, 2)
      .toUpperCase();
  };
  
  const handleSignOut = async () => {
    try {
      const result = await signOut();
      
      if (result.success) {
        toast({
          title: "Logout realizado",
          description: "Você foi desconectado com sucesso."
        });
        
        // Navigate to login page
        navigate('/login', { replace: true });
      } else {
        throw new Error("Falha ao fazer logout");
      }
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Erro",
        description: "Não foi possível realizar o logout.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-tuca-ocean-blue">
          <Avatar className="h-8 w-8">
            <AvatarImage 
              src={user.user_metadata?.avatar_url}
              alt={displayName}
            />
            <AvatarFallback className="bg-tuca-light-blue text-tuca-deep-blue">
              {getInitials(displayName)}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{displayName}</span>
            <span className="text-xs text-gray-500">{user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link 
            to={location.pathname.startsWith('/admin') ? "/" : "/admin/profile"} 
            className="flex items-center cursor-pointer"
          >
            <UserCircle className="mr-2 h-4 w-4" />
            <span>{location.pathname.startsWith('/admin') ? "Home" : "Perfil"}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/admin/settings" className="flex items-center cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Configurações</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-red-600 focus:text-red-600 cursor-pointer"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
