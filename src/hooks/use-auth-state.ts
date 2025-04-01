
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize the auth state
  useEffect(() => {
    // Check for mock session in localStorage
    const checkSession = () => {
      try {
        const storedSession = localStorage.getItem('supabase.auth.token');
        if (storedSession) {
          const parsedSession = JSON.parse(storedSession);
          if (parsedSession.currentSession?.user) {
            setUser(parsedSession.currentSession.user as User);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error parsing stored session:", error);
        setUser(null);
        setLoading(false);
      }
    };

    // Initial check
    checkSession();
    
    // Listen for auth state changes
    const handleAuthChange = () => {
      checkSession();
    };
    
    window.addEventListener('supabase.auth.token-change', handleAuthChange);
    
    // Cleanup
    return () => {
      window.removeEventListener('supabase.auth.token-change', handleAuthChange);
    };
  }, []);

  return { user, loading, setLoading };
};
