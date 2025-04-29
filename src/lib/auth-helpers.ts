import React from 'react';
import { supabase } from "./supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

export const isUserAdmin = async (userId: string): Promise<boolean> => {
  // First check if user has admin permission directly
  try {
    const { data: permData, error: permError } = await supabase.rpc('user_has_permission', {
      user_id: userId,
      required_permission: 'admin'
    });
    
    if (permError) {
      console.error('Error checking admin permission:', permError);
      // Fall back to checking role
      return await hasRole(userId, 'admin');
    }
    
    if (permData) return true;
    
    // If no admin permission found, check for master permission
    const { data: masterData, error: masterError } = await supabase.rpc('user_has_permission', {
      user_id: userId,
      required_permission: 'master'
    });
    
    if (masterError) {
      console.error('Error checking master permission:', masterError);
      // Fall back to checking role
      return await hasRole(userId, 'master');
    }
    
    return !!masterData;
  } catch (error) {
    console.error('Error checking admin status:', error);
    // Fall back to checking roles
    return await hasRole(userId, 'admin') || await hasRole(userId, 'master');
  }
};

// We'll keep this function for backward compatibility, but it will now check the database
export const isAdminEmail = (email: string | undefined): boolean => {
  if (!email) return false;
  
  // Legacy admin emails - keeping for backward compatibility during transition
  const legacyAdminEmails = [
    'admin@tucanoronha.com',
    'felipe@webstar.studio'
  ];
  
  if (legacyAdminEmails.includes(email)) return true;
  
  // For other emails, we'll need to check the DB asynchronously
  // Since this is a sync function, we'll update the auth context to handle this properly
  return false;
};

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
      return null;
    }
    
    return React.createElement(Component, props);
  };
  
  return ProtectedComponent;
};
