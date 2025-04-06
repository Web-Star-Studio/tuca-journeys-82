
import React from "react";
import { useNavigate } from "react-router-dom";
import { NavigationContext } from "@/contexts/AuthContext";

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  
  const navigateToLogin = () => {
    navigate("/login");
  };
  
  return (
    <NavigationContext.Provider value={{ navigateToLogin }}>
      {children}
    </NavigationContext.Provider>
  );
};
