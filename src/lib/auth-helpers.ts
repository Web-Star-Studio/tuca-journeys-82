
import React from 'react'; // Add React import for JSX
import { supabase } from "./supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Check if the current user has a specific role
 * @param userId User ID to check
 * @param role Role to check for
 * @returns Boolean indicating if the user has the role
 */
export const hasRole = async (userId: string, role: string): Promise<boolean> => {
  if (!userId) return false;
  
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', role)
      .single();
    
    if (error) {
      console.error('Error checking user role:', error);
      return false;
    }
    
    return !!data;
  } catch (error) {
    console.error('Error checking user role:', error);
    return false;
  }
};

/**
 * Check if a user is an admin by checking the user_roles table
 * and also checking against known admin emails as fallback
 */
export const isUserAdmin = async (userId: string, email?: string): Promise<boolean> => {
  // First check the user_roles table
  const hasAdminRole = await hasRole(userId, 'admin');
  if (hasAdminRole) return true;
  
  // Fallback to checking email (for demo/development)
  return isAdminEmail(email);
};

/**
 * Check if the given email matches the admin email
 * This is a fallback for demo purposes
 */
export const isAdminEmail = (email: string | undefined): boolean => {
  return email === "admin@tucanoronha.com" || email === "felipe@webstar.studio";
};

/**
 * Set admin role for a user in the user_roles table
 * This function should be used for newly registered admin users
 */
export const setAdminRole = async (userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('user_roles')
      .insert([
        { 
          user_id: userId, 
          role: 'admin'
        }
      ]);
    
    if (error) {
      console.error('Error setting admin role:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error setting admin role:', error);
    return false;
  }
};

/**
 * Check if the current user has admin access, checking both session data and custom claims
 */
export const checkAdminAccess = async (userId: string, email?: string): Promise<boolean> => {
  // First try to check via user_roles table
  try {
    const hasAdminRole = await hasRole(userId, 'admin');
    if (hasAdminRole) return true;
  } catch (error) {
    console.error('Error checking admin role:', error);
  }
  
  // Fallback to checking email (for demo purposes)
  return isAdminEmail(email);
};

/**
 * Add protection to admin routes by redirecting non-admin users
 */
export const withAdminProtection = (Component: React.ComponentType) => {
  const ProtectedComponent: React.FC<any> = (props) => { // Use React.FC for functional component
    const { user, isAdmin, isLoading } = useAuth();
    const navigate = useNavigate(); // Use useNavigate hook instead of props.navigate
    
    useEffect(() => {
      if (!isLoading) {
        if (!user) {
          navigate('/login');
        } else if (!isAdmin) {
          navigate('/dashboard');
        }
      }
    }, [user, isAdmin, isLoading, navigate]);

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-tuca-ocean-blue" />
        </div>
      );
    }
    
    if (!user || !isAdmin) {
      return null; // Will redirect due to the useEffect
    }
    
    return <Component {...props} />;
  };
  
  return ProtectedComponent;
};
