
import { supabase } from "./supabase";

/**
 * Verifica se o email é de um administrador
 */
export const isAdminEmail = (email: string | undefined | null): boolean => {
  if (!email) return false;
  
  const adminEmails = [
    'admin@tucanoronha.com',
    'felipe@webstar.studio'
  ];
  
  return adminEmails.includes(email.toLowerCase());
};

/**
 * Verifica se o usuário tem função de administrador no banco de dados
 */
export async function isUserAdmin(userId: string): Promise<boolean> {
  try {
    // Verificar se o usuário tem a função 'admin' na tabela user_roles
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();
    
    if (error) throw error;
    
    // Se encontrou um registro, o usuário é admin
    return !!data;
  } catch (error) {
    console.error('Erro ao verificar permissões de admin:', error);
    return false;
  }
}

/**
 * Verifica se o usuário é um parceiro verificado
 */
export async function isUserPartner(userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('partners')
      .select('id, is_verified')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (error) throw error;
    
    // Usuário é parceiro e está verificado
    return !!data && data.is_verified === true;
  } catch (error) {
    console.error('Erro ao verificar status de parceiro:', error);
    return false;
  }
}

/**
 * Verifica se o usuário tem uma função específica
 */
export async function hasUserRole(userId: string, role: 'admin' | 'partner' | 'customer'): Promise<boolean> {
  try {
    if (!userId) return false;
    
    // Verificar direto na tabela de user_roles
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', role)
      .maybeSingle();
    
    if (error) throw error;
    
    return !!data;
  } catch (error) {
    console.error(`Erro ao verificar se usuário tem função ${role}:`, error);
    return false;
  }
}
