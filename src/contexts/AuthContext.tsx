import React, { createContext, useContext, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { useAuthState } from "@/hooks/use-auth-state";
import { useAuthOperations } from "@/hooks/auth/use-auth-operations";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  user: User | null;
  supabase: typeof supabase;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, setLoading } = useAuthState();
  const { signIn: authSignIn, signUp: authSignUp, signOut: authSignOut, resetPassword: authResetPassword } = useAuthOperations();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Add token refresh failure handling
  useEffect(() => {
    const { data: tokenListener } = supabase.auth.onAuthStateChange((event, session) => {
      // Handle cases where session is lost or authentication fails
      if (!session && user) {
        console.error('Auth token issue detected. Logging out...');
        
        // Clear any auth data and redirect to login
        localStorage.removeItem("supabase-mock-session");
        localStorage.removeItem("sb-xsctqejremuwmktmchef-auth-token");
        
        toast({
          title: "Sessão expirada",
          description: "Por favor, faça login novamente.",
          variant: "destructive",
        });
        
        // Use setTimeout to avoid state updates during render
        setTimeout(() => {
          navigate('/login');
        }, 100);
      }
    });
    
    return () => {
      if (tokenListener.subscription) {
        tokenListener.subscription.unsubscribe();
      }
    };
  }, [navigate, toast, user]);

  // Sign In - Modified from useAuthOperations to return void for consistency
  const signIn = async (email: string, password: string) => {
    try {
      await authSignIn(email, password);
    } catch (error) {
      console.error("Error in signIn:", error);
    }
  };

  // Sign Up - Modified from useAuthOperations to return void for consistency
  const signUp = async (email: string, password: string, name: string) => {
    try {
      await authSignUp(email, password, name);
    } catch (error) {
      console.error("Error in signUp:", error);
    }
  };

  // Sign Out - Modified to be more robust with error handling
  const signOut = async () => {
    try {
      console.log("Starting sign out process in AuthContext...");
      setLoading(true);
      
      // Call the signOut function from useAuthOperations
      await authSignOut();
      
      // Ensure we clear all possible session data
      console.log("Clearing all session data in AuthContext");
      localStorage.removeItem("supabase-mock-session");
      localStorage.removeItem("sb-xsctqejremuwmktmchef-auth-token");
      
      console.log("Sign out process completed in AuthContext");
    } catch (error) {
      console.error("Error in AuthContext signOut:", error);
      
      // Attempt to clean up even if there was an exception
      localStorage.removeItem("supabase-mock-session");
      localStorage.removeItem("sb-xsctqejremuwmktmchef-auth-token");
    } finally {
      setLoading(false);
    }
  };

  // Reset Password - Modified from useAuthOperations to return void for consistency
  const resetPassword = async (email: string) => {
    try {
      await authResetPassword(email);
    } catch (error) {
      console.error("Error in resetPassword:", error);
    }
  };

  const value = {
    user,
    supabase,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
