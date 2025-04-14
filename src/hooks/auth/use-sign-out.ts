
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

export const useSignOut = () => {
  const { toast } = useToast();

  // Sign out function with Supabase integration
  const signOut = async () => {
    try {
      console.log("Starting sign out process...");
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      toast({
        title: "Sessão encerrada",
        description: "Você saiu com sucesso.",
      });
      
      return { error: null };
    } catch (error: any) {
      console.error("Error during sign out:", error);
      
      toast({
        title: "Erro ao sair",
        description: error.message || "Falha ao encerrar a sessão.",
        variant: "destructive",
      });
      
      // Return the error but don't block the sign out process
      return { error };
    }
  };

  return { signOut };
};
