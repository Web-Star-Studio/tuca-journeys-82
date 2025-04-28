import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Calendar, ShoppingCart, Image, Package, Home, Store, Settings, BarChart2, LogOut, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSignOut } from "@/hooks/auth/use-sign-out";
import { useToast } from "@/hooks/use-toast";
interface AdminSidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}
interface SidebarItem {
  title: string;
  icon: React.ElementType;
  path: string;
  dividerAfter?: boolean;
}
const AdminSidebar = ({
  collapsed,
  setCollapsed
}: AdminSidebarProps) => {
  const location = useLocation();
  const {
    signOut
  } = useSignOut();
  const {
    toast
  } = useToast();
  const sidebarItems: SidebarItem[] = [{
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin"
  }, {
    title: "Passeios",
    icon: Calendar,
    path: "/admin/tours"
  }, {
    title: "Hospedagens",
    icon: Home,
    path: "/admin/accommodations"
  }, {
    title: "Pacotes",
    icon: Package,
    path: "/admin/packages"
  }, {
    title: "Produtos",
    icon: Store,
    path: "/admin/products",
    dividerAfter: true
  }, {
    title: "Reservas",
    icon: ShoppingCart,
    path: "/admin/bookings"
  }, {
    title: "Usuários",
    icon: Users,
    path: "/admin/users",
    dividerAfter: true
  }, {
    title: "Mídia",
    icon: Image,
    path: "/admin/media"
  }, {
    title: "Relatórios",
    icon: BarChart2,
    path: "/admin/reports"
  }, {
    title: "Configurações",
    icon: Settings,
    path: "/admin/settings"
  }];
  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso."
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Erro",
        description: "Não foi possível realizar o logout.",
        variant: "destructive"
      });
    }
  };
  return <div className={`fixed h-screen bg-white shadow-md transition-all duration-300 z-40 ${collapsed ? "w-20" : "w-64"}`}>
      <div className="flex h-16 items-center justify-between px-4 border-b">
        <Link to="/admin" className="flex items-center">
          {!collapsed && <span className="text-xl font-bold text-black">Administrativo</span>}
          {collapsed}
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="text-gray-500 hover:text-tuca-ocean-blue">
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      <div className="py-4">
        <ul className="space-y-1">
          {sidebarItems.map(item => <React.Fragment key={item.path}>
              <li>
                <Link to={item.path} className={cn("flex items-center py-3 text-gray-700 hover:bg-tuca-light-blue/40 hover:text-tuca-ocean-blue", collapsed ? "justify-center px-2" : "px-4", location.pathname === item.path && "bg-tuca-light-blue/60 text-tuca-ocean-blue font-medium")}>
                  <item.icon size={20} className="shrink-0" />
                  {!collapsed && <span className="ml-4 text-sm font-medium">{item.title}</span>}
                </Link>
              </li>
              {item.dividerAfter && <li className="my-2 border-b border-gray-200"></li>}
            </React.Fragment>)}
        </ul>
      </div>

      <div className="absolute bottom-5 w-full px-4">
        <Button variant="ghost" className={cn("flex w-full items-center py-3 text-gray-700 hover:bg-red-50 hover:text-red-600", collapsed ? "justify-center px-2" : "px-4")} onClick={handleSignOut}>
          <LogOut size={20} className="shrink-0" />
          {!collapsed && <span className="ml-4 text-sm font-medium">Sair</span>}
        </Button>
      </div>
    </div>;
};
export default AdminSidebar;