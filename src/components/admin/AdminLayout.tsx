
import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Loader2 } from "lucide-react";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";

interface AdminLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
}

const AdminLayout = ({ children, pageTitle }: AdminLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  
  // Protect admin routes
  const { isLoading, isAuthenticated, isAdmin } = useAuthRedirect({
    requiredAuth: true,
    requiredAdmin: true,
    redirectTo: '/login?redirectTo=/admin/dashboard'
  });
  
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-tuca-ocean-blue" />
        <span className="ml-2 text-lg">Carregando...</span>
      </div>
    );
  }

  // If not authenticated or not admin, don't render the admin layout
  // The useAuthRedirect hook will handle the redirect
  if (!isAuthenticated || !isAdmin) {
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
      <div className="min-h-screen flex w-full bg-gray-50">
        <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className={`flex-1 transition-all duration-300 ${collapsed ? "ml-20" : "ml-64"}`}>
          <AdminHeader pageTitle={pageTitle} />
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
