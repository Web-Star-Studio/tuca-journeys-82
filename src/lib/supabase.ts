
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Supabase configuration using the new project
const SUPABASE_URL = "https://xsctqejremuwmktmchef.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzY3RxZWpyZW11d21rdG1jaGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2NzEzMDEsImV4cCI6MjA1OTI0NzMwMX0.2IaG53q-EuHkupqC3qvOSSzf7wMVPKpYWoJsLt0susU";

console.log("Supabase URL:", SUPABASE_URL);
console.log("Supabase Anon Key:", SUPABASE_ANON_KEY ? "Set" : "Not Set");

// Create the Supabase client with explicit auth configuration
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    storage: localStorage
  }
});

// Demo account credentials
export const DEMO_EMAIL = "demo@tucanoronha.com";
export const DEMO_PASSWORD = "demo123456";
export const DEMO_NAME = "Usuário Demo";
