
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { usePermission } from '@/hooks/use-permission';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: 'read' | 'write' | 'delete' | 'admin' | 'master';
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredPermission = 'read',
  redirectTo
}) => {
  const { user, isLoading } = useAuth();
  const { hasPermission, isLoading: permissionLoading } = usePermission(requiredPermission);

  if (isLoading || permissionLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to={`/login?returnTo=${window.location.pathname}`} replace />;
  }

  // If doesn't have required permission, redirect to appropriate page
  if (!hasPermission) {
    const defaultRedirect = requiredPermission === 'admin' || requiredPermission === 'master' 
      ? '/dashboard' 
      : '/unauthorized';
    return <Navigate to={redirectTo || defaultRedirect} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
