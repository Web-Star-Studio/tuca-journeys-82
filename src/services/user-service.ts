import { supabase } from '@/lib/supabase-client';
import { UserProfile } from '@/types/database';

// Additional export for userService
export const userService = {
  getUserProfile,
  updateUserProfile,
  getUserPreferences,
  updateUserPreferences,
  getUserRoles
};

// Add the missing getUserRoles function
async function getUserRoles(userId: string): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId);
    
    if (error) throw error;
    
    return data.map(item => item.role);
  } catch (error) {
    console.error('Error fetching user roles:', error);
    return [];
  }
}

async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
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
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

async function updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile | null> {
  try {
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
  } catch (error) {
    console.error('Error updating user profile:', error);
    return null;
  }
}

async function getUserPreferences(userId: string): Promise<any | null> {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('preferences')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching user preferences:', error);
      return null;
    }
    
    return data?.preferences || null;
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    return null;
  }
}

async function updateUserPreferences(userId: string, preferences: any): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_profiles')
      .update({ preferences: preferences })
      .eq('id', userId);
    
    if (error) {
      console.error('Error updating user preferences:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error updating user preferences:', error);
    return false;
  }
}
