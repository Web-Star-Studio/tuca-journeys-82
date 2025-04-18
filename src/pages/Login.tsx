import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/login/LoginForm";
import { Loader2 } from "lucide-react";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";

const Login = () => {
  const { isLoading: authRedirectLoading, isAuthenticated, user } = useAuthRedirect();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const searchParams = new URLSearchParams(location.search);
  const returnTo = searchParams.get('returnTo') || '/dashboard';
  
  useEffect(() => {
    if (!authRedirectLoading && isAuthenticated && user) {
      const isAdmin = user.user_metadata?.role === 'admin' || user.app_metadata?.role === 'admin';
      const isPartner = user.user_metadata?.role === 'partner' || user.app_metadata?.role === 'partner';
      
      if (isAdmin) {
        navigate('/admin/dashboard');
      } else if (isPartner) {
        navigate('/parceiro/dashboard');
      } else {
        navigate(returnTo);
      }
    }
  }, [authRedirectLoading, isAuthenticated, user, navigate, returnTo]);

  const handleSuccessfulLogin = (redirectToAdmin: boolean) => {
    setIsRedirecting(true);
    if (redirectToAdmin) {
      navigate("/admin");
    } else {
      navigate(returnTo);
    }
  };
  
  if (authRedirectLoading || isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-tuca-ocean-blue" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <LoginForm onSuccessfulLogin={handleSuccessfulLogin} />
      </div>
    </div>
  );
};

export default Login;
