
import { supabase } from '@/lib/supabase';

/**
 * Base API service for interacting with Supabase
 */
export class BaseApiService {
  protected supabase = supabase;
}
