
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Settings, Heart, ShoppingBag } from 'lucide-react';

const UserMenu = () => {
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    try {
      // Clear any potential localStorage items first
      localStorage.removeItem("supabase-mock-session");
      localStorage.removeItem("supabase.auth.token");
      
      // Use the context's signOut function
      await signOut();
      
      // Force navigate to login page and replace history to prevent back navigation
      navigate('/login', { replace: true });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // If user is not logged in, show login button
  if (!user) {
    return (
      <Button variant="default" onClick={() => navigate('/login')}>
        Login
      </Button>
    );
  }

  // Otherwise, show user menu
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-tuca-ocean-blue text-white">
              {user.user_metadata?.name ? getInitials(user.user_metadata.name) : <User />}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{user.user_metadata?.name || 'Usuário'}</p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to={isAdmin ? "/admin/dashboard" : "/dashboard"} className="cursor-pointer flex w-full items-center">
            <User className="mr-2 h-4 w-4" />
            {isAdmin ? "Painel Admin" : "Painel do Usuário"}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/profile" className="cursor-pointer flex w-full items-center">
            <Settings className="mr-2 h-4 w-4" />
            Perfil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/wishlist" className="cursor-pointer flex w-full items-center">
            <Heart className="mr-2 h-4 w-4" />
            Favoritos
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/orders" className="cursor-pointer flex w-full items-center">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Pedidos
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
