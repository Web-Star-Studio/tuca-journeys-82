
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { useAuthOperations } from "@/hooks/auth/use-auth-operations";
import { useAuthState } from "@/hooks/auth/use-auth-state";
import { useResetPassword } from "@/hooks/auth/use-reset-password";
import { isAdminEmail, isUserAdmin } from "@/lib/auth-helpers";
import { currentUserHasPermission, preloadUserPermissions } from "@/lib/role-helpers";
import { SignOutResult } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  permissions: {
    canRead: boolean;
    canWrite: boolean;
    canDelete: boolean;
    isAdmin: boolean;
  };
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, name: string) => Promise<any>;
  signOut: () => Promise<SignOutResult>;
  resetPassword: (email: string) => Promise<any>;
  checkPermission: (permission: 'read' | 'write' | 'delete' | 'admin' | 'master') => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  isAdmin: false,
  permissions: {
    canRead: false,
    canWrite: false,
    canDelete: false,
    isAdmin: false,
  },
  signIn: async () => ({}),
  signUp: async () => ({}),
  signOut: async () => ({ success: false }),
  resetPassword: async () => ({}),
  checkPermission: async () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, session, loading: isLoading, setLoading } = useAuthState();
  const { signIn: authSignIn, signUp: authSignUp, signOut: authSignOut } = useAuthOperations();
  const { resetPassword: authResetPassword } = useResetPassword();
  
  // State for user permissions
  const [permissions, setPermissions] = useState({
    canRead: false,
    canWrite: false,
    canDelete: false,
    isAdmin: false,
  });
  
  // Save current user email in localStorage for legacy support during transition
  useEffect(() => {
    if (user?.email) {
      window.localStorage.setItem('current_user_email', user.email);
    } else {
      window.localStorage.removeItem('current_user_email');
    }
  }, [user]);
  
  // Update permissions when user changes
  useEffect(() => {
    const updatePermissions = async () => {
      if (user) {
        try {
          // Preload permissions for better performance
          await preloadUserPermissions(user.id);
          
          const [canRead, canWrite, canDelete, isAdmin] = await Promise.all([
            currentUserHasPermission('read'),
            currentUserHasPermission('write'),
            currentUserHasPermission('delete'),
            currentUserHasPermission('admin'),
          ]);
          
          setPermissions({
            canRead,
            canWrite,
            canDelete,
            isAdmin,
          });
        } catch (error) {
          console.error('Error updating permissions:', error);
          setPermissions({
            canRead: false,
            canWrite: false,
            canDelete: false,
            isAdmin: false,
          });
        }
      } else {
        setPermissions({
          canRead: false,
          canWrite: false,
          canDelete: false,
          isAdmin: false,
        });
      }
    };
    
    updatePermissions();
  }, [user]);
  
  // Check admin status on login/signup
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await authSignIn(email, password);
      if (result.data?.user) {
        const isAdmin = await isUserAdmin(result.data.user.id);
        result.data.user.app_metadata = result.data.user.app_metadata || {};
        result.data.user.app_metadata.isAdmin = isAdmin;
        
        // Store email in localStorage for legacy support
        if (result.data.user.email) {
          window.localStorage.setItem('current_user_email', result.data.user.email);
        }
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const result = await authSignUp(email, password, name);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<SignOutResult> => {
    setLoading(true);
    try {
      // Clean up localStorage
      window.localStorage.removeItem('current_user_email');
      return await authSignOut();
    } finally {
      setLoading(false);
    }
  };
  
  const resetPassword = async (email: string) => {
    return await authResetPassword(email);
  };
  
  // Function to check if user has a specific permission
  const checkPermission = async (permission: 'read' | 'write' | 'delete' | 'admin' | 'master') => {
    if (!user) return false;
    return await currentUserHasPermission(permission);
  };

  const value = {
    user,
    session,
    isLoading,
    isAdmin: !!user && (permissions.isAdmin || user.app_metadata?.isAdmin),
    permissions,
    signIn,
    signUp,
    signOut,
    resetPassword,
    checkPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
