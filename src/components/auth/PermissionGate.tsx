
import React, { useState, useEffect } from 'react';
import { hasPermission } from '@/lib/role-helpers';
import { useAuth } from '@/contexts/AuthContext';

interface PermissionGateProps {
  children: React.ReactNode;
  permission: 'read' | 'write' | 'delete' | 'admin' | 'master';
  fallback?: React.ReactNode;
}

/**
 * A component that only renders its children if the user has the specified permission
 */
const PermissionGate: React.FC<PermissionGateProps> = ({ 
  children, 
  permission,
  fallback = null
}) => {
  const { user } = useAuth();
  const [hasAccessPermission, setHasAccessPermission] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const checkPermission = async () => {
      if (!user) {
        if (isMounted) {
          setHasAccessPermission(false);
          setIsChecking(false);
        }
        return;
      }
      
      try {
        const result = await hasPermission(user.id, permission);
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
    
    checkPermission();
    
    return () => {
      isMounted = false;
    };
  }, [user, permission]);

  if (isChecking) {
    // Could return a loading state here if desired
    return null;
  }

  return hasAccessPermission ? <>{children}</> : <>{fallback}</>;
};

export default PermissionGate;
