
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

// Hook to handle authentication redirects
export const useAuthRedirect = (options: {
  requiredAuth?: boolean;
  requiredAdmin?: boolean;
  redirectAuthenticatedTo?: string;
  redirectUnauthenticatedTo?: string;
  redirectNonAdminTo?: string;
} = {}) => {
  const {
    requiredAuth = false,
    requiredAdmin = false,
    redirectAuthenticatedTo,
    redirectUnauthenticatedTo = '/login',
    redirectNonAdminTo = '/dashboard'
  } = options;

  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoading) return;

    // Handle authenticated user redirects
    if (user) {
      // Redirect authenticated users away from auth pages
      if (redirectAuthenticatedTo && (
         location.pathname === '/login' || 
         location.pathname === '/cadastro' || 
         location.pathname === '/recuperar-senha'
        )) {
        navigate(redirectAuthenticatedTo);
        return;
      }
      
      // Handle admin-protected routes
      if (requiredAdmin && !isAdmin) {
        navigate(redirectNonAdminTo);
        return;
      }
    } 
    // Handle unauthenticated user redirects for protected pages
    else if (requiredAuth) {
      const returnUrl = encodeURIComponent(location.pathname + location.search);
      navigate(`${redirectUnauthenticatedTo}?returnTo=${returnUrl}`);
    }
  }, [
    user,
    isAdmin,
    isLoading,
    requiredAuth,
    requiredAdmin,
    redirectAuthenticatedTo,
    redirectUnauthenticatedTo,
    redirectNonAdminTo,
    navigate,
    location
  ]);

  return { isLoading, isAuthenticated: !!user, isAdmin };
};
