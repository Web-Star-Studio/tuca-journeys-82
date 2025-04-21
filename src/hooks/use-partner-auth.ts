
import { useEffect } from 'react';
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

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate('/login?returnTo=/parceiro/dashboard');
        return;
      }

      // Handle demo partner users differently
      if (user.id && DemoService.isDemoUser(user.id)) {
        if (!partner) {
          // For demo users, don't redirect away from the registration page
          if (window.location.pathname !== '/parceiro/cadastro') {
            navigate('/parceiro/cadastro');
          }
        }
        return;
      }

      // Regular partner authentication flow
      if (!isPartner || !partner) {
        navigate('/parceiro/cadastro');
        return;
      }
    }
  }, [user, partner, isPartner, isLoading, navigate]);

  return {
    isLoading,
    isAuthenticated: !!user,
    isPartner,
    partner,
    user
  };
};
