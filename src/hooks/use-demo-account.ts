
import { useEffect } from "react";
import { supabase, DEMO_EMAIL, DEMO_PASSWORD, DEMO_NAME } from "@/lib/supabase";

export const useDemoAccount = () => {
  // Ensure demo account exists
  useEffect(() => {
    const createDemoAccountIfNeeded = async () => {
      try {
        // Check if demo user exists by trying to sign in
        const { error } = await supabase.auth.signInWithPassword({
          email: DEMO_EMAIL,
          password: DEMO_PASSWORD,
        });
        
        // If we get an error about user not found, create the demo account
        if (error && error.message.includes("Invalid login credentials")) {
          console.log("Creating demo account...");
          
          const { error: signUpError } = await supabase.auth.signUp({
            email: DEMO_EMAIL,
            password: DEMO_PASSWORD,
            options: {
              data: {
                name: DEMO_NAME,
              },
            },
          });
          
          if (signUpError) {
            console.error("Error creating demo account:", signUpError);
          } else {
            console.log("Demo account created successfully");
          }
        }
        
        // Sign out after checking/creating
        await supabase.auth.signOut();
      } catch (error) {
        console.error("Error ensuring demo account exists:", error);
      }
    };
    
    createDemoAccountIfNeeded();
  }, []);
};
