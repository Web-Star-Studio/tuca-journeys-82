
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginCard from "@/components/login/LoginCard";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Se o usuário já estiver logado, redireciona
  useEffect(() => {
    if (user) {
      // Verifica se o usuário é admin pelo email ou metadados
      const isAdmin = user.email === "admin@tucanoronha.com" || 
                     (user.user_metadata && user.user_metadata.role === "admin") ||
                     (user.app_metadata && user.app_metadata.role === "admin");
      
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);
  
  const handleSuccessfulLogin = (redirectToAdmin: boolean) => {
    console.log("Login successful in Login.tsx, redirecting to", redirectToAdmin ? "/admin" : "/");
    if (redirectToAdmin) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <LoginCard onSuccessfulLogin={handleSuccessfulLogin} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
