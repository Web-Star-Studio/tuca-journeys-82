
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { logAuthEvent, AuditAction } from "@/services/audit-service";

export const useSignIn = () => {
  const { toast } = useToast();

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting to sign in with:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Log successful login
      await logAuthEvent(data.user, AuditAction.LOGIN);
      
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo!",
      });
      
      return { data, error: null };
    } catch (error: any) {
      console.error("Error during login:", error);
      
      toast({
        title: "Erro no login",
        description: error.message || "Ocorreu um erro durante o login. Tente novamente.",
        variant: "destructive",
      });
      
      throw error;
    }
  };

  return { signIn };
};
