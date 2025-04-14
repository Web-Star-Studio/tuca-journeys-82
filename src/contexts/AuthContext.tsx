
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { useAuthOperations } from "@/hooks/auth/use-auth-operations";
import { isAdminEmail } from "@/lib/auth-helpers";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, name: string) => Promise<any>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  isAdmin: false,
  signIn: async () => ({}),
  signUp: async () => ({}),
  signOut: async () => {},
  resetPassword: async () => ({})
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { signIn: authSignIn, signUp: authSignUp, signOut: authSignOut, resetPassword: authResetPassword } = useAuthOperations();

  // Check if user has admin role - simplified for demo mode
  const checkAdminStatus = (currentUser: User | null) => {
    if (!currentUser) {
      setIsAdmin(false);
      return;
    }
    
    // In demo mode, check admin from user metadata or email
    const adminFromMetadata = 
      currentUser.user_metadata?.role === 'admin' ||
      currentUser.app_metadata?.role === 'admin';
      
    const adminFromEmail = isAdminEmail(currentUser.email);
    
    setIsAdmin(adminFromMetadata || adminFromEmail);
  };

  // Initialize auth state when component mounts
  useEffect(() => {
    // First check for mock session
    const initAuth = async () => {
      try {
        // Check for mock session
        const mockSessionStr = localStorage.getItem("supabase-mock-session");
        if (mockSessionStr) {
          try {
            const mockSession = JSON.parse(mockSessionStr);
            // Check if mock session is expired
            if (mockSession.expires_at > Math.floor(Date.now() / 1000)) {
              console.log("Found valid mock session, setting user state");
              setSession(mockSession);
              setUser(mockSession.user);
              checkAdminStatus(mockSession.user);
              setIsLoading(false);
              return;
            } else {
              // Clear expired mock session
              localStorage.removeItem("supabase-mock-session");
            }
          } catch (error) {
            console.error("Error parsing mock session:", error);
            localStorage.removeItem("supabase-mock-session");
          }
        }
        
        // No valid mock session
        setSession(null);
        setUser(null);
        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
    
    // Set up auth state listener - simplified for demo mode
    const authListener = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        localStorage.removeItem("supabase-mock-session");
        setSession(null);
        setUser(null);
        setIsAdmin(false);
      }
    });

    return () => {
      if (authListener) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  // Wrap the auth operations
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await authSignIn(email, password);
      if (result.data?.user) {
        checkAdminStatus(result.data.user);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      const result = await authSignUp(email, password, name);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await authSignOut();
      setUser(null);
      setSession(null);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    try {
      const result = await authResetPassword(email);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    session,
    isLoading,
    isAdmin,
    signIn,
    signUp,
    signOut,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
