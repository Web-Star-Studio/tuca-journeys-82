
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

export const useSignUp = () => {
  const { toast } = useToast();

  const signUp = async (email: string, password: string, name: string) => {
    try {
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
      console.error("Error in signup:", error);
      toast({
        title: "Erro ao criar conta",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  return { signUp };
};
