
import { supabase } from '@/lib/supabase-client';
import { UserProfile } from '@/types/database';

export const getProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data as UserProfile;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

export const updateProfile = async (userId: string, updates: Partial<UserProfile>): Promise<UserProfile | null> => {
  try {
    // Convert preferences to a plain object for JSON storage
    const supabaseUpdates: Record<string, any> = { ...updates };
      
    // If there are preferences, make sure they're converted to a plain object
    if (updates.preferences) {
      supabaseUpdates.preferences = JSON.parse(JSON.stringify(updates.preferences));
    }
    
    const { data, error } = await supabase
      .from('user_profiles')
      .update(supabaseUpdates)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data as UserProfile;
  } catch (error) {
    console.error('Error updating profile:', error);
    return null;
  }
};

// Add more API functions as needed
