
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { hasPermission, grantPermission, revokePermission } from '@/lib/role-helpers';

export type Permission = 'read' | 'write' | 'delete' | 'admin' | 'master';

export const usePermission = (permission: Permission) => {
  const { user } = useAuth();
  const [hasAccessPermission, setHasAccessPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const checkUserPermission = async () => {
      setIsLoading(true);
      
      if (!user) {
        if (isMounted) {
          setHasAccessPermission(false);
          setIsLoading(false);
        }
        return;
      }
      
      const result = await hasPermission(user.id, permission);
      
      if (isMounted) {
        setHasAccessPermission(result);
        setIsLoading(false);
      }
    };
    
    checkUserPermission();
    
    return () => {
      isMounted = false;
    };
  }, [user, permission]);

  const grantUserPermission = async (userId: string, perm: string) => {
    if (!user) return false;
    const result = await grantPermission(userId, perm);
    
    // Re-check current user's permissions if we're modifying their permissions
    if (userId === user.id) {
      const updatedPermission = await hasPermission(user.id, permission);
      setHasAccessPermission(updatedPermission);
    }
    
    return result;
  };

  const revokeUserPermission = async (userId: string, perm: string) => {
    if (!user) return false;
    const result = await revokePermission(userId, perm);
    
    // Re-check current user's permissions if we're modifying their permissions
    if (userId === user.id) {
      const updatedPermission = await hasPermission(user.id, permission);
      setHasAccessPermission(updatedPermission);
    }
    
    return result;
  };

  return { 
    hasPermission: hasAccessPermission, 
    isLoading,
    grantPermission: grantUserPermission,
    revokePermission: revokeUserPermission
  };
};

export default usePermission;
