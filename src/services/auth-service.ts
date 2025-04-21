
import { supabase } from "@/lib/supabase-client";
import { User } from "@supabase/supabase-js";
import { DemoService } from "./demo-service";

export type UserRole = 'admin' | 'partner' | 'customer';

export class AuthService {
  /**
   * Verifica se o usuário tem um determinado role
   */
  static async hasRole(user: User | null, role: UserRole): Promise<boolean> {
    if (!user) return false;

    try {
      // Para usuários demo, verificar role nos metadados
      if (DemoService.isDemoUser(user.id)) {
        const demoRole = user.user_metadata?.role || user.app_metadata?.role;
        return demoRole === role;
      }

      // Verificar na tabela user_roles
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', role)
        .maybeSingle();

      if (error) {
        console.error('Erro ao verificar role do usuário:', error);
        return false;
      }

      return !!data;
    } catch (error) {
      console.error(`Erro ao verificar se usuário tem role ${role}:`, error);
      return false;
    }
  }

  /**
   * Obtém o role principal do usuário
   */
  static async getUserRole(user: User | null): Promise<UserRole | null> {
    if (!user) return null;

    try {
      // Para usuários demo, verificar role nos metadados
      if (DemoService.isDemoUser(user.id)) {
        const demoRole = user.user_metadata?.role || user.app_metadata?.role;
        return (demoRole as UserRole) || 'customer';
      }

      // Verificar na tabela user_roles
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Erro ao obter role do usuário:', error);
        return null;
      }

      return data?.role as UserRole || null;
    } catch (error) {
      console.error('Erro ao obter role do usuário:', error);
      return null;
    }
  }

  /**
   * Verifica se o usuário é admin
   */
  static async isAdmin(user: User | null): Promise<boolean> {
    if (!user) return false;
    return this.hasRole(user, 'admin');
  }

  /**
   * Verifica se o usuário é parceiro
   */
  static async isPartner(user: User | null): Promise<boolean> {
    if (!user) return false;
    return this.hasRole(user, 'partner');
  }

  /**
   * Verifica se o usuário é cliente
   */
  static async isCustomer(user: User | null): Promise<boolean> {
    if (!user) return false;
    return this.hasRole(user, 'customer');
  }
}
