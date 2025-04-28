
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const usePermission = (permission: 'read' | 'write' | 'delete' | 'admin') => {
  const { user, checkPermission } = useAuth();
  const [hasPermission, setHasPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const checkUserPermission = async () => {
      setIsLoading(true);
      
      if (!user) {
        if (isMounted) {
          setHasPermission(false);
          setIsLoading(false);
        }
        return;
      }
      
      const result = await checkPermission(permission);
      
      if (isMounted) {
        setHasPermission(result);
        setIsLoading(false);
      }
    };
    
    checkUserPermission();
    
    return () => {
      isMounted = false;
    };
  }, [user, permission, checkPermission]);

  return { hasPermission, isLoading };
};

export default usePermission;
