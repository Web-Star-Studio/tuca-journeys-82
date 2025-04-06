
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/login/LoginForm";
import { Loader2 } from "lucide-react";

const Login = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Handle successful login
  const handleSuccessfulLogin = (redirectToAdmin: boolean) => {
    if (redirectToAdmin) {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      // Check if user is admin
      const isAdmin = 
        user.email === "admin@tucanoronha.com" || 
        (user.user_metadata && user.user_metadata.role === "admin") ||
        (user.app_metadata && user.app_metadata.role === "admin");
      
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  }, [user, navigate]);
  
  if (isLoading) {
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
