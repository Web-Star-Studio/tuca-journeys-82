
import { supabase } from "./supabase";

/**
 * Check if the current user has a specific role
 * @param userId User ID to check
 * @param role Role to check for
 * @returns Boolean indicating if the user has the role
 */
export const hasRole = async (userId: string, role: string): Promise<boolean> => {
  if (!userId) return false;
  
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', role)
      .single();
    
    if (error) {
      console.error('Error checking user role:', error);
      return false;
    }
    
    return !!data;
  } catch (error) {
    console.error('Error checking user role:', error);
    return false;
  }
};

/**
 * Check if the given email matches the admin email
 * This is a fallback for demo purposes
 */
export const isAdminEmail = (email: string | undefined): boolean => {
  return email === "admin@tucanoronha.com";
};
