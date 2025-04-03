
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

export const useAuthOperations = () => {
  const { toast } = useToast();

  // Sign in function with Supabase authentication and fallback for demo mode
  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting to sign in with:", email);
      
      // Determine if it's an admin login
      const isAdminLogin = email === "admin@tucanoronha.com";
      
      // Check if using demo credentials first
      if (
        (email === "admin@tucanoronha.com" && password === "admin123456") ||
        (email === "demo@tucanoronha.com" && password === "demo123456") ||
        (email === "user@example.com" && password === "password")
      ) {
        console.log("Using demo credentials, creating mock session");
        // Use demo mode
        const mockUser = {
          id: "demo-user-id",
          email: email,
          user_metadata: {
            name: isAdminLogin ? "Admin Demo" : "Demo User",
            role: isAdminLogin ? "admin" : "user",
          },
          app_metadata: {
            role: isAdminLogin ? "admin" : "user",
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
        
        // Store the mocked session in localStorage to persist
        localStorage.setItem("supabase-mock-session", JSON.stringify(mockSession));
        
        toast({
          title: "Login de demonstração",
          description: `Você está usando uma conta de demonstração como ${isAdminLogin ? 'administrador' : 'usuário'}`,
          variant: "default",
        });
        
        return { 
          data: { session: mockSession, user: mockUser }, 
          error: null 
        };
      }
      
      try {
        // Attempt Supabase auth with a shorter timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        clearTimeout(timeoutId);

        if (error) {
          console.warn("Supabase auth error:", error.message);
          throw error;
        }

        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo de volta!",
        });
        
        return { data, error: null };
      } catch (error: any) {
        console.error("Login error:", error?.message || "Connection error");
        
        // Network error fallback - suggest using demo accounts or check network
        if (error.name === "AbortError" || error.message === "Failed to fetch") {
          toast({
            title: "Erro de conexão",
            description: "Não foi possível conectar ao servidor. Use uma conta de demonstração ou verifique sua conexão.",
            variant: "destructive",
          });
          
          throw new Error("Connection error. Try using a demo account.");
        } else {
          // Regular auth error
          toast({
            title: "Erro no login",
            description: error.message || "Email ou senha incorretos. Tente novamente.",
            variant: "destructive",
          });
          
          throw error;
        }
      }
    } catch (error: any) {
      console.error("Unexpected error during login:", error);
      
      toast({
        title: "Erro no login",
        description: error.message || "Ocorreu um erro durante o login. Tente novamente.",
        variant: "destructive",
      });
      
      throw error;
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
      // Clear mock session if it exists
      localStorage.removeItem("supabase-mock-session");
      
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
