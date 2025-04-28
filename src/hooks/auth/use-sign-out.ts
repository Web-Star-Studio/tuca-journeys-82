
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { logAuthEvent, AuditAction } from "@/services/audit-service";

export const useSignOut = () => {
  const { toast } = useToast();

  const signOut = async () => {
    try {
      // Get current user before signing out
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      // Log successful logout
      await logAuthEvent(user, AuditAction.LOGOUT);
      
      toast({
        title: "Logout realizado com sucesso",
        description: "Você saiu da sua conta.",
      });
      
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
