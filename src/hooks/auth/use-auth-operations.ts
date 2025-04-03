
import { useSignIn } from "./use-sign-in";
import { useSignUp } from "./use-sign-up";
import { useSignOut } from "./use-sign-out";
import { useResetPassword } from "./use-reset-password";

export const useAuthOperations = () => {
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const { signOut } = useSignOut();
  const { resetPassword } = useResetPassword();

  return {
    signIn,
    signUp,
    signOut,
    resetPassword
  };
};
