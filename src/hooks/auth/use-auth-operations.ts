
import { useSignIn } from "./use-sign-in";
import { useSignUp, SignUpCredentials } from "./use-sign-up";
import { useSignOut } from "./use-sign-out";
import { useResetPassword } from "./use-reset-password";
import { AuthService, UserRole } from "@/services/auth-service";
import { User } from "@supabase/supabase-js";

export const useAuthOperations = () => {
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const { signOut } = useSignOut();
  const { resetPassword } = useResetPassword();

  /**
   * Método melhorado de cadastro que garante criação de roles
   */
  const enhancedSignUp = async (
    email: string, 
    password: string, 
    name: string, 
    role: UserRole = 'customer'
  ) => {
    const credentials: SignUpCredentials = {
      email,
      password,
      name,
      role
    };
    
    try {
      const result = await signUp(credentials);
      return result;
    } catch (error) {
      console.error("Erro no cadastro:", error);
      throw error;
    }
  };

  /**
   * Método para verificar role do usuário
   * Não causa dependência circular pois não é usado durante importação
   */
  const checkUserRole = async (user: User | null, role: UserRole): Promise<boolean> => {
    if (!user) return false;
    return AuthService.hasRole(user, role);
  };

  return {
    signIn,
    signUp: enhancedSignUp,
    signOut,
    resetPassword,
    checkUserRole
  };
};
