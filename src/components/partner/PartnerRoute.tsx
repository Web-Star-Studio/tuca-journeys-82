
import React from 'react';
import { Navigate } from 'react-router-dom';
import { usePartnerAuth } from '@/hooks/use-partner-auth';
import { Loader2 } from "lucide-react";

interface PartnerRouteProps {
  children: React.ReactNode;
}

const PartnerRoute: React.FC<PartnerRouteProps> = ({ children }) => {
  const { isLoading, isAuthenticated, isPartner } = usePartnerAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-tuca-ocean-blue" />
        <span className="ml-2 text-lg">Carregando...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login?returnTo=/parceiro/dashboard" replace />;
  }

  if (!isPartner) {
    return <Navigate to="/parceiro/cadastro" replace />;
  }

  return <>{children}</>;
};

export default PartnerRoute;
