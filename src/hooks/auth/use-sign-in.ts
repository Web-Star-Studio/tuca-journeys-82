
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { User, Session } from "@supabase/supabase-js";

export const useSignIn = () => {
  const { toast } = useToast();

  // Sign in function with removed support for demo accounts
  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting to sign in with:", email);
      
      // Real Supabase authentication for all accounts
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
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
