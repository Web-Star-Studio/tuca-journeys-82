
import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize the auth state
  useEffect(() => {
    // Set up the auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
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
        // Check for a mock session first
        const mockSessionStr = localStorage.getItem("supabase-mock-session");
        if (mockSessionStr) {
          try {
            const mockSession = JSON.parse(mockSessionStr);
            // Check if mock session is expired
            if (mockSession.expires_at > Math.floor(Date.now() / 1000)) {
              console.log("Found valid mock session, setting user state");
              setSession(mockSession);
              setUser(mockSession.user);
              setLoading(false);
              return;
            } else {
              // Clear expired mock session
              console.log("Mock session expired, removing it");
              localStorage.removeItem("supabase-mock-session");
            }
          } catch (error) {
            console.error("Error parsing mock session:", error);
            localStorage.removeItem("supabase-mock-session");
          }
        }
        
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
        // Clear all session data on error
        localStorage.removeItem("supabase-mock-session");
        setSession(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
    
    // Cleanup
    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  return { user, session, loading, setLoading };
};
