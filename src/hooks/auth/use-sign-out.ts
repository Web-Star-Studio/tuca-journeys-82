
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export const useSignOut = () => {
  const { toast } = useToast();

  const signOut = async () => {
    try {
      // Remove any mock session that might exist
      localStorage.removeItem("supabase-mock-session");
      
      // Clear any other auth-related items in localStorage
      localStorage.removeItem("supabase.auth.token");
      
      // Real Supabase signout
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      toast({
        title: "Logout realizado com sucesso",
        description: "Você saiu da sua conta.",
      });
      
      // Return success without navigating (navigation will be handled by the component)
      return { success: true };
      
    } catch (error: any) {
      console.error("Error during logout:", error);
      toast({
        title: "Erro ao sair",
        description: error.message || "Ocorreu um erro ao fazer logout. Tente novamente.",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  return { signOut };
};
