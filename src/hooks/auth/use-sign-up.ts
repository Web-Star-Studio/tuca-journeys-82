
import { AuthError } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export interface SignUpCredentials {
  email: string;
  password: string;
  name: string;
  role?: 'customer' | 'partner' | 'admin';
}

export const useSignUp = () => {
  const signUp = async ({ email, password, name, role = 'customer' }: SignUpCredentials) => {
    try {
      // Step 1: Create the user account in Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role, // Store role in user metadata
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        try {
          // Step 2: Create user_roles entry
          const { error: roleError } = await supabase
            .from('user_roles')
            .insert({
              user_id: authData.user.id,
              role: role,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });

          if (roleError) {
            console.error("Error creating user role:", roleError);
            // Even if role creation fails, we continue since user is created
          }

          // Step 3: If partner, create empty partner record
          if (role === 'partner') {
            const { error: partnerError } = await supabase
              .from('partners')
              .insert({
                user_id: authData.user.id,
                business_name: `${name}'s Business`, // Default business name
                business_type: 'tour', // Default business type
                is_verified: false,
                is_active: true,
              });
              
            if (partnerError) {
              console.error("Error creating partner record:", partnerError);
            }
          }
        } catch (error) {
          console.error("Error in post-signup operations:", error);
        }
      }

      return { data: authData, error: null };
    } catch (error) {
      console.error("Sign up error:", error);
      return { data: null, error: error as AuthError };
    }
  };

  return { signUp };
};
