import { supabase } from "@/lib/supabase";

export class BaseApiService {
  protected supabase = supabase;
  
  /**
   * Helper method to handle Supabase errors
   */
  protected handleError(error: any, message: string = 'An error occurred'): never {
    console.error(message, error);
    throw new Error(`${message}: ${error?.message || 'Unknown error'}`);
  }
  
  /**
   * Helper method to format date for API requests
   */
  protected formatDate(date: Date | string): string {
    if (typeof date === 'string') return date;
    return date.toISOString();
  }
}
