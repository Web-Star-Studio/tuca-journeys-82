
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: 'read' | 'write' | 'delete' | 'admin';
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredPermission = 'read',
  redirectTo
}) => {
  const { user, isLoading, permissions } = useAuth();

  if (isLoading) {
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

  // Check permissions
  const hasRequiredPermission = 
    permissions.isAdmin || // Admins have all permissions
    (requiredPermission === 'read' && permissions.canRead) ||
    (requiredPermission === 'write' && permissions.canWrite) ||
    (requiredPermission === 'delete' && permissions.canDelete) ||
    (requiredPermission === 'admin' && permissions.isAdmin);
  
  // If doesn't have required permission, redirect to appropriate page
  if (!hasRequiredPermission) {
    const defaultRedirect = requiredPermission === 'admin' ? '/dashboard' : '/unauthorized';
    return <Navigate to={redirectTo || defaultRedirect} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
