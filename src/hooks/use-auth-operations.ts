
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

export const useAuthOperations = () => {
  const { toast } = useToast();

  // Sign in function - modified to allow any credentials
  const signIn = async (email: string, password: string) => {
    try {
      // Development mode: skip actual Supabase authentication
      // and simulate successful login for any credentials
      
      // Create a mock user object
      const mockUser = {
        id: "mock-user-id",
        email: email,
        user_metadata: {
          name: email.split('@')[0],
        },
        app_metadata: {},
        aud: "authenticated",
        created_at: new Date().toISOString(),
      };

      // Store mock user in localStorage to simulate session
      localStorage.setItem('supabase.auth.token', JSON.stringify({
        currentSession: {
          user: mockUser,
          access_token: "mock-token",
          refresh_token: "mock-refresh-token",
          expires_at: Date.now() + 3600000, // 1 hour from now
        }
      }));

      // Trigger auth state change event
      window.dispatchEvent(new Event('supabase.auth.token-change'));
      
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo de volta!",
      });
      
      return { data: { user: mockUser }, error: null };
    } catch (error: any) {
      toast({
        title: "Erro ao fazer login",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  // Sign up function - modified to simulate account creation
  const signUp = async (email: string, password: string, name: string) => {
    try {
      // Development mode: skip actual Supabase authentication
      // and simulate successful registration
      
      toast({
        title: "Conta criada com sucesso",
        description: "Você pode fazer login agora.",
      });
      
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Erro ao criar conta",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  // Sign out function - modified to clear mock session
  const signOut = async () => {
    try {
      // Clear mock session from localStorage
      localStorage.removeItem('supabase.auth.token');
      
      // Trigger auth state change event
      window.dispatchEvent(new Event('supabase.auth.token-change'));
      
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

  // Reset password function - modified to simulate password reset
  const resetPassword = async (email: string) => {
    try {
      // Development mode: skip actual Supabase password reset
      
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
