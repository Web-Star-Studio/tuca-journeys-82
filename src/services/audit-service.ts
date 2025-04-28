
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { BaseApiService } from "./base-api";

export enum AuditAction {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LOGIN = 'login',
  LOGOUT = 'logout',
  PERMISSION_GRANT = 'permission_grant',
  PERMISSION_REVOKE = 'permission_revoke',
  ROLE_CHANGE = 'role_change',
}

export interface AuditLog {
  id: number;
  user_id: string;
  action: AuditAction | string;
  table_name: string | null;
  record_id: string | null;
  old_data: any | null;
  new_data: any | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
  target_user_id: string | null;
  change_details: any | null;
}

/**
 * Service for handling audit logs
 */
export class AuditService extends BaseApiService {
  /**
   * Add an audit log entry
   */
  async addAuditLog(
    user: User | null,
    action: AuditAction | string,
    tableName?: string,
    recordId?: string | number,
    oldData?: any,
    newData?: any,
    targetUserId?: string,
    changeDetails?: any
  ): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('audit_logs')
        .insert([{
          user_id: user?.id || null,
          action,
          table_name: tableName || null,
          record_id: recordId?.toString() || null,
          old_data: oldData || null,
          new_data: newData || null,
          target_user_id: targetUserId || null,
          change_details: changeDetails || null,
          ip_address: null, // This would require server-side code
          user_agent: navigator.userAgent || null,
        }]);
      
      if (error) {
        console.error('Error adding audit log:', error);
      }
    } catch (error) {
      console.error('Error adding audit log:', error);
    }
  }

  /**
   * Get audit logs with optional filtering
   */
  async getAuditLogs(
    filters: {
      userId?: string;
      action?: AuditAction | string;
      tableName?: string;
      recordId?: string | number;
      targetUserId?: string;
      fromDate?: string;
      toDate?: string;
    } = {},
    page = 1,
    pageSize = 20
  ): Promise<{ data: AuditLog[] | null; count: number | null }> {
    try {
      let query = this.supabase
        .from('audit_logs')
        .select('*', { count: 'exact' });
      
      // Apply filters
      if (filters.userId) {
        query = query.eq('user_id', filters.userId);
      }
      
      if (filters.action) {
        query = query.eq('action', filters.action);
      }
      
      if (filters.tableName) {
        query = query.eq('table_name', filters.tableName);
      }
      
      if (filters.recordId) {
        query = query.eq('record_id', filters.recordId.toString());
      }
      
      if (filters.targetUserId) {
        query = query.eq('target_user_id', filters.targetUserId);
      }
      
      if (filters.fromDate) {
        query = query.gte('created_at', filters.fromDate);
      }
      
      if (filters.toDate) {
        query = query.lte('created_at', filters.toDate);
      }
      
      // Add pagination
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      
      query = query
        .order('created_at', { ascending: false })
        .range(from, to);
      
      const { data, error, count } = await query;
      
      if (error) {
        console.error('Error fetching audit logs:', error);
        return { data: null, count: null };
      }
      
      return { 
        data: data as unknown as AuditLog[], 
        count 
      };
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      return { data: null, count: null };
    }
  }

  /**
   * Log permission change events
   */
  async logPermissionChange(
    user: User | null,
    action: 'grant' | 'revoke',
    userId: string,
    permission: string
  ): Promise<void> {
    await this.addAuditLog(
      user,
      action === 'grant' ? AuditAction.PERMISSION_GRANT : AuditAction.PERMISSION_REVOKE,
      'user_permissions',
      null,
      null,
      null,
      userId,
      { permission }
    );
  }

  /**
   * Log role change events
   */
  async logRoleChange(
    user: User | null,
    userId: string,
    oldRole: string | null,
    newRole: string
  ): Promise<void> {
    await this.addAuditLog(
      user,
      AuditAction.ROLE_CHANGE,
      'user_roles',
      null,
      { role: oldRole },
      { role: newRole },
      userId,
      { old_role: oldRole, new_role: newRole }
    );
  }
}

export const auditService = new AuditService();

/**
 * Add an authentication audit log
 */
export const logAuthEvent = async (
  user: User | null,
  action: AuditAction.LOGIN | AuditAction.LOGOUT
): Promise<void> => {
  await auditService.addAuditLog(
    user,
    action,
    'auth',
    user?.id
  );
};
