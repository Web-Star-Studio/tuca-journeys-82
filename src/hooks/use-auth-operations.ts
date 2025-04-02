
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

export const useAuthOperations = () => {
  const { toast } = useToast();

  // Sign in function with real Supabase authentication
  const signIn = async (email: string, password: string) => {
    try {
      // Use supabase auth signIn
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo de volta!",
      });
      
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Erro ao fazer login",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
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
