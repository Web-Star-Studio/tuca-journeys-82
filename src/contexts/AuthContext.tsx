
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { SignOutResult } from '@/types/auth';
import { useAuthState } from '@/hooks/auth/use-auth-state';
import { useAuthOperations } from '@/hooks/auth/use-auth-operations';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<SignOutResult>;
  signUp: (email: string, password: string, name: string) => Promise<any>;
  resetPassword: (email: string) => Promise<any>;
  checkPermission: (permission: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  isAdmin: false,
  signIn: async () => ({}),
  signOut: async () => ({ success: false }),
  signUp: async () => ({}),
  resetPassword: async () => ({}),
  checkPermission: async () => false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, session, loading } = useAuthState();
  const { signIn, signOut, signUp, resetPassword } = useAuthOperations();
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        try {
          // Check if user has admin role
          const { data, error } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .in('role', ['admin', 'master'])
            .single();

          if (data && !error) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, [user]);

  const checkPermission = async (permission: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Check if user has specific permission
      const { data, error } = await supabase
        .rpc('user_has_permission', {
          user_id: user.id,
          required_permission: permission
        });

      if (error) throw error;
      return !!data;
    } catch (error) {
      console.error('Error checking permission:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      isAdmin,
      signIn,
      signOut,
      signUp,
      resetPassword,
      checkPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
