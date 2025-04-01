
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Default Supabase configuration
// These are placeholder values - in a real app, use your actual Supabase project
const DEMO_SUPABASE_URL = "https://guvbcxxulxcjotrdplkm.supabase.co";
const DEMO_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1dmJjeHh1bHhjam90cmRwbGttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2OTY2MTUsImV4cCI6MjAyODI3MjYxNX0.Dq1KqjGjOy7m3-LXZQ08I-s4B8nGJseCDRj2EYsn60I";

// Create the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEMO_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEMO_SUPABASE_ANON_KEY;

console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Anon Key:", supabaseAnonKey ? "Set" : "Not Set");

// Create the Supabase client with the values
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Demo account credentials
export const DEMO_EMAIL = "demo@tucanoronha.com";
export const DEMO_PASSWORD = "demo123456";
export const DEMO_NAME = "Usuário Demo";
