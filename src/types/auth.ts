
import { User as SupabaseUser } from "@supabase/supabase-js";

export interface SignOutResult {
  success: boolean;
  error?: any;
}

// Extend the Supabase User type with our own properties
export interface User extends SupabaseUser {
  app_metadata: {
    isAdmin?: boolean;
    [key: string]: any;
  };
  aud: string;
  created_at: string;
  [key: string]: any;
}

// Auth context user type
export type AuthUser = User & {
  user_metadata?: {
    name?: string;
    [key: string]: any;
  };
};

// Convert Supabase User to our User type
export const adaptSupabaseUser = (user: SupabaseUser | null): User | null => {
  if (!user) return null;
  
  return {
    ...user,
    app_metadata: user.app_metadata || { isAdmin: false },
    aud: user.aud || 'authenticated',
    created_at: user.created_at || new Date().toISOString(),
  } as User;
};
