
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthorization } from '@/hooks/use-authorization';
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
  partnerOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  adminOnly = false,
  partnerOnly = false
}) => {
  const { user, isLoading: authLoading } = useAuth();
  const { isAdmin, isPartner, isLoading: roleLoading } = useAuthorization();
  const location = useLocation();
  
  const isLoading = authLoading || roleLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-tuca-ocean-blue" />
        <span className="ml-2 text-lg">Carregando...</span>
      </div>
    );
  }

  if (!user) {
    // Preservar a URL atual para redirecionamento após login
    return <Navigate to={`/login?returnTo=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  if (partnerOnly && !isPartner) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
