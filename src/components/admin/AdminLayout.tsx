
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AdminLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
}

const AdminLayout = ({ children, pageTitle }: AdminLayoutProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check authentication and redirect if not authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsCheckingAuth(true);
        
        // If not loading anymore and user is null, redirect to login
        if (!loading && !user) {
          console.log("User not authenticated, redirecting to login");
          toast({
            title: "Acesso restrito",
            description: "Você precisa estar logado para acessar esta página.",
            variant: "destructive",
          });
          navigate("/login");
        } else if (user) {
          // Check if user has admin role (could be in metadata or email check)
          const isAdmin = user.email === "admin@tucanoronha.com" || 
                         (user.user_metadata && user.user_metadata.role === "admin") ||
                         (user.app_metadata && user.app_metadata.role === "admin");

          if (!isAdmin) {
            console.log("User does not have admin permissions");
            toast({
              title: "Acesso restrito",
              description: "Você não tem permissão para acessar esta área.",
              variant: "destructive",
            });
            navigate("/dashboard");
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, [user, loading, navigate]);

  // Show loading state while checking auth
  if (loading || isCheckingAuth) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-tuca-ocean-blue" />
        <span className="ml-2 text-lg">Carregando...</span>
      </div>
    );
  }

  // If still checking auth or user is null, don't render the admin layout
  if (!user) {
    return null; // Don't render anything while redirecting
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
