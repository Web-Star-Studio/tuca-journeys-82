
import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  User as UserIcon,
  Settings,
  CreditCard,
  Heart,
  LogOut,
  LayoutDashboard,
  LucideIcon
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface UserDropdownItem {
  label: string;
  href: string;
  icon: LucideIcon;
  onClick?: () => void;
}

interface UserDropdownContentProps {
  user: User;
  onSignOut: () => Promise<void>;
}

const UserDropdownContent = ({ user, onSignOut }: UserDropdownContentProps) => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  
  const commonMenuItems: UserDropdownItem[] = [
    { label: "Meu Perfil", href: "/perfil", icon: UserIcon },
    { label: "Meu Painel", href: "/dashboard", icon: LayoutDashboard },
    { label: "Lista de Desejos", href: "/lista-de-desejos", icon: Heart },
    { label: "Pagamentos", href: "/pagamentos", icon: CreditCard },
    { label: "Configurações", href: "/configuracoes", icon: Settings },
  ];
  
  // Add admin dashboard link for admin users
  const menuItems = isAdmin 
    ? [{ label: "Admin Dashboard", href: "/admin", icon: LayoutDashboard }, ...commonMenuItems]
    : commonMenuItems;

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  const handleSignOut = async () => {
    await onSignOut();
  };

  const truncateEmail = (email: string) => {
    if (!email) return "";
    if (email.length <= 20) return email;
    return email.substring(0, 17) + "...";
  };

  return (
    <DropdownMenuContent className="w-56" align="end" forceMount>
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">{user?.user_metadata?.name || "Usuário"}</p>
          <p className="text-xs leading-none text-muted-foreground">
            {truncateEmail(user?.email || "")}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        {menuItems.map((item, index) => (
          <DropdownMenuItem
            key={index}
            className="cursor-pointer"
            onClick={() => item.onClick ? item.onClick() : handleNavigation(item.href)}
          >
            <item.icon className="mr-2 h-4 w-4" />
            <span>{item.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Sair</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default UserDropdownContent;
