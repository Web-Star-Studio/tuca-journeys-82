import { supabase } from "./supabase";
import { permissionCache } from "@/utils/permissionCache";
import { withTimeout } from "@/utils/asyncUtils";

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
  
  // Check cache first for improved performance
  const cachedResult = permissionCache.getPermission(userId, permission);
  if (cachedResult !== null) {
    return cachedResult;
  }
  
  try {
    const checkPermission = async (): Promise<boolean> => {
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
        // Cache all common permissions when we detect a master user
        permissionCache.setPermission(userId, 'read', true);
        permissionCache.setPermission(userId, 'write', true);
        permissionCache.setPermission(userId, 'delete', true);
        permissionCache.setPermission(userId, 'admin', true);
        permissionCache.setPermission(userId, 'master', true);
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
          // Cache all common permissions for admin
          permissionCache.setPermission(userId, 'read', true);
          permissionCache.setPermission(userId, 'write', true);
          permissionCache.setPermission(userId, 'delete', true);
          permissionCache.setPermission(userId, 'admin', true);
          return true; // Admin has all standard permissions except master
        }
      }
      
      // Finally check for specific permission via user_has_permission RPC function
      const { data, error } = await supabase.rpc('user_has_permission', {
        user_id: userId,
        required_permission: permission
      });
      
      if (error) {
        console.error('Error checking specific permission:', error);
        return false;
      }
      
      const result = !!data;
      permissionCache.setPermission(userId, permission, result);
      return result;
    };

    // Use timeout wrapper to prevent UI freezing
    return await withTimeout(checkPermission, 5000, false);
  } catch (error) {
    console.error('Error checking user permission:', error);
    return false;
  }
};

/**
 * Preload common permissions for a user to avoid multiple database calls
 */
export const preloadUserPermissions = async (userId: string): Promise<void> => {
  if (!userId) return;
  
  const commonPermissions = ['read', 'write', 'delete', 'admin'];
  await permissionCache.preloadPermissions(userId, commonPermissions);
};

/**
 * Checks if the current authenticated user has a specific permission
 * @param permission The permission to check for
 * @returns True if the current user has the permission, false otherwise
 */
export const currentUserHasPermission = async (
  permission: 'read' | 'write' | 'delete' | 'admin' | 'master'
): Promise<boolean> => {
  const getUserPermission = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;
    
    return hasPermission(user.id, permission);
  };

  return await withTimeout(getUserPermission, 3000, false);
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
    const promoteUser = async () => {
      const { data, error } = await supabase
        .rpc('promote_to_master', { target_user_id: userId });
      
      if (error) {
        console.error('Error promoting user to master:', error);
        return false;
      }
      
      return data === true;
    };
    
    return await withTimeout(promoteUser, 3000, false);
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
    const grantUserPermission = async () => {
      // Using the grant_permission RPC function
      const { data, error } = await supabase.rpc('grant_permission', {
        target_user_id: userId,
        permission_name: permission
      });
      
      if (error) {
        console.error('Error granting permission:', error);
        return false;
      }
      
      return data === true;
    };
    
    return await withTimeout(grantUserPermission, 3000, false);
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
    const revokeUserPermission = async () => {
      // Using the revoke_permission RPC function
      const { data, error } = await supabase.rpc('revoke_permission', {
        target_user_id: userId,
        permission_name: permission
      });
      
      if (error) {
        console.error('Error revoking permission:', error);
        return false;
      }
      
      return data === true;
    };
    
    return await withTimeout(revokeUserPermission, 3000, false);
  } catch (error) {
    console.error('Error revoking permission:', error);
    return false;
  }
};

/**
 * Revokes all permissions from a user
 * @param userId The user ID to revoke all permissions from
 * @returns True if permissions were revoked successfully, false otherwise
 */
export const revokeAllPermissions = async (
  userId: string
): Promise<boolean> => {
  try {
    const revokeAll = async () => {
      // Using a dedicated RPC function to revoke all permissions
      const { data, error } = await supabase.rpc('revoke_all_permissions', {
        target_user_id: userId
      });
      
      if (error) {
        console.error('Error revoking all permissions:', error);
        return false;
      }
      
      return data === true;
    };
    
    return await withTimeout(revokeAll, 3000, false);
  } catch (error) {
    console.error('Error revoking all permissions:', error);
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

