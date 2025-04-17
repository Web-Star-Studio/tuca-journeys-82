
import { BaseApiService } from './base-api';
import { UserProfile } from '@/types';

/**
 * Service for handling user-related API calls
 */
export class UserService extends BaseApiService {
  /**
   * Get a user's profile
   */
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await this.supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is the error for "no rows returned"
      console.error('Error fetching user profile:', error);
      throw error;
    }
    
    return data || null;
  }

  /**
   * Create or update a user's profile
   */
  async createOrUpdateUserProfile(profile: Partial<UserProfile> & { id: string }): Promise<UserProfile> {
    // Check if profile exists
    try {
      const existingProfile = await this.getUserProfile(profile.id);
      
      if (existingProfile) {
        // Update
        const { data, error } = await this.supabase
          .from('user_profiles')
          .update(profile)
          .eq('id', profile.id)
          .select()
          .single();
        
        if (error) {
          throw error;
        }
        
        return data;
      } else {
        // Create
        const { data, error } = await this.supabase
          .from('user_profiles')
          .insert([profile])
          .select()
          .single();
        
        if (error) {
          throw error;
        }
        
        return data;
      }
    } catch (error) {
      console.error('Error creating/updating user profile:', error);
      throw error;
    }
  }

  /**
   * Get all roles for a user
   */
  async getUserRoles(userId: string): Promise<string[]> {
    const { data, error } = await this.supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error fetching user roles:', error);
      throw error;
    }
    
    return data.map(item => item.role);
  }

  /**
   * Check if a user has a specific role
   */
  async hasRole(userId: string, roleName: string): Promise<boolean> {
    if (!userId) return false;
    
    try {
      const roles = await this.getUserRoles(userId);
      return roles.includes(roleName);
    } catch (error) {
      console.error('Error checking user role:', error);
      return false;
    }
  }
}

export const userService = new UserService();
