
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginCard from "@/components/login/LoginCard";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [redirecting, setRedirecting] = useState(false);
  const [redirectMessage, setRedirectMessage] = useState("");
  
  // If the user is already logged in, redirect
  useEffect(() => {
    if (user && !redirecting) {
      console.log("User already logged in:", user);
      setRedirecting(true);
      
      // Check if the user is admin by email or metadata
      const isAdmin = user.email === "admin@tucanoronha.com" || 
                     (user.user_metadata && user.user_metadata.role === "admin") ||
                     (user.app_metadata && user.app_metadata.role === "admin");
      
      setRedirectMessage(isAdmin ? "Redirecionando para o painel de administração..." : "Redirecionando para o dashboard...");
      console.log("User is admin:", isAdmin);
      
      // Add a slight delay to ensure the toast is shown
      setTimeout(() => {
        if (isAdmin) {
          console.log("Redirecting to /admin");
          toast({
            title: "Login bem-sucedido",
            description: "Bem-vindo ao painel de administração!",
          });
          navigate("/admin");
        } else {
          console.log("Redirecting to /dashboard");
          toast({
            title: "Login bem-sucedido",
            description: "Bem-vindo ao dashboard!",
          });
          navigate("/dashboard");
        }
      }, 300);
    }
  }, [user, navigate, toast, redirecting]);
  
  const handleSuccessfulLogin = (redirectToAdmin: boolean) => {
    setRedirecting(true);
    setRedirectMessage(redirectToAdmin ? "Redirecionando para o painel de administração..." : "Redirecionando para o dashboard...");
    
    console.log("Login successful, redirecting to", redirectToAdmin ? "/admin" : "/dashboard");
    
    // Add a slight delay to ensure the state update is processed
    setTimeout(() => {
      if (redirectToAdmin) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }, 300);
  };

  if (redirecting) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-20 md:py-32 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-tuca-ocean-blue" />
            <h2 className="text-2xl font-bold mb-2">Login bem-sucedido!</h2>
            <p className="text-lg text-gray-600">{redirectMessage}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-20 md:py-32 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-tuca-ocean-blue" />
            <h2 className="text-2xl font-bold mb-2">Carregando...</h2>
            <p className="text-lg text-gray-600">Verificando seu login</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
