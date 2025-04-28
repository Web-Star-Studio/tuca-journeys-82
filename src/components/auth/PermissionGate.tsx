
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface PermissionGateProps {
  children: React.ReactNode;
  permission: 'read' | 'write' | 'delete' | 'admin';
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
  const { permissions } = useAuth();
  
  // Early return for admin users who have all permissions
  if (permissions.isAdmin) {
    return <>{children}</>;
  }
  
  // Check specific permissions
  switch (permission) {
    case 'read':
      return permissions.canRead ? <>{children}</> : <>{fallback}</>;
    case 'write':
      return permissions.canWrite ? <>{children}</> : <>{fallback}</>;
    case 'delete':
      return permissions.canDelete ? <>{children}</> : <>{fallback}</>;
    case 'admin':
      return permissions.isAdmin ? <>{children}</> : <>{fallback}</>;
    default:
      return <>{fallback}</>;
  }
};

export default PermissionGate;
