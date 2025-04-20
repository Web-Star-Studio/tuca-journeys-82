
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
    // Em um ambiente real, verificaríamos no Supabase
    // const { data, error } = await supabase
    //   .from('user_roles')
    //   .select('role')
    //   .eq('user_id', userId)
    //   .eq('role', 'admin')
    //   .maybeSingle();
    // 
    // if (error) throw error;
    // return !!data;
    
    // Para demonstração, verificamos o localStorage
    const adminEmail = localStorage.getItem('adminEmail');
    
    // Verificamos se o usuário tem o email no localStorage
    if (adminEmail) {
      const { data: userData } = await supabase.auth.getUser();
      return userData?.user?.email === adminEmail;
    }
    
    return false;
  } catch (error) {
    console.error('Erro ao verificar permissões de admin:', error);
    return false;
  }
}
