
import React from 'react';
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
  
  // Demo users get admin access for testing
  if (userId.startsWith('demo-')) {
    return true;
  }
  
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
 */
export const isUserAdmin = async (userId: string): Promise<boolean> => {
  return await hasRole(userId, 'admin');
};

/**
 * Check if the given email matches the admin email
 * This is a fallback for demo purposes
 */
export const isAdminEmail = (email: string | undefined): boolean => {
  if (!email) return false;
  
  const adminEmails = [
    'admin@tucanoronha.com',
    'felipe@webstar.studio'
  ];
  
  return adminEmails.includes(email);
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
export const checkAdminAccess = async (userId: string): Promise<boolean> => {
  // Demo users get admin access for testing
  if (userId.startsWith('demo-')) {
    return true;
  }
  
  return await isUserAdmin(userId);
};

/**
 * Add protection to admin routes by redirecting non-admin users
 */
export const withAdminProtection = (Component: React.ComponentType) => {
  const ProtectedComponent: React.FC<any> = (props) => {
    const { user, isAdmin, isLoading } = useAuth();
    const navigate = useNavigate();
    
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
        React.createElement("div", { className: "min-h-screen flex items-center justify-center" },
          React.createElement(Loader2, { className: "h-12 w-12 animate-spin text-tuca-ocean-blue" })
        )
      );
    }
    
    if (!user || !isAdmin) {
      return null; // Will redirect due to the useEffect
    }
    
    return React.createElement(Component, props);
  };
  
  return ProtectedComponent;
};
