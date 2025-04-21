
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Loader2 } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { useAuthorization } from '@/hooks/use-authorization';
import { useCurrentPartner } from '@/hooks/use-partner';

interface PartnerRouteProps {
  children: React.ReactNode;
}

const PartnerRoute: React.FC<PartnerRouteProps> = ({ children }) => {
  const { user } = useAuth();
  const { isPartner, isLoading: isAuthLoading } = useAuthorization();
  const { data: partner, isLoading: isPartnerLoading } = useCurrentPartner();

  const isLoading = isAuthLoading || isPartnerLoading;

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-tuca-ocean-blue" />
        <span className="ml-2 text-lg">Carregando...</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login?returnTo=/parceiro/dashboard" replace />;
  }

  if (!isPartner) {
    return <Navigate to="/parceiro/cadastro" replace />;
  }

  if (!partner) {
    return <Navigate to="/parceiro/cadastro" replace />;
  }

  return <>{children}</>;
};

export default PartnerRoute;
