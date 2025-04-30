
import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/contexts/AuthContext';
import { usePermission } from '@/hooks/use-permission';
import { toast } from "sonner";

interface AdminLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  requiresMaster?: boolean;
}

const AdminLayout = ({ 
  children, 
  pageTitle, 
  requiresMaster = false 
}: AdminLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const { hasPermission: isAdmin, isLoading: adminCheckLoading } = usePermission('admin');
  const { hasPermission: isMaster, isLoading: masterCheckLoading } = usePermission('master');
  
  const permissionLoading = isLoading || adminCheckLoading || (requiresMaster && masterCheckLoading);
  
  // Updated access logic: master users can access everything, admin users can access non-master pages
  const hasRequiredAccess = isMaster || (!requiresMaster && isAdmin);
  
  // Add debug logs
  useEffect(() => {
    console.log("AdminLayout - Permission state:", {
      user: !!user,
      isAdmin,
      isMaster,
      hasRequiredAccess,
      requiresMaster,
      permissionLoading
    });
  }, [user, isAdmin, isMaster, hasRequiredAccess, requiresMaster, permissionLoading]);
  
  if (permissionLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-tuca-ocean-blue" />
        <span className="ml-2 text-lg">Carregando...</span>
      </div>
    );
  }

  // If not authenticated or doesn't have required permissions, redirect
  if (!user) {
    console.log("AdminLayout - No user detected, redirecting to login");
    setTimeout(() => {
      navigate('/login?returnTo=/admin');
    }, 100);
    
    return (
      <div className="flex h-screen w-full items-center justify-center flex-col">
        <Loader2 className="h-8 w-8 animate-spin text-tuca-ocean-blue mb-4" />
        <span className="text-lg">Verificando autenticação...</span>
        <p className="text-sm text-gray-500 mt-2">Você será redirecionado em instantes</p>
      </div>
    );
  }
  
  if (!hasRequiredAccess) {
    console.log("AdminLayout - User lacks required permissions:", { 
      isAdmin, 
      isMaster, 
      requiresMaster 
    });
    
    toast.error("Acesso não autorizado", {
      description: requiresMaster 
        ? "Esta função requer permissões de administrador master." 
        : "Você não tem permissão para acessar esta área."
    });
    
    setTimeout(() => {
      navigate('/unauthorized');
    }, 100);
    
    return (
      <div className="flex h-screen w-full items-center justify-center flex-col">
        <Loader2 className="h-8 w-8 animate-spin text-tuca-ocean-blue mb-4" />
        <span className="text-lg">Verificando permissões...</span>
        <p className="text-sm text-gray-500 mt-2">Você será redirecionado em instantes</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50 overflow-hidden">
        <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className={`flex-1 transition-all duration-300 overflow-hidden ${collapsed ? "ml-20" : "ml-64"}`}>
          <AdminHeader pageTitle={pageTitle} />
          <main className="p-6 overflow-x-hidden w-full">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
