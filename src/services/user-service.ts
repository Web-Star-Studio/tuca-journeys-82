import { BaseApiService } from './base-api';
import { supabase } from '@/lib/supabase';
import { UserProfile, UserPreferences } from '@/types/database';
import { DemoService } from './demo-service';

export class UserService extends BaseApiService {
  /**
   * Get user roles by user ID
   */
  async getUserRoles(userId: string): Promise<string[]> {
    try {
      // Handle demo users
      if (DemoService.isDemoUser(userId)) {
        const email = await this.getUserEmail(userId);
        
        if (email === "admin@tucanoronha.com" || email === "felipe@webstar.studio") {
          return ["admin"];
        }
        
        if (email === "partner@demo.com") {
          return ["partner"];
        }
        
        return ["customer"];
      }
      
      // Handle regular users
      const { data, error } = await this.supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);

      if (error) {
        console.error("Error fetching user roles:", error);
        return [];
      }

      return data?.map(item => item.role) || [];
    } catch (error) {
      console.error("Error in getUserRoles:", error);
      return [];
    }
  }

  /**
   * Get user email by user ID
   */
  async getUserEmail(userId: string): Promise<string | null> {
    try {
      // Handle demo users
      if (DemoService.isDemoUser(userId)) {
        // Extract email from localStorage for demo users
        const mockSession = localStorage.getItem("supabase-mock-session");
        if (mockSession) {
          const session = JSON.parse(mockSession);
          return session.user?.email || null;
        }
        return null;
      }
      
      // For real users
      const { data, error } = await this.supabase
        .from('user_profiles')
        .select('email')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data?.email || null;
    } catch (error) {
      console.error("Error getting user email:", error);
      return null;
    }
  }

  // Add any other user-related methods as needed
}

export const userService = new UserService();
