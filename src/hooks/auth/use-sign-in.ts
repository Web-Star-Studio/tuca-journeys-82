
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { isAdminEmail } from "@/lib/auth-helpers";
import { Session } from "@supabase/supabase-js";

export const useSignIn = () => {
  const { toast } = useToast();

  // Sign in function with proper Supabase integration
  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting to sign in with:", email);
      
      // Determine if it's an admin login
      const isAdminLogin = isAdminEmail(email);
      
      // Use Supabase auth instead of mock when possible
      if (import.meta.env.DEV && (email === "admin@tucanoronha.com" || email === "felipe@webstar.studio")) {
        // For development mode, still allow mock session for specific admin emails
        const mockUser = {
          id: "demo-user-id",
          email: email,
          user_metadata: {
            name: email === "felipe@webstar.studio" ? "Felipe Admin" : "Admin Demo",
            role: "admin",
          },
          app_metadata: {
            role: "admin",
          },
          aud: "authenticated",
          created_at: new Date().toISOString(),
        };
        
        // Create a mock session that matches the Session type
        const mockSession: Session = {
          access_token: "mock-token",
          refresh_token: "mock-refresh-token",
          user: mockUser,
          expires_at: Math.floor(Date.now() / 1000) + 3600,
          expires_in: 3600,  // 1 hour in seconds
          token_type: "bearer"
        };
        
        // Store the mocked session in localStorage to persist
        localStorage.setItem("supabase-mock-session", JSON.stringify(mockSession));
        
        toast({
          title: "Login realizado com sucesso",
          description: `Bem-vindo ${isAdminLogin ? '(administrador)' : ''}!`,
          variant: "default",
        });
        
        return { 
          data: { session: mockSession, user: mockUser }, 
          error: null 
        };
      } else {
        // Real Supabase authentication
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast({
          title: "Login realizado com sucesso",
          description: `Bem-vindo${isAdminLogin ? ' (administrador)' : ''}!`,
        });
        
        return { data, error: null };
      }
    } catch (error: any) {
      console.error("Error during login:", error);
      
      toast({
        title: "Erro no login",
        description: error.message || "Ocorreu um erro durante o login. Tente novamente.",
        variant: "destructive",
      });
      
      throw error;
    }
  };

  return { signIn };
};
