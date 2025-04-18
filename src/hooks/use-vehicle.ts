
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vehicleService } from '@/services';
import { Vehicle } from '@/types/vehicle';
import { toast } from 'sonner';

/**
 * Hook for getting a vehicle by ID
 */
export const useVehicle = (id?: number) => {
  return useQuery({
    queryKey: ['vehicle', id],
    queryFn: () => id ? vehicleService.getVehicleById(id) : null,
    enabled: !!id,
  });
};

/**
 * Hook for getting all vehicles
 */
export const useVehicles = () => {
  return useQuery({
    queryKey: ['vehicles'],
    queryFn: () => vehicleService.getVehicles(),
  });
};

/**
 * Hook for getting vehicles by partner ID
 */
export const usePartnerVehicles = (partnerId?: string) => {
  return useQuery({
    queryKey: ['vehicles', 'partner', partnerId],
    queryFn: () => partnerId ? vehicleService.getVehiclesByPartnerId(partnerId) : [],
    enabled: !!partnerId,
  });
};

/**
 * Hook for creating a vehicle
 */
export const useCreateVehicle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (vehicleData: Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>) => {
      return vehicleService.createVehicle(vehicleData);
    },
    onSuccess: (data) => {
      toast.success('Veículo criado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      queryClient.invalidateQueries({ queryKey: ['vehicles', 'partner', data.partner_id] });
    },
    onError: (error: any) => {
      toast.error(`Erro ao criar veículo: ${error.message}`);
    }
  });
};

/**
 * Hook for updating a vehicle
 */
export const useUpdateVehicle = (id?: number) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (vehicleData: Partial<Vehicle>) => {
      if (!id) throw new Error('Vehicle ID is required');
      return vehicleService.updateVehicle(id, vehicleData);
    },
    onSuccess: (data) => {
      toast.success('Veículo atualizado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['vehicle', id] });
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      queryClient.invalidateQueries({ queryKey: ['vehicles', 'partner', data.partner_id] });
    },
    onError: (error: any) => {
      toast.error(`Erro ao atualizar veículo: ${error.message}`);
    }
  });
};

/**
 * Hook for deleting a vehicle
 */
export const useDeleteVehicle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (vehicleId: number) => {
      return vehicleService.deleteVehicle(vehicleId);
    },
    onSuccess: () => {
      toast.success('Veículo excluído com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
    onError: (error: any) => {
      toast.error(`Erro ao excluir veículo: ${error.message}`);
    }
  });
};

/**
 * Hook for creating a vehicle booking
 */
export const useCreateVehicleBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (bookingData: Omit<any, 'id' | 'created_at' | 'updated_at'>) => {
      return vehicleService.createVehicleBooking(bookingData);
    },
    onSuccess: () => {
      toast.success('Reserva de veículo realizada com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (error: any) => {
      toast.error(`Erro ao reservar veículo: ${error.message}`);
    }
  });
};
