
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { User, Session } from "@supabase/supabase-js";

export const useSignIn = () => {
  const { toast } = useToast();

  // Sign in function with support for demo accounts
  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting to sign in with:", email);
      
      // Check if this is a demo account and if the password matches
      const isDemoAccount = [
        "user@example.com",
        "admin@tucanoronha.com",
        "felipe@webstar.studio"
      ].includes(email);
      
      // Demo account logic - requires explicit password match
      if (isDemoAccount && password === "demo123") {
        console.log("Demo account detected, creating mock session");
        
        // Create a mock user and session for demo purposes
        const isAdmin = email === "admin@tucanoronha.com" || email === "felipe@webstar.studio";
        
        const mockUser: User = {
          id: `demo-${Date.now()}`,
          app_metadata: { 
            provider: "demo",
            ...(isAdmin ? { role: "admin" } : {})
          },
          user_metadata: {
            name: isAdmin ? "Demo Admin" : "Demo User",
            role: isAdmin ? "admin" : "user"
          },
          aud: "authenticated",
          created_at: new Date().toISOString(),
          email: email,
          role: "",
          updated_at: new Date().toISOString(),
        };
        
        // Create a mock session that lasts for 24 hours
        const expiresAt = Math.floor(Date.now() / 1000) + 86400;
        const mockSession = {
          access_token: `demo-token-${Date.now()}`,
          refresh_token: `demo-refresh-${Date.now()}`,
          expires_at: expiresAt,
          expires_in: 86400,
          user: mockUser,
          token_type: "bearer"
        };
        
        toast({
          title: "Login de demonstração",
          description: `Bem-vindo, ${isAdmin ? "Administrador" : "Usuário"} Demo!`,
        });
        
        return { data: { user: mockUser, session: mockSession }, error: null };
      }
      
      // Real Supabase authentication for non-demo accounts
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo!",
      });
      
      return { data, error: null };
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
