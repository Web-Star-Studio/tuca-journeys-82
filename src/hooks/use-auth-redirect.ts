
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AuthRedirectOptions {
  requiredAuth?: boolean;
  requiredAdmin?: boolean;
  redirectTo?: string;
}

/**
 * Hook for redirecting users based on authentication state
 * 
 * @param options Configuration options
 * @returns Authentication state
 */
export const useAuthRedirect = (options: AuthRedirectOptions = {}) => {
  const { 
    requiredAuth = false, 
    requiredAdmin = false, 
    redirectTo = '/login' 
  } = options;
  
  const { user, isLoading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [hasRedirected, setHasRedirected] = useState(false);
  
  useEffect(() => {
    if (isLoading) return;
    
    if (requiredAuth && !user) {
      const currentPath = window.location.pathname;
      navigate(`${redirectTo}${currentPath !== '/' ? `?returnTo=${currentPath}` : ''}`);
      setHasRedirected(true);
      return;
    }
    
    if (requiredAdmin && !isAdmin) {
      navigate('/dashboard');
      setHasRedirected(true);
      return;
    }
    
  }, [user, isAdmin, isLoading, requiredAuth, requiredAdmin, navigate, redirectTo]);
  
  return {
    isAuthenticated: !!user,
    isAdmin,
    isLoading: isLoading || hasRedirected,
    user
  };
};
