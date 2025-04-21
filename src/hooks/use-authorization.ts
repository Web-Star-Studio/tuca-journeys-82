
import { useAuth } from "@/contexts/AuthContext";
import { AuthService, UserRole } from "@/services/auth-service";
import { useQuery } from "@tanstack/react-query";
import { User } from "@supabase/supabase-js";

/**
 * Hook para gerenciar autorização e papéis do usuário
 * Otimizado para reduzir consultas redundantes
 */
export const useAuthorization = () => {
  const { user } = useAuth();
  
  // Única consulta para obter o role do usuário
  const { data: userRole, isLoading, error } = useQuery({
    queryKey: ['user-role', user?.id],
    queryFn: async () => {
      if (!user) return null;
      return AuthService.getUserRole(user);
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // 5 minutos de cache para reduzir consultas
  });
  
  // Valores derivados do role principal, sem consultas adicionais
  const isAdmin = userRole === 'admin';
  const isPartner = userRole === 'partner';
  const isCustomer = userRole === 'customer';
  
  // Método para verificar roles dinamicamente
  const hasRole = async (role: UserRole): Promise<boolean> => {
    if (!user) return false;
    
    // Verificamos o cache primeiro
    if (userRole === role) return true;
    
    // Se não temos o role no cache ou é diferente, consultamos o serviço
    return AuthService.hasRole(user, role);
  };
  
  return {
    userRole,
    isAdmin,
    isPartner,
    isCustomer,
    hasRole,
    isLoading,
    error
  };
};
