
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../integrations/supabase/types';

const SUPABASE_URL = "https://xsctqejremuwmktmchef.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzY3RxZWpyZW11d21rdG1jaGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2NzEzMDEsImV4cCI6MjA1OTI0NzMwMX0.2IaG53q-EuHkupqC3qvOSSzf7wMVPKpYWoJsLt0susU";

// Create a single, consistent Supabase client with explicit auth configuration
export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);
