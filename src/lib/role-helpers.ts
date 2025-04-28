
import { supabase } from "./supabase";

/**
 * Check if a user has a specific permission
 * @param userId The user ID to check
 * @param permission The permission to check for
 * @returns True if the user has the permission, false otherwise
 */
export const hasPermission = async (
  userId: string, 
  permission: 'read' | 'write' | 'delete' | 'admin'
): Promise<boolean> => {
  if (!userId) return false;
  
  try {
    // First check if user has admin role (admins have all permissions)
    const { data: adminData, error: adminError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();
    
    if (adminError) {
      console.error('Error checking admin role:', adminError);
    }
    
    if (adminData) {
      return true; // Admin has all permissions
    }
    
    // If checking for admin permission specifically, the user doesn't have it
    if (permission === 'admin') {
      return false;
    }
    
    // Otherwise check for the specific permission via role
    const { data, error } = await supabase
      .rpc('user_has_permission', { 
        user_id: userId, 
        required_permission: permission 
      });
    
    if (error) {
      console.error('Error checking user permission:', error);
      return false;
    }
    
    return data === true;
  } catch (error) {
    console.error('Error checking user permission:', error);
    return false;
  }
};

/**
 * Checks if the current authenticated user has a specific permission
 * @param permission The permission to check for
 * @returns True if the current user has the permission, false otherwise
 */
export const currentUserHasPermission = async (
  permission: 'read' | 'write' | 'delete' | 'admin'
): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  
  return hasPermission(user.id, permission);
};

/**
 * Enhances the isUserAdmin function to use database roles
 * @param userId The user ID to check
 * @returns True if the user is an admin, false otherwise
 */
export const isUserAdminEnhanced = async (userId: string): Promise<boolean> => {
  return await hasPermission(userId, 'admin');
};
