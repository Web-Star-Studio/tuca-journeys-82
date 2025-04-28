
import { SupabaseClient, User } from "@supabase/supabase-js";

// Define the return type for signOut function
export interface SignOutResult {
  success: boolean;
  error?: any;
}

// Create a type for our auth context
export type AuthContextType = {
  user: User | null;
  supabase: SupabaseClient;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<SignOutResult>;
  resetPassword: (email: string) => Promise<void>;
};
