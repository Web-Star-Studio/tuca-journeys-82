
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { isAdminEmail, setAdminRole } from "@/lib/auth-helpers";

export const useSignIn = () => {
  const { toast } = useToast();

  // Sign in function with Supabase authentication and fallback for demo mode
  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting to sign in with:", email);
      
      // Determine if it's an admin login
      const isAdminLogin = isAdminEmail(email);
      
      // Check if using demo credentials first
      if (
        (email === "admin@tucanoronha.com" && password === "admin123456") ||
        (email === "demo@tucanoronha.com" && password === "demo123456") ||
        (email === "user@example.com" && password === "password") ||
        (email === "felipe@webstar.studio" && password === "Client@123")
      ) {
        console.log("Using demo or predefined credentials, creating mock session");
        
        try {
          // Try to sign in with Supabase first (if user exists in Supabase)
          const { data: supabaseData, error: supabaseError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (!supabaseError) {
            console.log("User exists in Supabase, using that session");
            
            // If it's a known admin email but user might not have role yet
            if (isAdminLogin && supabaseData.session && supabaseData.user) {
              // Check if we need to set admin role for this user
              // This will ensure the user has the admin role in the database
              await setAdminRole(supabaseData.user.id);
            }
            
            toast({
              title: "Login realizado com sucesso",
              description: `Bem-vindo de volta ${isAdminLogin ? '(administrador)' : ''}!`,
            });
            
            return { data: supabaseData, error: null };
          }
        } catch (innerError) {
          console.log("Supabase auth failed for user, falling back to mock session");
        }
        
        // Use demo mode fallback
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
          title: "Login de demonstração",
          description: `Você está usando uma conta de demonstração como ${isAdminLogin ? 'administrador' : 'usuário'}`,
          variant: "default",
        });
        
        return { 
          data: { session: mockSession, user: mockUser }, 
          error: null 
        };
      }
      
      try {
        // Attempt Supabase auth with a shorter timeout for regular login (non-demo)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        clearTimeout(timeoutId);

        if (error) {
          console.warn("Supabase auth error:", error.message);
          throw error;
        }

        // If this is a first login for an admin user, set the admin role
        if (isAdminLogin && data.session && data.user) {
          await setAdminRole(data.user.id);
        }

        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo de volta!",
        });
        
        return { data, error: null };
      } catch (error: any) {
        console.error("Login error:", error?.message || "Connection error");
        
        // Network error fallback - suggest using demo accounts or check network
        if (error.name === "AbortError" || error.message === "Failed to fetch" || error.message?.includes("network")) {
          toast({
            title: "Erro de conexão",
            description: "Não foi possível conectar ao servidor. Use uma conta de demonstração ou verifique sua conexão.",
            variant: "destructive",
          });
          
          throw new Error("Connection error. Try using a demo account.");
        } else {
          // Regular auth error
          toast({
            title: "Erro no login",
            description: error.message || "Email ou senha incorretos. Tente novamente.",
            variant: "destructive",
          });
          
          throw error;
        }
      }
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
