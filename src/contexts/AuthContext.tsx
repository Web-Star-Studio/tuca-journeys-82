import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient, SupabaseClient, User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

// Create a type for our auth context
type AuthContextType = {
  user: User | null;
  supabase: SupabaseClient;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

// Create the auth context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default Supabase configuration
// These are placeholder values - in a real app, use your actual Supabase project
const DEMO_SUPABASE_URL = "https://guvbcxxulxcjotrdplkm.supabase.co";
const DEMO_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1dmJjeHh1bHhjam90cmRwbGttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2OTY2MTUsImV4cCI6MjAyODI3MjYxNX0.Dq1KqjGjOy7m3-LXZQ08I-s4B8nGJseCDRj2EYsn60I";

// Create the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEMO_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEMO_SUPABASE_ANON_KEY;

console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Anon Key:", supabaseAnonKey ? "Set" : "Not Set");

// Create the Supabase client with the values
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create the auth provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Initialize the auth state
  useEffect(() => {
    // Get the session from supabase
    const initSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Error getting session:", error);
        setLoading(false);
        return;
      }
      
      if (data.session) {
        setUser(data.session.user);
      }
      
      // Set up auth state listener
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setUser(session?.user ?? null);
        }
      );
      
      setLoading(false);
      
      // Clean up the listener when the component unmounts
      return () => {
        authListener.subscription.unsubscribe();
      };
    };
    
    initSession();
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast({
          title: "Erro ao fazer login",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo de volta!",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erro ao fazer login",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Sign up function
  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    
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
      
      if (error) {
        toast({
          title: "Erro ao criar conta",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Conta criada com sucesso",
          description: "Verifique seu email para confirmar sua conta.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erro ao criar conta",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          title: "Erro ao sair",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Sessão encerrada",
          description: "Você saiu com sucesso.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erro ao sair",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Reset password function
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        toast({
          title: "Erro ao redefinir senha",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Email enviado",
          description: "Verifique seu email para redefinir sua senha.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erro ao redefinir senha",
        description: error.message,
        variant: "destructive",
      });
    }
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
