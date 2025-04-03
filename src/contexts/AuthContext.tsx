
import React, { createContext, useContext } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { useAuthState } from "@/hooks/use-auth-state";
import { useAuthOperations } from "@/hooks/auth/use-auth-operations";

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

  // Sign Out - Modified from useAuthOperations to return void for consistency
  const signOut = async () => {
    try {
      console.log("Starting sign out process...");
      setLoading(true);
      await authSignOut();
      // Ensure we don't have any lingering session data
      localStorage.removeItem("supabase-mock-session");
      console.log("Sign out process completed");
    } catch (error) {
      console.error("Error in signOut:", error);
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
