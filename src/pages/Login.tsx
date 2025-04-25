
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/login/LoginForm";
import { Loader2 } from "lucide-react";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";

const Login = () => {
  const { isLoading: authRedirectLoading, isAuthenticated, isAdmin } = useAuthRedirect();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect URL from query params if available
  const searchParams = new URLSearchParams(location.search);
  const returnTo = searchParams.get('returnTo');
  
  // Redirect authenticated users away from login page
  useEffect(() => {
    if (!authRedirectLoading && isAuthenticated) {
      if (isAdmin) {
        navigate('/admin/dashboard');
      } else {
        // Use the returnTo query param or default to dashboard
        navigate(returnTo || '/dashboard');
      }
    }
  }, [authRedirectLoading, isAuthenticated, isAdmin, navigate, returnTo]);
  
  // Handle successful login
  const handleSuccessfulLogin = (redirectToAdmin: boolean) => {
    setIsRedirecting(true);
    if (redirectToAdmin) {
      navigate("/admin/dashboard");
    } else {
      // Use the returnTo query param or default to dashboard
      navigate(returnTo || '/dashboard');
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
