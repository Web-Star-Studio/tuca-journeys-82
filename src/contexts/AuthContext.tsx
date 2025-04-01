
import React, { createContext, useContext } from "react";
import { useAuthState } from "@/hooks/use-auth-state";
import { useAuthOperations } from "@/hooks/use-auth-operations";
import { useDemoAccount } from "@/hooks/use-demo-account";
import { supabase } from "@/lib/supabase";
import { AuthContextType } from "@/types/auth";

// Create the auth context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the auth provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use the refactored hooks
  const { user, loading, setLoading } = useAuthState();
  const { signIn: authSignIn, signUp: authSignUp, signOut, resetPassword } = useAuthOperations();
  
  // Ensure demo account exists
  useDemoAccount();

  // Wrapped version of sign in that manages loading state
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    await authSignIn(email, password);
    setLoading(false);
  };

  // Wrapped version of sign up that manages loading state
  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    await authSignUp(email, password, name);
    setLoading(false);
  };

  // Context value
  const value = {
    user,
    supabase,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
