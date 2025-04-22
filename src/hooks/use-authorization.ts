
import { useAuth } from "@/contexts/AuthContext";
import { AuthService, UserRole } from "@/services/auth-service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

/**
 * Hook para gerenciar autorização e papéis do usuário
 * Otimizado para reduzir consultas redundantes
 */
export const useAuthorization = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  // Única consulta para obter o role do usuário
  const { data: userRole, isLoading, error } = useQuery({
    queryKey: ['user-role', user?.id],
    queryFn: async () => {
      if (!user) return null;
      try {
        return await AuthService.getUserRole(user);
      } catch (error: any) {
        console.error("Erro ao obter role do usuário:", error);
        throw new Error(`Falha ao obter permissões: ${error.message}`);
      }
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // 5 minutos de cache para reduzir consultas
    retry: 2,
    onError: (error: any) => {
      // Esse toast só aparece se houver um erro real, não se o usuário estiver deslogado
      if (user) {
        toast.error(error.message || "Erro ao verificar permissões");
      }
    }
  });
  
  // Valores derivados do role principal, sem consultas adicionais
  const isAdmin = userRole === 'admin';
  const isPartner = userRole === 'partner';
  const isCustomer = userRole === 'customer';
  
  // Método para verificar roles dinamicamente
  const hasRole = async (role: UserRole): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Verificamos o cache primeiro
      if (userRole === role) return true;
      
      // Se não temos o role no cache ou é diferente, consultamos o serviço
      const hasRoleResult = await AuthService.hasRole(user, role);
      
      // Atualizamos o cache se for um role diferente do que já temos
      if (hasRoleResult && userRole !== role) {
        queryClient.setQueryData(['user-role', user.id], role);
      }
      
      return hasRoleResult;
    } catch (error) {
      console.error(`Erro ao verificar role ${role}:`, error);
      return false;
    }
  };
  
  // Método para revalidar o role (útil após mudanças)
  const refreshRole = () => {
    if (user?.id) {
      queryClient.invalidateQueries({ queryKey: ['user-role', user.id] });
    }
  };
  
  return {
    userRole,
    isAdmin,
    isPartner,
    isCustomer,
    hasRole,
    refreshRole,
    isLoading,
    error
  };
};
