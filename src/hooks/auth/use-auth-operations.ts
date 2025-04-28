
import { useSignIn } from "./use-sign-in";
import { useSignUp } from "./use-sign-up";
import { useSignOut } from "./use-sign-out";

export const useAuthOperations = () => {
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const { signOut } = useSignOut();

  return {
    signIn,
    signUp,
    signOut
  };
};
