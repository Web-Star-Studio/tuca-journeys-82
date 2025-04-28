
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, ShieldCheck } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Settings, Heart, ShoppingBag, LayoutDashboard } from 'lucide-react';
import { hasPermission } from '@/lib/role-helpers';

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMaster, setIsMaster] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const checkPermissions = async () => {
      if (user) {
        const [masterResult, adminResult] = await Promise.all([
          hasPermission(user.id, 'master'),
          hasPermission(user.id, 'admin')
        ]);
        setIsMaster(masterResult);
        setIsAdmin(adminResult || masterResult); // Master users are also admins
      }
    };
    
    checkPermissions();
  }, [user]);
  
  const handleLogout = async () => {
    const result = await signOut();
    if (result.success) {
      navigate('/login');
    }
  };

  // Define the dashboard link and text based on user role
  const getDashboardInfo = () => {
    if (isMaster) {
      return {
        path: "/admin/permissions",
        text: "Painel Admin Master"
      };
    } else if (isAdmin) {
      return {
        path: "/admin/dashboard",
        text: "Painel Admin"
      };
    } else {
      return {
        path: "/dashboard",
        text: "Painel do Usuário"
      };
    }
  };

  const dashboardInfo = getDashboardInfo();

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
          {isMaster && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400">
              <ShieldCheck className="h-3 w-3 text-white" />
            </span>
          )}
          <Avatar className="h-9 w-9">
            <AvatarFallback className={`text-white ${isMaster ? 'bg-yellow-600' : isAdmin ? 'bg-tuca-ocean-blue' : 'bg-gray-600'}`}>
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
            {isMaster && (
              <p className="text-xs text-yellow-600 font-semibold flex items-center">
                <ShieldCheck className="h-3 w-3 mr-1" />
                Master Admin
              </p>
            )}
            {!isMaster && isAdmin && (
              <p className="text-xs text-blue-600 font-semibold">
                Administrador
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to={dashboardInfo.path} className="cursor-pointer flex w-full items-center">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            {dashboardInfo.text}
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
