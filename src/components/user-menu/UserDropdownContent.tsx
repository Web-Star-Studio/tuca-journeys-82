
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
  CalendarDays,
  ShoppingBag,
  Ticket,
  BadgePercent,
  Bell,
  FileText,
  LucideIcon
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useSignOut } from "@/hooks/auth/use-sign-out";

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
  const { signOut } = useSignOut();

  // Define menu items based on user role
  const menuItems = isAdmin ? [
    { label: "Admin Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Minhas Reservas", href: "/bookings", icon: CalendarDays },
    { label: "Minhas Compras", href: "/orders", icon: ShoppingBag },
    { label: "Lista de Desejos", href: "/lista-de-desejos", icon: Heart },
    { label: "Documentos de Viagem", href: "/documents", icon: FileText },
    { label: "Cupons e Descontos", href: "/cupons", icon: Ticket },
    { label: "Programa de Pontos", href: "/pontos", icon: BadgePercent },
    { label: "Notificações", href: "/notificacoes", icon: Bell },
    { label: "Pagamentos", href: "/pagamentos", icon: CreditCard },
    { label: "Configurações", href: "/configuracoes", icon: Settings },
  ] : [
    { label: "Meu Painel", href: "/dashboard", icon: LayoutDashboard },
    { label: "Meu Perfil", href: "/profile", icon: UserIcon },
    { label: "Minhas Reservas", href: "/bookings", icon: CalendarDays },
    { label: "Minhas Compras", href: "/orders", icon: ShoppingBag },
    { label: "Lista de Desejos", href: "/lista-de-desejos", icon: Heart },
    { label: "Documentos de Viagem", href: "/documents", icon: FileText },
    { label: "Cupons e Descontos", href: "/cupons", icon: Ticket },
    { label: "Programa de Pontos", href: "/pontos", icon: BadgePercent },
    { label: "Notificações", href: "/notificacoes", icon: Bell },
    { label: "Pagamentos", href: "/pagamentos", icon: CreditCard },
    { label: "Configurações", href: "/configuracoes", icon: Settings },
  ];

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
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
      <DropdownMenuGroup className="max-h-[400px] overflow-y-auto">
        {menuItems.map((item, index) => (
          <DropdownMenuItem
            key={index}
            className="cursor-pointer"
            onClick={() => handleNavigation(item.href)}
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
