
import { supabase } from '@/lib/supabase-client';
import { UserProfile, UserPreferences } from '@/types/database';

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
  
  return data as UserProfile;
};

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating user profile:', error);
    return null;
  }
  
  return data as UserProfile;
};

export const getUserPreferences = async (userId: string): Promise<UserPreferences | null> => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('preferences')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching user preferences:', error);
    return null;
  }
  
  return data?.preferences as UserPreferences || null;
};

export const updateUserPreferences = async (userId: string, preferences: Partial<UserPreferences>): Promise<boolean> => {
  // First, fetch the current preferences
  const { data: currentData, error: fetchError } = await supabase
    .from('user_profiles')
    .select('preferences')
    .eq('id', userId)
    .single();
  
  if (fetchError) {
    console.error('Error fetching current preferences:', fetchError);
    return false;
  }
  
  // Merge the current preferences with the new ones
  const mergedPreferences = {
    ...(currentData?.preferences || {}),
    ...preferences
  };
  
  // Update with the merged preferences
  const { error } = await supabase
    .from('user_profiles')
    .update({ preferences: mergedPreferences })
    .eq('id', userId);
  
  if (error) {
    console.error('Error updating user preferences:', error);
    return false;
  }
  
  return true;
};
