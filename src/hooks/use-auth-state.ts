
import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize the auth state
  useEffect(() => {
    // Set up the auth state change listener first (best practice)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event);
        
        setSession(currentSession);
        setUser(currentSession?.user || null);
        setLoading(false);
      }
    );
    
    // Get the initial session
    const initializeAuth = async () => {
      setLoading(true);
      
      try {
        // Get the current session from Supabase
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        
        if (data?.session) {
          console.log("Found Supabase session, setting user state");
          setSession(data.session);
          setUser(data.session.user);
        } else {
          console.log("No valid session found");
          setSession(null);
          setUser(null);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        setSession(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
    
    // Cleanup
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return { user, session, loading, setLoading };
};
