
import { useToast } from "@/hooks/use-toast";

export const useSignOut = () => {
  const { toast } = useToast();

  // Sign out function - simplified for demo mode
  const signOut = async () => {
    try {
      console.log("Starting sign out process...");
      
      // Just clear the mock session from localStorage
      localStorage.removeItem("supabase-mock-session");
      
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
