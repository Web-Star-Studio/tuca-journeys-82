
import { useSignIn } from "./use-sign-in";
import { useSignUp, SignUpCredentials } from "./use-sign-up";
import { useSignOut } from "./use-sign-out";
import { useResetPassword } from "./use-reset-password";

export const useAuthOperations = () => {
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const { signOut } = useSignOut();
  const { resetPassword } = useResetPassword();

  // Enhanced signUp that ensures roles are created
  const enhancedSignUp = async (email: string, password: string, name: string, role: 'customer' | 'partner' | 'admin' = 'customer') => {
    const credentials: SignUpCredentials = {
      email,
      password,
      name,
      role
    };
    
    return await signUp(credentials);
  };

  return {
    signIn,
    signUp: enhancedSignUp,
    signOut,
    resetPassword,
  };
};
