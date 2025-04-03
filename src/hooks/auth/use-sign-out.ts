import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

export const useSignOut = () => {
  const { toast } = useToast();

  // Sign out function with real Supabase authentication
  const signOut = async () => {
    try {
      console.log("Starting sign out process...");
      
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
      console.log("Signing out with Supabase");
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Supabase sign out error:", error);
        throw error;
      }
      
      // Clear any potential lingering session data
      console.log("Sign out successful, clearing any session data");
      localStorage.removeItem("supabase-session");
      
      toast({
        title: "Sessão encerrada",
        description: "Você saiu com sucesso.",
      });
      
      return { error: null };
    } catch (error: any) {
      console.error("Error during sign out:", error);
      
      // Still attempt to clear any session data on error
      localStorage.removeItem("supabase-mock-session");
      
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
