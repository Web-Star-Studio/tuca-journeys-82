import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "@/components/login/LoginForm";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const returnTo = searchParams.get('returnTo') || '/dashboard';
  
  // Check for error parameter from redirect
  React.useEffect(() => {
    const errorMessage = searchParams.get('error');
    if (errorMessage) {
      toast.error(decodeURIComponent(errorMessage));
    }
  }, [searchParams]);
  
  const handleSuccessfulLogin = (redirectToAdmin: boolean, isPartner: boolean = false) => {
    try {
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
    } catch (error) {
      console.error("Erro de navegação:", error);
      // Fallback to dashboard if navigation fails
      navigate("/dashboard");
    }
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
