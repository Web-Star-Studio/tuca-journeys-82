
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
}

const AdminLayout = ({ children, pageTitle }: AdminLayoutProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  // Check authentication and redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      console.log("User not authenticated, redirecting to login");
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
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
