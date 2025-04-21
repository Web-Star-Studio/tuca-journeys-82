
import React from 'react';
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

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-tuca-ocean-blue" />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={`${fallbackUrl}?returnTo=/admin/dashboard`} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AdminGuard;
