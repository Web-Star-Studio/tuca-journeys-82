
import { User } from "@supabase/supabase-js";

export interface SignOutResult {
  success: boolean;
  error?: any;
}

export type AuthUser = User & {
  app_metadata: {
    isAdmin?: boolean;
  };
};
