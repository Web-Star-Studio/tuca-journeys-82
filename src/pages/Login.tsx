
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "@/components/login/LoginForm";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const returnTo = searchParams.get('returnTo') || '/dashboard';
  
  const handleSuccessfulLogin = (redirectToAdmin: boolean) => {
    // Check if this is a partner login
    if (returnTo.includes('/parceiro/')) {
      navigate("/parceiro/dashboard");
    } else if (redirectToAdmin) {
      navigate("/admin/dashboard");
    } else {
      navigate(returnTo);
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
