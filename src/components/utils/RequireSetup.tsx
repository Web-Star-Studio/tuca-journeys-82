
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSetupInitialized } from '@/hooks/use-setup-initialized';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const RequireSetup: React.FC = () => {
  const { isInitialized, isLoading, error } = useSetupInitialized();

  // Show error if there's an issue checking initialization status
  React.useEffect(() => {
    if (error) {
      toast.error("Erro ao verificar inicialização do sistema: " + error.message);
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <span className="ml-2">Verificando inicialização do sistema...</span>
      </div>
    );
  }

  if (!isInitialized) {
    return <Navigate to="/setup" replace />;
  }

  return <Outlet />;
};

export default RequireSetup;
