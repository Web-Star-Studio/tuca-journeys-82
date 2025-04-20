
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCurrentPartner } from '@/hooks/use-partner';

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
