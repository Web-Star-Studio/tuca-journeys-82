
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface PermissionGateProps {
  children: React.ReactNode;
  permission: 'read' | 'write' | 'delete' | 'admin' | 'master';
  fallback?: React.ReactNode;
}

/**
 * A component that only renders its children if the user has the specified permission
 * Master users automatically have access to all permissions
 */
const PermissionGate: React.FC<PermissionGateProps> = ({ 
  children, 
  permission,
  fallback = null
}) => {
  const { user, checkPermission } = useAuth();
  const [hasAccessPermission, setHasAccessPermission] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const checkAccess = async () => {
      if (!user) {
        if (isMounted) {
          setHasAccessPermission(false);
          setIsChecking(false);
        }
        return;
      }
      
      try {
        // Check for master permission first (masters have access to everything)
        const isMaster = await checkPermission('master');
        
        // If user is master or has the specific permission, grant access
        const result = isMaster || await checkPermission(permission);
        
        if (isMounted) {
          setHasAccessPermission(result);
        }
      } catch (error) {
        console.error('Error checking permission:', error);
        if (isMounted) {
          setHasAccessPermission(false);
        }
      } finally {
        if (isMounted) {
          setIsChecking(false);
        }
      }
    };
    
    checkAccess();
    
    return () => {
      isMounted = false;
    };
  }, [user, permission, checkPermission]);

  if (isChecking) {
    // Could return a loading state here if desired
    return null;
  }

  return hasAccessPermission ? <>{children}</> : <>{fallback}</>;
};

export default PermissionGate;
