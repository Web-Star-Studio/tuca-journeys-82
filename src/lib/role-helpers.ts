
import { supabase } from "./supabase";

/**
 * Check if a user has a specific permission
 * @param userId The user ID to check
 * @param permission The permission to check for
 * @returns True if the user has the permission, false otherwise
 */
export const hasPermission = async (
  userId: string, 
  permission: 'read' | 'write' | 'delete' | 'admin' | 'master'
): Promise<boolean> => {
  if (!userId) return false;
  
  try {
    // First check if user has master role (masters have all permissions)
    const { data: masterData, error: masterError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'master')
      .maybeSingle();
    
    if (masterError) {
      console.error('Error checking master role:', masterError);
    }
    
    if (masterData) {
      return true; // Master has all permissions
    }
    
    // Then check for admin role (admins have all standard permissions)
    if (permission !== 'master') {
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
        return true; // Admin has all standard permissions except master
      }
    }
    
    // Finally check for specific permission via user_permissions table
    const { data: permData, error: permError } = await supabase
      .from('user_permissions')
      .select('permission')
      .eq('user_id', userId)
      .eq('permission', permission)
      .maybeSingle();
      
    if (permError) {
      console.error('Error checking specific permission:', permError);
      return false;
    }
    
    return !!permData;
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
  permission: 'read' | 'write' | 'delete' | 'admin' | 'master'
): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  
  return hasPermission(user.id, permission);
};

/**
 * Checks if a user is a master admin (highest level of access)
 * @param userId The user ID to check
 * @returns True if the user is a master admin, false otherwise
 */
export const isUserMaster = async (userId: string): Promise<boolean> => {
  return await hasPermission(userId, 'master');
};

/**
 * Promotes a user to master admin (can only be done once in the system)
 * @param userId The user ID to promote
 * @returns True if promotion was successful, false if there's already a master admin
 */
export const promoteToMaster = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .rpc('promote_to_master', { target_user_id: userId });
    
    if (error) {
      console.error('Error promoting user to master:', error);
      return false;
    }
    
    return data === true;
  } catch (error) {
    console.error('Error promoting user to master:', error);
    return false;
  }
};

/**
 * Grants a specific permission to a user
 * @param userId The user ID to grant the permission to
 * @param permission The permission to grant
 * @returns True if permission was granted successfully, false otherwise
 */
export const grantPermission = async (
  userId: string,
  permission: string
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('user_permissions')
      .insert({
        user_id: userId,
        permission
      });
    
    if (error) {
      console.error('Error granting permission:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error granting permission:', error);
    return false;
  }
};

/**
 * Revokes a specific permission from a user
 * @param userId The user ID to revoke the permission from
 * @param permission The permission to revoke
 * @returns True if permission was revoked successfully, false otherwise
 */
export const revokePermission = async (
  userId: string,
  permission: string
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('user_permissions')
      .delete()
      .eq('user_id', userId)
      .eq('permission', permission);
    
    if (error) {
      console.error('Error revoking permission:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error revoking permission:', error);
    return false;
  }
};

/**
 * Enhances the isUserAdmin function to use database roles
 * @param userId The user ID to check
 * @returns True if the user is an admin, false otherwise
 */
export const isUserAdminEnhanced = async (userId: string): Promise<boolean> => {
  return await hasPermission(userId, 'admin');
};
