
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { toast } from "sonner";
import { demoData } from '@/utils/demoDataGenerator';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any, data: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAdmin: false,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null, data: null }),
  signOut: async () => {},
  resetPassword: async () => ({ error: null })
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Simulate fetching session on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check if we have a saved session
        const savedSession = localStorage.getItem('demo_session');
        
        if (savedSession) {
          const session = JSON.parse(savedSession);
          setUser(session.user);
          setIsAdmin(session.user?.user_metadata?.role === 'admin');
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Simulate sign in functionality
  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // For demo - allow any login with basic validation
      if (!email || !email.includes('@')) {
        throw new Error("Email inválido");
      }
      
      if (!password || password.length < 6) {
        throw new Error("Senha deve ter pelo menos 6 caracteres");
      }

      // Check if email contains "admin" to determine role
      const isAdminUser = email.toLowerCase().includes('admin');
      
      // Create a mock user
      const mockUser = {
        id: "demo-user-id",
        email,
        user_metadata: {
          name: isAdminUser ? "Administrador" : "Usuário",
          role: isAdminUser ? "admin" : "user"
        },
        app_metadata: {
          role: isAdminUser ? "admin" : "user"
        },
        aud: "authenticated",
        created_at: new Date().toISOString()
      };

      // Create a mock session with properties expected by Supabase
      const mockSession: Session = {
        access_token: "mock-access-token",
        refresh_token: "mock-refresh-token",
        expires_in: 3600,
        expires_at: Math.floor(Date.now() / 1000) + 3600,
        token_type: "bearer",
        user: mockUser as any
      };

      // Save session to localStorage
      localStorage.setItem('demo_session', JSON.stringify(mockSession));
      
      setUser(mockUser as any);
      setIsAdmin(isAdminUser);
      return { error: null };
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error(error instanceof Error ? error.message : "Erro ao fazer login");
      return { error };
    } finally {
      setIsLoading(false);
    }
  };

  // Simulate sign up functionality
  const signUp = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      
      if (!email || !email.includes('@')) {
        throw new Error("Email inválido");
      }
      
      if (!password || password.length < 6) {
        throw new Error("Senha deve ter pelo menos 6 caracteres");
      }

      if (!name) {
        throw new Error("Nome é obrigatório");
      }

      // For demo - pretend to create user
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Conta criada com sucesso! Faça login para continuar.");
      
      return { error: null, data: { user: { email } } };
    } catch (error) {
      console.error("Sign up error:", error);
      toast.error(error instanceof Error ? error.message : "Erro ao criar conta");
      return { error, data: null };
    } finally {
      setIsLoading(false);
    }
  };

  // Simulate sign out
  const signOut = async () => {
    try {
      setIsLoading(true);
      
      // Clear local storage
      localStorage.removeItem('demo_session');
      
      setUser(null);
      setIsAdmin(false);
      
      toast.success("Logout realizado com sucesso");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Erro ao fazer logout");
    } finally {
      setIsLoading(false);
    }
  };

  // Simulate reset password
  const resetPassword = async (email: string) => {
    try {
      if (!email || !email.includes('@')) {
        throw new Error("Email inválido");
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Se um usuário com este email existir, enviaremos instruções para redefinir a senha.");
      
      return { error: null };
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error(error instanceof Error ? error.message : "Erro ao solicitar redefinição de senha");
      return { error };
    }
  };

  const value = {
    user,
    isLoading,
    isAdmin,
    signIn,
    signUp,
    signOut,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
