
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface AdminLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
}

const AdminLayout = ({ children, pageTitle }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [user, setUser] = useState(null);
  const { toast } = useToast();

  // Check authentication and redirect if not authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsCheckingAuth(true);
        
        // Get the current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.log("User not authenticated, redirecting to login");
          toast({
            title: "Acesso restrito",
            description: "Você precisa estar logado para acessar esta página.",
            variant: "destructive",
          });
          navigate("/login");
          return;
        }
        
        // Store the user
        setUser(session.user);
        
        // Check if user has admin role
        const { data: userRoles, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id);
          
        if (roleError) {
          console.error("Error fetching user roles:", roleError);
          throw roleError;
        }
        
        const isAdmin = userRoles?.some(r => r.role === 'admin') || false;
        
        // For demo, also consider admin email as admin
        const isAdminEmail = session.user.email === "admin@tucanoronha.com";
        
        if (!isAdmin && !isAdminEmail) {
          console.log("User does not have admin permissions");
          toast({
            title: "Acesso restrito",
            description: "Você não tem permissão para acessar esta área.",
            variant: "destructive",
          });
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        // On error, redirect to login
        navigate("/login");
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
    
    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          navigate("/login");
        } else if (!session) {
          navigate("/login");
        } else {
          setUser(session.user);
        }
      }
    );
    
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [navigate, toast]);

  // Show loading state while checking auth
  if (isCheckingAuth) {
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
