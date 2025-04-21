
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { bookingService } from '@/services';
import { toast } from 'sonner';

/**
 * Hook melhorado para buscar reservas do usuário com tratamento de erros
 * e armazenamento em cache mais eficiente
 */
export const useBookingsList = (options: { 
  enabled?: boolean; 
  limit?: number;
  status?: 'all' | 'confirmed' | 'pending' | 'cancelled';
  refetchInterval?: number; // Novo: intervalo automático de atualização
} = {}) => {
  const { 
    enabled = true,
    limit,
    status = 'all',
    refetchInterval = 0
  } = options;
  
  const { user } = useAuth();
  
  const { 
    data: bookings = [], 
    isLoading, 
    error,
    refetch,
    isRefetching
  } = useQuery({
    queryKey: ['bookings', user?.id, limit, status],
    queryFn: async () => {
      if (!user?.id) return [];
      
      try {
        const allBookings = await bookingService.getUserBookings(user.id);
        
        // Filtrar por status se necessário
        let filteredBookings = allBookings;
        if (status !== 'all') {
          filteredBookings = allBookings.filter(booking => booking.status === status);
        }
        
        // Aplicar limite se necessário
        if (limit && limit > 0) {
          filteredBookings = filteredBookings.slice(0, limit);
        }
        
        return filteredBookings;
      } catch (err) {
        console.error("Erro ao carregar reservas:", err);
        
        // Só mostrar toast quando não estiver apenas atualizando em segundo plano
        if (!isRefetching) {
          toast.error("Erro ao carregar suas reservas");
        }
        
        throw err; // Propagar erro para que a query seja marcada como falha
      }
    },
    enabled: !!user?.id && enabled,
    refetchInterval: refetchInterval > 0 ? refetchInterval : undefined,
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 30,  // 30 minutos (anteriormente chamado cacheTime)
    retry: (failureCount, error: any) => {
      // Limitar tentativas para erros de rede, não retentar para erros de autorização
      if (error?.status === 401 || error?.status === 403) {
        return false;
      }
      return failureCount < 3;
    },
  });
  
  return {
    bookings,
    isLoading,
    error,
    refetch,
    isRefetching
  };
};
