
import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize the auth state
  useEffect(() => {
    // Get the initial session
    const initializeAuth = async () => {
      setLoading(true);
      
      try {
        // Check for a mock session first
        const mockSessionStr = localStorage.getItem("supabase-mock-session");
        if (mockSessionStr) {
          const mockSession = JSON.parse(mockSessionStr);
          // Check if mock session is expired
          if (mockSession.expires_at > Math.floor(Date.now() / 1000)) {
            setSession(mockSession);
            setUser(mockSession.user);
            setLoading(false);
            return;
          } else {
            // Clear expired mock session
            localStorage.removeItem("supabase-mock-session");
          }
        }
        
        // Get the current session from Supabase
        const { data } = await supabase.auth.getSession();
        if (data?.session) {
          setSession(data.session);
          setUser(data.session.user);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
    
    // Set up the auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state changed:", event);
        
        // If we get a SIGNED_OUT event, also clear any mock session
        if (event === 'SIGNED_OUT') {
          localStorage.removeItem("supabase-mock-session");
        }
        
        setSession(currentSession);
        setUser(currentSession?.user || null);
        setLoading(false);
      }
    );
    
    // Cleanup
    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  return { user, session, loading, setLoading };
};
