
import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useAuthOperations } from "@/hooks/auth/use-auth-operations";
import { AuthService } from "@/services/auth-service";
import { toast } from "sonner";

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

  // Check if user has admin role - using the centralized AuthService
  const checkAdminStatus = async (currentUser: User | null) => {
    if (!currentUser) {
      setIsAdmin(false);
      return false;
    }
    
    try {
      const isUserAdmin = await AuthService.isAdmin(currentUser);
      setIsAdmin(isUserAdmin);
      return isUserAdmin;
    } catch (error) {
      console.error("Error checking admin status:", error);
      setIsAdmin(false);
      return false;
    }
  };

  // Initialize auth state when component mounts - improved with better cleanup
  useEffect(() => {
    let mounted = true;
    
    const initAuth = async () => {
      try {
        // Set up the auth state change listener FIRST
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
          if (!mounted) return;
          
          console.log("Auth state changed:", event);
          
          if (event === "SIGNED_OUT") {
            localStorage.removeItem("supabase-mock-session");
            setSession(null);
            setUser(null);
            setIsAdmin(false);
          } else if (currentSession) {
            setSession(currentSession);
            setUser(currentSession.user);
            
            // Use setTimeout to avoid potential deadlocks
            setTimeout(() => {
              if (mounted) {
                checkAdminStatus(currentSession.user);
              }
            }, 0);
          }
        });
        
        // First check for mock session to avoid unnecessary API calls
        const mockSessionStr = localStorage.getItem("supabase-mock-session");
        if (mockSessionStr && mounted) {
          try {
            const mockSessionData = JSON.parse(mockSessionStr);
            // Check if mock session is expired
            if (mockSessionData.expires_at > Math.floor(Date.now() / 1000)) {
              // Create a proper Session object with all required fields
              const mockSession: Session = {
                access_token: mockSessionData.access_token,
                refresh_token: mockSessionData.refresh_token,
                user: mockSessionData.user,
                expires_at: mockSessionData.expires_at,
                expires_in: mockSessionData.expires_at - Math.floor(Date.now() / 1000),
                token_type: "bearer"
              };
              
              setSession(mockSession);
              setUser(mockSession.user);
              await checkAdminStatus(mockSession.user);
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
        
        // Check for real Supabase session if no valid mock session was found
        if (mounted) {
          const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
          if (sessionError) {
            throw sessionError;
          }
          
          if (sessionData?.session) {
            setSession(sessionData.session);
            setUser(sessionData.session.user);
            await checkAdminStatus(sessionData.session.user);
          } else {
            // No valid session
            setSession(null);
            setUser(null);
            setIsAdmin(false);
          }
          setIsLoading(false);
        }
      } catch (error: any) {
        console.error("Error initializing auth:", error);
        if (mounted) {
          toast.error(`Erro de autenticação: ${error.message || 'Falha ao inicializar autenticação'}`);
          setIsLoading(false);
        }
      }
    };
    
    // Initialize auth state
    initAuth();
    
    // Cleanup function to prevent state updates after unmount
    return () => {
      mounted = false;
    };
  }, []);

  // Memoize auth operations to prevent unnecessary re-renders
  const authValue = useMemo(() => {
    // Wrap the auth operations
    const signIn = async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const result = await authSignIn(email, password);
        if (result.data?.user) {
          setUser(result.data.user);
          setSession(result.data.session);
          await checkAdminStatus(result.data.user);
        }
        return result;
      } catch (error: any) {
        toast.error(`Falha no login: ${error.message || 'Erro desconhecido'}`);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    const signUp = async (email: string, password: string, name: string) => {
      setIsLoading(true);
      try {
        const result = await authSignUp(email, password, name);
        toast.success("Cadastro realizado com sucesso!");
        return result;
      } catch (error: any) {
        toast.error(`Falha no cadastro: ${error.message || 'Erro desconhecido'}`);
        throw error;
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
        toast.info("Você foi desconectado com sucesso");
      } catch (error: any) {
        toast.error(`Falha ao sair: ${error.message || 'Erro desconhecido'}`);
      } finally {
        setIsLoading(false);
      }
    };

    const resetPassword = async (email: string) => {
      setIsLoading(true);
      try {
        const result = await authResetPassword(email);
        toast.success("E-mail de recuperação enviado com sucesso!");
        return result;
      } catch (error: any) {
        toast.error(`Falha ao redefinir senha: ${error.message || 'Erro desconhecido'}`);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    return {
      user,
      session,
      isLoading,
      isAdmin,
      signIn,
      signUp,
      signOut,
      resetPassword
    };
  }, [user, session, isLoading, isAdmin, authSignIn, authSignUp, authSignOut, authResetPassword]);

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};
