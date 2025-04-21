
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthorization } from '@/hooks/use-authorization';

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
  
  const isLoading = authLoading || roleLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={`/login?returnTo=${window.location.pathname}`} replace />;
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
