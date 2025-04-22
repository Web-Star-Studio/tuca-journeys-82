import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "@/components/login/LoginForm";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const returnTo = searchParams.get('returnTo') || '/dashboard';
  
  const handleSuccessfulLogin = (redirectToAdmin: boolean, isPartner: boolean = false) => {
    // Check role-based redirections first
    if (isPartner) {
      navigate("/parceiro/dashboard");
      return;
    } 
    
    if (redirectToAdmin) {
      navigate("/admin/dashboard");
      return;
    }
    
    // For normal users, respect the returnTo parameter 
    // unless it's for exclusive role-based routes
    if (returnTo.startsWith('/parceiro/') && !isPartner) {
      navigate("/dashboard");
      return;
    }
    
    if (returnTo.startsWith('/admin/') && !redirectToAdmin) {
      navigate("/dashboard");
      return;
    }
    
    // Otherwise go to return path
    navigate(returnTo);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <LoginForm onSuccessfulLogin={handleSuccessfulLogin} />
      </div>
    </div>
  );
};

export default Login;
