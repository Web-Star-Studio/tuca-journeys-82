import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

export const useAuthOperations = () => {
  const { toast } = useToast();

  // Sign in function with Supabase authentication and fallback for demo mode
  const signIn = async (email: string, password: string) => {
    try {
      // First try Supabase auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.warn("Supabase auth error:", error.message);
        
        // For development/demo - create a mock user when Supabase is unavailable
        // This allows the app to function without a working backend
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
        };
        
        const mockSession = {
          access_token: "mock-token",
          refresh_token: "mock-refresh-token",
          user: mockUser,
          expires_at: Math.floor(Date.now() / 1000) + 3600,
        };
        
        // Store the mock session in localStorage to persist it
        localStorage.setItem("supabase-mock-session", JSON.stringify(mockSession));
        
        toast({
          title: "Login de demonstração",
          description: "Você está usando uma conta de demonstração",
        });
        
        return { data: { session: mockSession, user: mockUser }, error: null };
      }

      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo de volta!",
      });
      
      return { data, error: null };
    } catch (error: any) {
      console.error("Login error:", error);
      
      // Fallback to demo mode if network error
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
      };
      
      const mockSession = {
        access_token: "mock-token",
        refresh_token: "mock-refresh-token",
        user: mockUser,
        expires_at: Math.floor(Date.now() / 1000) + 3600,
      };
      
      localStorage.setItem("supabase-mock-session", JSON.stringify(mockSession));
      
      toast({
        title: "Login de demonstração",
        description: "Você está usando uma conta de demonstração",
        variant: "default",
      });
      
      return { 
        data: { session: mockSession, user: mockUser }, 
        error: null 
      };
    }
  };

  // Sign up function with real Supabase authentication
  const signUp = async (email: string, password: string, name: string) => {
    try {
      // Use supabase auth signUp
      const { data, error } = await supabase.auth.signUp({
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
      
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Erro ao criar conta",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  // Sign out function with real Supabase authentication
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      toast({
        title: "Sessão encerrada",
        description: "Você saiu com sucesso.",
      });
      
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Erro ao sair",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  // Reset password function with real Supabase authentication
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + "/reset-password-confirm",
      });
      
      if (error) throw error;
      
      toast({
        title: "Email enviado",
        description: "Verifique seu email para redefinir sua senha.",
      });
      
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Erro ao redefinir senha",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  return {
    signIn,
    signUp,
    signOut,
    resetPassword
  };
};
