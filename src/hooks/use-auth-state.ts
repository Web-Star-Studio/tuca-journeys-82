
import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize the auth state
  useEffect(() => {
    // Clear any mock sessions on mount
    localStorage.removeItem("supabase-mock-session");
    
    // Set up the auth state change listener first (best practice)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event);
        
        if (event === "SIGNED_OUT") {
          setSession(null);
          setUser(null);
        } else if (currentSession) {
          setSession(currentSession);
          setUser(currentSession?.user || null);
        }
        setLoading(false);
      }
    );
    
    // Get the initial session
    const initializeAuth = async () => {
      setLoading(true);
      
      try {
        // Make sure we clean up any lingering mock sessions from previous uses
        localStorage.removeItem("supabase-mock-session");
        
        // Get the current session from Supabase but don't auto-restore it
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        
        // We want to force login, so we'll clear any existing session
        await supabase.auth.signOut();
        setSession(null);
        setUser(null);

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
