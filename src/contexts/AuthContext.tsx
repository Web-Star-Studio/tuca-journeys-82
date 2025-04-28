
import React, { createContext, useContext } from "react";
import { User, Session } from "@supabase/supabase-js";
import { useAuthOperations } from "@/hooks/auth/use-auth-operations";
import { useAuthState } from "@/hooks/auth/use-auth-state";
import { isAdminEmail, isUserAdmin } from "@/lib/auth-helpers";
import { SignOutResult } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, name: string) => Promise<any>;
  signOut: () => Promise<SignOutResult>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  isAdmin: false,
  signIn: async () => ({}),
  signUp: async () => ({}),
  signOut: async () => ({ success: false }),
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, session, isLoading, setLoading } = useAuthState();
  const { signIn: authSignIn, signUp: authSignUp, signOut: authSignOut } = useAuthOperations();
  
  // Check admin status on login/signup
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await authSignIn(email, password);
      if (result.data?.user) {
        const isAdmin = await isUserAdmin(result.data.user.id);
        result.data.user.app_metadata.isAdmin = isAdmin;
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const result = await authSignUp(email, password, name);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<SignOutResult> => {
    setLoading(true);
    try {
      return await authSignOut();
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    session,
    isLoading,
    isAdmin: !!user && (isAdminEmail(user.email) || user.app_metadata?.isAdmin),
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
