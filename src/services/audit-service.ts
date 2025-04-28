
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { BaseApiService } from "./base-api";

export enum AuditAction {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LOGIN = 'login',
  LOGOUT = 'logout',
  PERMISSION_CHANGE = 'permission_change',
  ROLE_CHANGE = 'role_change',
}

export interface AuditLog {
  id: number;
  user_id: string;
  action: AuditAction;
  table_name: string | null;
  record_id: string | null;
  old_data: any | null;
  new_data: any | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
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
    action: AuditAction,
    tableName?: string,
    recordId?: string | number,
    oldData?: any,
    newData?: any,
  ): Promise<void> {
    try {
      // Use type assertion to handle the audit_logs table that's not in TypeScript types yet
      const { error } = await this.supabase
        .from('audit_logs' as any)
        .insert([{
          user_id: user?.id || null,
          action,
          table_name: tableName || null,
          record_id: recordId?.toString() || null,
          old_data: oldData || null,
          new_data: newData || null,
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
      action?: AuditAction;
      tableName?: string;
      recordId?: string | number;
      fromDate?: string;
      toDate?: string;
    } = {},
    page = 1,
    pageSize = 20
  ): Promise<{ data: AuditLog[] | null; count: number | null }> {
    try {
      // Use type assertion to handle the audit_logs table that's not in TypeScript types yet
      let query = this.supabase
        .from('audit_logs' as any)
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
      
      // Type assertion to ensure the data matches the AuditLog interface
      return { 
        data: data as unknown as AuditLog[], 
        count 
      };
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      return { data: null, count: null };
    }
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
