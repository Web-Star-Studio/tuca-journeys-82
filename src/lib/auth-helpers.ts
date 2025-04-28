
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
  return await hasRole(userId, 'admin');
};

export const isAdminEmail = (email: string | undefined): boolean => {
  if (!email) return false;
  
  const adminEmails = [
    'admin@tucanoronha.com',
    'felipe@webstar.studio'
  ];
  
  return adminEmails.includes(email);
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
