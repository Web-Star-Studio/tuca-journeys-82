
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/login/LoginForm";
import { Loader2 } from "lucide-react";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";

const Login = () => {
  // Use the hook without the invalid prop
  const { isLoading: authRedirectLoading, isAuthenticated, isAdmin } = useAuthRedirect();
  
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [userChecked, setUserChecked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect URL from query params if available
  const searchParams = new URLSearchParams(location.search);
  const returnTo = searchParams.get('returnTo') || '/dashboard';
  
  // Add debug logs to track what's happening
  useEffect(() => {
    console.log("Login component - Auth state:", { 
      isAuthenticated, 
      isAdmin, 
      isRedirecting, 
      userChecked, 
      authRedirectLoading,
      returnTo 
    });
  }, [isAuthenticated, isAdmin, isRedirecting, userChecked, authRedirectLoading, returnTo]);
  
  // IMPORTANT: Don't auto-redirect admins in this useEffect
  // Let handleSuccessfulLogin handle admin redirection
  useEffect(() => {
    if (authRedirectLoading || isRedirecting || userChecked) return;
    
    if (isAuthenticated) {
      console.log("Login detected authenticated user, isAdmin:", isAdmin);
      setUserChecked(true);
      
      if (isAdmin) {
        console.log("Admin user detected, redirection will be handled by handleSuccessfulLogin");
        // Do not navigate here for admin users
      } else {
        console.log("Regular user detected, redirecting to:", returnTo);
        navigate(returnTo);
      }
    }
  }, [authRedirectLoading, isAuthenticated, navigate, returnTo, isAdmin, isRedirecting, userChecked]);
  
  // Handle successful login with priority
  const handleSuccessfulLogin = (redirectToAdmin: boolean) => {
    console.log("handleSuccessfulLogin called with redirectToAdmin:", redirectToAdmin);
    setIsRedirecting(true);
    
    if (redirectToAdmin) {
      console.log("Redirecting admin to /admin dashboard");
      navigate("/admin"); // Redirect admins to admin dashboard
    } else {
      console.log("Redirecting regular user to:", returnTo);
      // Use the returnTo query param or default to dashboard
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
