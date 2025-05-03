
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Calendar,
  Home,
  Landmark,
  Users,
  Package,
  ShoppingBag,
  Settings,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Hotel,
  FileText,
  LogOut,
  Image,
  ShieldAlert,
  CalendarDays,
  Utensils,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePermission } from '@/hooks/use-permission';
import { useAuth } from "@/contexts/AuthContext";

interface AdminSidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SidebarItem {
  title: string;
  icon: React.ElementType;
  path: string;
  requiresMaster?: boolean;
}

const AdminSidebar = ({ collapsed, setCollapsed }: AdminSidebarProps) => {
  const location = useLocation();
  const { hasPermission: isMaster } = usePermission('master');
  const { signOut } = useAuth();
  
  const menuItems: SidebarItem[] = [
    { title: "Dashboard", icon: Home, path: "/admin" },
    { title: "Atividades", icon: Landmark, path: "/admin/activities" },
    { title: "Eventos", icon: CalendarDays, path: "/admin/events" },
    { title: "Hospedagens", icon: Hotel, path: "/admin/accommodations" },
    { title: "Restaurantes", icon: Utensils, path: "/admin/restaurants" },
    { title: "Pacotes", icon: Package, path: "/admin/packages" },
    { title: "Produtos", icon: ShoppingBag, path: "/admin/products" },
    { title: "Reservas", icon: Calendar, path: "/admin/bookings" },
    { title: "Usuários", icon: Users, path: "/admin/users" },
    { title: "Relatórios", icon: BarChart3, path: "/admin/reports" },
    { title: "Mídias", icon: Image, path: "/admin/media" },
    { title: "Logs de Auditoria", icon: FileText, path: "/admin/audit-logs", requiresMaster: true },
    { title: "Permissões", icon: ShieldAlert, path: "/admin/permissions", requiresMaster: true },
    { title: "Configurações", icon: Settings, path: "/admin/settings" },
  ];

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-30 h-screen bg-white shadow-lg border-r transition-all duration-300 overflow-hidden",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        <div className={cn("flex h-16 items-center border-b px-4", collapsed ? "justify-center" : "justify-between")}>
          {!collapsed && (
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">Tuca Noronha</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="sm"
            className={cn("h-8 w-8", collapsed && "mx-auto")}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <div className="space-y-2">
            {menuItems
              .filter(item => !item.requiresMaster || isMaster)
              .map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-2 rounded-md px-3 py-2.5 transition-colors",
                    location.pathname === item.path
                      ? "bg-muted text-tuca-ocean-blue font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    collapsed && "justify-center"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "")} />
                  {!collapsed && <span className="text-sm">{item.title}</span>}
                </Link>
              ))}
          </div>
        </ScrollArea>

        <div className="mt-auto border-t px-3 py-4">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex items-center space-x-2 rounded-md px-3 py-2 w-full justify-start text-muted-foreground hover:bg-muted hover:text-foreground",
              collapsed && "justify-center"
            )}
            onClick={() => signOut()}
          >
            <LogOut className={cn("h-5 w-5", collapsed ? "mx-auto" : "")} />
            {!collapsed && <span className="text-sm">Sair</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
