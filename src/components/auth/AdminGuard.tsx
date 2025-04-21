
import React, { useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from "lucide-react";

interface AdminGuardProps {
  children: React.ReactNode;
  fallbackUrl?: string;
}

const AdminGuard: React.FC<AdminGuardProps> = ({ 
  children, 
  fallbackUrl = "/login"
}) => {
  const { user, isAdmin, isLoading } = useAuth();

  // Memoize the navigation target to prevent unnecessary recalculations
  const redirectPath = useMemo(() => {
    return `${fallbackUrl}?returnTo=/admin/dashboard`;
  }, [fallbackUrl]);
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-tuca-ocean-blue" />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    );
  }

  // No user -> redirect to login
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  // User exists but not admin -> redirect to normal dashboard
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // Admin user -> render children
  return <>{children}</>;
};

export default AdminGuard;
