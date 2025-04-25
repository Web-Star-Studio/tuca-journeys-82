
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export const useSignOut = () => {
  const { toast } = useToast();

  const signOut = async () => {
    try {
      // Make sure to clear any mock sessions first
      localStorage.removeItem("supabase-mock-session");
      
      // Real Supabase signout
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      toast({
        title: "Logout realizado com sucesso",
        description: "Você saiu da sua conta.",
      });
      
    } catch (error: any) {
      console.error("Error during logout:", error);
      toast({
        title: "Erro ao sair",
        description: error.message || "Ocorreu um erro ao fazer logout. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return { signOut };
};
