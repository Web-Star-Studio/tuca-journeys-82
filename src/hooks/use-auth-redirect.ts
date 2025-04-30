
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AuthRedirectOptions {
  requiredAuth?: boolean;
  requiredAdmin?: boolean;
  redirectTo?: string;
}

export const useAuthRedirect = (options: AuthRedirectOptions = {}) => {
  const { 
    requiredAuth = false, 
    requiredAdmin = false, 
    redirectTo = '/login' 
  } = options;
  
  const { user, isLoading, isAdmin, checkPermission } = useAuth();
  const navigate = useNavigate();
  const [hasRedirected, setHasRedirected] = useState(false);
  const [isAdminVerified, setIsAdminVerified] = useState(false);
  const [adminStatus, setAdminStatus] = useState(false);
  
  // Add debugging logs
  useEffect(() => {
    console.log("useAuthRedirect - Current state:", { 
      user: !!user, 
      isAdmin, 
      isLoading, 
      requiredAuth, 
      requiredAdmin, 
      redirectTo,
      hasRedirected,
      isAdminVerified,
      adminStatus
    });
  }, [user, isAdmin, isLoading, requiredAuth, requiredAdmin, redirectTo, hasRedirected, isAdminVerified, adminStatus]);
  
  // Verify admin status directly when needed
  useEffect(() => {
    if (!user || isAdminVerified) return;
    
    const verifyAdminStatus = async () => {
      try {
        const [isAdminResult, isMasterResult] = await Promise.all([
          checkPermission('admin'),
          checkPermission('master')
        ]);
        
        const hasAdminAccess = isAdminResult || isMasterResult;
        console.log("useAuthRedirect - Admin verification:", { isAdminResult, isMasterResult, hasAdminAccess });
        
        setAdminStatus(hasAdminAccess);
        setIsAdminVerified(true);
      } catch (error) {
        console.error("Error verifying admin status:", error);
        setAdminStatus(false);
        setIsAdminVerified(true);
      }
    };
    
    verifyAdminStatus();
  }, [user, isAdminVerified, checkPermission]);
  
  // Redirect effect
  useEffect(() => {
    // Don't do anything while loading or if already redirected
    if (isLoading || hasRedirected) return;
    
    // Handle authentication check
    if (requiredAuth && !user) {
      console.log("useAuthRedirect - No authenticated user, redirecting to login");
      const currentPath = window.location.pathname;
      navigate(`${redirectTo}${currentPath !== '/' ? `?returnTo=${currentPath}` : ''}`);
      setHasRedirected(true);
      return;
    }
    
    // Wait for admin verification if needed
    if (requiredAdmin && user && !isAdminVerified) {
      console.log("useAuthRedirect - Waiting for admin verification");
      return;
    }
    
    // Handle admin check (using verified admin status)
    if (requiredAdmin && user && !adminStatus) {
      console.log("useAuthRedirect - User lacks admin permissions, redirecting to dashboard");
      navigate('/dashboard');
      setHasRedirected(true);
      return;
    }
  }, [
    user, 
    isLoading, 
    requiredAuth, 
    requiredAdmin, 
    navigate, 
    redirectTo, 
    hasRedirected, 
    isAdminVerified, 
    adminStatus
  ]);
  
  return {
    isAuthenticated: !!user,
    isAdmin: isAdminVerified ? adminStatus : isAdmin, // Return verified admin status when available
    isLoading: isLoading || (user && requiredAdmin && !isAdminVerified) || hasRedirected,
    user
  };
};
