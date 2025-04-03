import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

export const useSignOut = () => {
  const { toast } = useToast();

  // Sign out function with real Supabase authentication
  const signOut = async () => {
    try {
      // First check if we're using a mock session
      const mockSessionStr = localStorage.getItem("supabase-mock-session");
      if (mockSessionStr) {
        console.log("Clearing mock session");
        localStorage.removeItem("supabase-mock-session");
        
        toast({
          title: "Sessão encerrada",
          description: "Você saiu com sucesso.",
        });
        
        return { error: null };
      }
      
      // Otherwise, sign out with Supabase
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
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  return { signOut };
};
