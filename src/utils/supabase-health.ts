
import { supabase } from "@/lib/supabase";

export const checkSupabaseConnection = async (): Promise<{
  success: boolean;
  error?: string;
  connected: boolean;
}> => {
  try {
    // Test basic connectivity by making a simple request
    const { data, error } = await supabase
      .from('user_roles')
      .select('count(*)', { count: 'exact', head: true });

    if (error) {
      console.error("Supabase connectivity error:", error);
      return {
        success: false,
        error: `Database connection error: ${error.message}`,
        connected: false
      };
    }
    
    // Test auth system
    const { data: authData, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      console.error("Supabase auth error:", authError);
      return {
        success: false,
        error: `Auth system error: ${authError.message}`,
        connected: false
      };
    }

    return {
      success: true,
      connected: true
    };
  } catch (error: any) {
    console.error("Critical Supabase error:", error);
    return {
      success: false,
      error: `Critical error: ${error.message || "Unknown error"}`,
      connected: false
    };
  }
};

export const verifySupabaseIntegration = async () => {
  const results = {
    connection: await checkSupabaseConnection(),
    tables: {} as Record<string, boolean>,
    auth: false,
    permissions: false,
  };
  
  // If the basic connection failed, return early
  if (!results.connection.success) {
    return results;
  }
  
  // Test access to critical tables
  // Using a type-safe approach with explicit table names from the database schema
  try {
    const criticalTables = [
      'user_profiles', 
      'user_roles', 
      'tours', 
      'accommodations', 
      'bookings'
    ] as const;
    
    for (const table of criticalTables) {
      const { error } = await supabase
        .from(table)
        .select('count(*)', { count: 'exact', head: true });
        
      results.tables[table] = !error;
    }
  } catch (error) {
    console.error("Error testing table access:", error);
  }
  
  // Test auth system more thoroughly
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    results.auth = !error && !!session;
  } catch (error) {
    console.error("Error testing auth system:", error);
  }
  
  return results;
};
