
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const useSignOut = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

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
      
      // Force redirect to login page after logout
      navigate("/login", { replace: true });
      
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
