
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCurrentPartner } from '@/hooks/use-partner';
import { DemoService } from '@/services/demo-service';

export const usePartnerAuth = () => {
  const navigate = useNavigate();
  const { user, isLoading: isAuthLoading } = useAuth();
  const { data: partner, isLoading: isPartnerLoading } = useCurrentPartner();

  useEffect(() => {
    if (!isAuthLoading && !isPartnerLoading) {
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
      if (!partner) {
        navigate('/parceiro/cadastro');
        return;
      }
    }
  }, [user, partner, isAuthLoading, isPartnerLoading, navigate]);

  return {
    isLoading: isAuthLoading || isPartnerLoading,
    isAuthenticated: !!user,
    isPartner: !!partner,
    partner,
    user
  };
};
