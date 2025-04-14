
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { isAdminEmail } from "@/lib/auth-helpers";

export const useSignIn = () => {
  const { toast } = useToast();

  // Sign in function with demo mode for all users
  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting to sign in with:", email);
      
      // Determine if it's an admin login
      const isAdminLogin = isAdminEmail(email);
      
      // For now, all logins use demo mode
      // Create mock user based on provided credentials
      const mockUser = {
        id: "demo-user-id",
        email: email,
        user_metadata: {
          name: email === "felipe@webstar.studio" ? "Felipe Admin" : (isAdminLogin ? "Admin Demo" : "Demo User"),
          role: isAdminLogin ? "admin" : "user",
        },
        app_metadata: {
          role: isAdminLogin ? "admin" : "user",
        },
        aud: "authenticated",
        created_at: new Date().toISOString(),
      };
      
      const mockSession = {
        access_token: "mock-token",
        refresh_token: "mock-refresh-token",
        user: mockUser,
        expires_at: Math.floor(Date.now() / 1000) + 3600,
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
    } catch (error: any) {
      console.error("Unexpected error during login:", error);
      
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
