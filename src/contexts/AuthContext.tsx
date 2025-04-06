
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  loading: boolean; // Added for compatibility with existing components
  error: Error | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Found Supabase session, setting user state");
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsLoading(false);
    }).catch(error => {
      console.error("Error getting session:", error);
      setError(error);
      setIsLoading(false);
    });

    // Cleanup subscription when component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if using demo credentials 
      if (
        (email === "admin@tucanoronha.com" && password === "admin123456") ||
        (email === "demo@tucanoronha.com" && password === "demo123456") ||
        (email === "user@example.com" && password === "password")
      ) {
        console.log("Using demo credentials");
        
        // Use demo mode
        const mockUser = {
          id: "demo-user-id",
          email: email,
          user_metadata: {
            name: email === "admin@tucanoronha.com" ? "Admin Demo" : "Demo User",
            role: email === "admin@tucanoronha.com" ? "admin" : "user",
          },
          app_metadata: {
            role: email === "admin@tucanoronha.com" ? "admin" : "user",
          },
          aud: "authenticated",
          created_at: new Date().toISOString(),
        } as User;
        
        // Create a mock session that matches the Supabase Session type
        const mockSession = {
          access_token: "mock-token",
          refresh_token: "mock-refresh-token",
          expires_in: 3600,
          expires_at: Math.floor(Date.now() / 1000) + 3600,
          token_type: "bearer",
          user: mockUser
        } as Session;
        
        // Store the mocked session in localStorage to persist
        localStorage.setItem("supabase-mock-session", JSON.stringify(mockSession));
        
        // Set the user and session state
        setUser(mockUser);
        setSession(mockSession);
        
        toast({
          title: "Login de demonstração",
          description: `Você está usando uma conta de demonstração como ${email === "admin@tucanoronha.com" ? 'administrador' : 'usuário'}`,
        });
        
        setIsLoading(false);
        return;
      }
      
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo de volta!",
      });
    } catch (error) {
      console.error("Error signing in:", error);
      setError(error instanceof Error ? error : new Error('Unknown error during sign-in'));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      if (error) throw error;
      
      toast({
        title: "Conta criada com sucesso",
        description: "Verifique seu email para confirmar seu cadastro.",
      });
    } catch (error) {
      console.error("Error signing up:", error);
      setError(error instanceof Error ? error : new Error('Unknown error during sign-up'));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if we're using a mock session
      const mockSessionStr = localStorage.getItem("supabase-mock-session");
      if (mockSessionStr) {
        console.log("Clearing mock session");
        localStorage.removeItem("supabase-mock-session");
        
        // Clear user and session
        setUser(null);
        setSession(null);
        
        toast({
          title: "Sessão encerrada",
          description: "Você saiu com sucesso.",
        });
        
        setIsLoading(false);
        return;
      }
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear user and session
      setUser(null);
      setSession(null);
      
      toast({
        title: "Sessão encerrada",
        description: "Você saiu com sucesso.",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      setError(error instanceof Error ? error : new Error('Unknown error during sign-out'));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + "/reset-password-confirm",
      });
      if (error) throw error;
      
      toast({
        title: "Email enviado",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      });
    } catch (error) {
      console.error("Error resetting password:", error);
      setError(error instanceof Error ? error : new Error('Unknown error during password reset'));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        loading: isLoading, // Added for compatibility with existing components
        error,
        signIn,
        signUp,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
