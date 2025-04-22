
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

  // Mostrar indicador de carregamento
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-tuca-ocean-blue" />
        <span className="ml-2 text-lg">Carregando...</span>
      </div>
    );
  }

  // Redirecionar para o login se não autenticado
  if (!user) {
    // Preservar a URL atual para redirecionamento após login
    const currentPath = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?returnTo=${currentPath}`} replace />;
  }

  // Verificar restrições de papel
  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace state={{ 
      errorMessage: "Acesso restrito. Você precisa ser administrador para acessar esta página."
    }} />;
  }

  if (partnerOnly && !isPartner) {
    return <Navigate to="/dashboard" replace state={{ 
      errorMessage: "Acesso restrito. Você precisa ser parceiro para acessar esta página."
    }} />;
  }

  // Se tudo estiver ok, renderizar o conteúdo protegido
  return <>{children}</>;
};

export default ProtectedRoute;
