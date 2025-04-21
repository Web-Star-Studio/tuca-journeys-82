
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCurrentPartner } from '@/hooks/use-partner';
import { useAuthorization } from '@/hooks/use-authorization';
import { DemoService } from '@/services/demo-service';

export const usePartnerAuth = () => {
  const navigate = useNavigate();
  const { user, isLoading: isAuthLoading } = useAuth();
  const { isPartner, isLoading: isRoleLoading } = useAuthorization();
  const { data: partner, isLoading: isPartnerLoading } = useCurrentPartner();

  const isLoading = isAuthLoading || isRoleLoading || isPartnerLoading;
  
  // Informação memorizada sobre autenticação e perfil de parceiro
  const authInfo = useMemo(() => {
    return {
      isAuthenticated: !!user,
      isPartner,
      partner,
      isDemoPartner: user ? DemoService.isDemoUser(user.id) : false
    };
  }, [user, isPartner, partner]);

  // Efeito para navegação conforme status de autenticação
  useEffect(() => {
    if (isLoading) return;
    
    const currentPath = window.location.pathname;
    const isOnPartnerRoutes = currentPath.startsWith('/parceiro');
    
    // Apenas redireciona se estiver em rotas de parceiro
    if (isOnPartnerRoutes) {
      if (!user) {
        navigate('/login?returnTo=/parceiro/dashboard', { replace: true });
        return;
      }
      
      // Tratamento especial para usuários demo
      if (authInfo.isDemoPartner) {
        if (!partner && currentPath !== '/parceiro/cadastro') {
          navigate('/parceiro/cadastro', { replace: true });
        }
        return;
      }
      
      // Fluxo padrão para parceiros
      if (!isPartner || !partner) {
        navigate('/parceiro/cadastro', { replace: true });
      }
    }
  }, [user, partner, isPartner, isLoading, navigate, authInfo.isDemoPartner]);

  return {
    ...authInfo,
    isLoading,
    user
  };
};
