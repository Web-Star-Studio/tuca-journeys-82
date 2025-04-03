
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
      
      // Get the current session - to verify if we have a valid session before attempting to sign out
      const { data: sessionData } = await supabase.auth.getSession();
      
      // If we have an active session, try to sign out with Supabase
      if (sessionData?.session) {
        console.log("Found active session, signing out with Supabase");
        
        try {
          const { error } = await supabase.auth.signOut();
          if (error) {
            console.warn("Supabase sign out warning:", error);
            // Continue with cleanup even if there's an error
          }
        } catch (innerError) {
          console.error("Supabase signOut error caught:", innerError);
          // Continue with cleanup even if there's an exception
        }
      } else {
        console.log("No active session found, just cleaning up local storage");
      }
      
      // Clear all possible session data regardless of whether API call succeeded
      console.log("Clearing all session data");
      localStorage.removeItem("supabase-session");
      localStorage.removeItem("sb-xsctqejremuwmktmchef-auth-token");
      
      toast({
        title: "Sessão encerrada",
        description: "Você saiu com sucesso.",
      });
      
      return { error: null };
    } catch (error: any) {
      console.error("Error during sign out:", error);
      
      // Still attempt to clear all session data on error
      localStorage.removeItem("supabase-mock-session");
      localStorage.removeItem("supabase-session");
      localStorage.removeItem("sb-xsctqejremuwmktmchef-auth-token");
      
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
