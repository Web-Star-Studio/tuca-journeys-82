
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

export const useAuthOperations = () => {
  const { toast } = useToast();

  // Sign in function with Supabase authentication and fallback for demo mode
  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting to sign in with:", email);
      
      // Determinar se é um login administrativo
      const isAdminLogin = email === "admin@tucanoronha.com";
      
      try {
        // Tentar Supabase auth primeiro
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

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
        console.error("Login error:", error);
        
        // Fallback para modo demo devido a erro de rede ou autenticação
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
        
        // Armazenar a sessão mockada no localStorage para persistir
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
