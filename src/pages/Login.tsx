
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginCard from "@/components/login/LoginCard";

const Login = () => {
  const navigate = useNavigate();
  
  const handleSuccessfulLogin = (redirectToAdmin: boolean) => {
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
