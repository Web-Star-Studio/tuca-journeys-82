
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
  redirectUrl?: string;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  redirectUrl = "/login" 
}) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-tuca-ocean-blue" />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    );
  }

  if (!user) {
    // Save the current path for redirection after login
    const currentPath = location.pathname;
    return <Navigate to={`${redirectUrl}?returnTo=${currentPath}`} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
