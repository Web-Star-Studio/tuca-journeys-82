
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Car,
  Plus,
  Trash2,
  Check,
  X,
  FileEdit,
  CalendarRange
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface VehicleUnit {
  id: number;
  vehicle_id: number;
  identifier: string;
  status: 'available' | 'maintenance' | 'rented';
  notes?: string;
  created_at: string;
  updated_at: string;
  last_maintenance?: string | null;
  next_maintenance?: string | null;
}

interface FleetManagerProps {
  vehicleId: number;
}

const VehicleStatusBadge = ({ status }: { status: VehicleUnit['status'] }) => {
  let bgColor = '';
  let statusText = '';
  let statusIcon = null;
  
  switch(status) {
    case 'available':
      bgColor = 'bg-green-100 text-green-800';
      statusText = 'Disponível';
      statusIcon = <Check className="h-3 w-3 mr-1" />;
      break;
    case 'maintenance':
      bgColor = 'bg-orange-100 text-orange-800';
      statusText = 'Em manutenção';
      statusIcon = <FileEdit className="h-3 w-3 mr-1" />;
      break;
    case 'rented':
      bgColor = 'bg-blue-100 text-blue-800';
      statusText = 'Alugado';
      statusIcon = <CalendarRange className="h-3 w-3 mr-1" />;
      break;
    default:
      bgColor = 'bg-gray-100 text-gray-800';
      statusText = 'Desconhecido';
  }
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${bgColor}`}>
      {statusIcon}
      {statusText}
    </span>
  );
};

const FleetManager = ({ vehicleId }: FleetManagerProps) => {
  const queryClient = useQueryClient();
  const [identifier, setIdentifier] = useState("");
  const [notes, setNotes] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<VehicleUnit | null>(null);
  const [nextMaintenance, setNextMaintenance] = useState<Date | undefined>(undefined);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Query for fetching vehicle units
  const { data: vehicleUnits, isLoading } = useQuery({
    queryKey: ['vehicle-units', vehicleId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vehicle_units')
        .select('*')
        .eq('vehicle_id', vehicleId)
        .order('identifier', { ascending: true });
        
      if (error) throw error;
      
      return (data || []) as VehicleUnit[];
    },
    enabled: !!vehicleId,
  });

  // Mutation for adding new vehicle unit
  const addVehicleUnit = useMutation({
    mutationFn: async (unitData: Omit<VehicleUnit, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('vehicle_units')
        .insert(unitData)
        .select()
        .single();
        
      if (error) throw error;
      return data as VehicleUnit;
    },
    onSuccess: () => {
      toast.success("Veículo adicionado com sucesso");
      queryClient.invalidateQueries({ queryKey: ['vehicle-units', vehicleId] });
      setIsAddModalOpen(false);
      setIdentifier("");
      setNotes("");
    },
    onError: (error) => {
      toast.error("Erro ao adicionar veículo: " + error.message);
    }
  });

  // Mutation for updating vehicle unit status
  const updateVehicleStatus = useMutation({
    mutationFn: async ({ 
      unitId, 
      status,
      nextMaintenance 
    }: { 
      unitId: number; 
      status: VehicleUnit['status'];
      nextMaintenance?: Date;
    }) => {
      const { data, error } = await supabase
        .from('vehicle_units')
        .update({ 
          status,
          last_maintenance: status === 'maintenance' ? new Date().toISOString() : undefined,
          next_maintenance: nextMaintenance ? nextMaintenance.toISOString() : undefined,
          updated_at: new Date().toISOString()
        })
        .eq('id', unitId)
        .select()
        .single();
        
      if (error) throw error;
      return data as VehicleUnit;
    },
    onSuccess: () => {
      toast.success("Status atualizado com sucesso");
      queryClient.invalidateQueries({ queryKey: ['vehicle-units', vehicleId] });
      setIsMaintenanceModalOpen(false);
      setSelectedUnit(null);
      setNextMaintenance(undefined);
    },
    onError: (error) => {
      toast.error("Erro ao atualizar status: " + error.message);
    }
  });

  // Mutation for deleting vehicle unit
  const deleteVehicleUnit = useMutation({
    mutationFn: async (unitId: number) => {
      const { error } = await supabase
        .from('vehicle_units')
        .delete()
        .eq('id', unitId);
        
      if (error) throw error;
      return { success: true };
    },
    onSuccess: () => {
      toast.success("Veículo removido com sucesso");
      queryClient.invalidateQueries({ queryKey: ['vehicle-units', vehicleId] });
      setIsDeleteDialogOpen(false);
      setSelectedUnit(null);
    },
    onError: (error) => {
      toast.error("Erro ao remover veículo: " + error.message);
    }
  });

  // Add a new vehicle unit
  const handleAddUnit = () => {
    if (!identifier) {
      toast.error("Informe a identificação do veículo");
      return;
    }

    addVehicleUnit.mutate({
      vehicle_id: vehicleId,
      identifier,
      status: 'available',
      notes
    });
  };

  // Change vehicle status
  const handleStatusChange = (unit: VehicleUnit, status: VehicleUnit['status']) => {
    if (status === 'maintenance') {
      // Open maintenance modal
      setSelectedUnit(unit);
      setIsMaintenanceModalOpen(true);
    } else {
      // Directly update status
      updateVehicleStatus.mutate({ unitId: unit.id, status });
    }
  };

  // Set maintenance with date
  const handleSetMaintenance = () => {
    if (!selectedUnit) return;
    
    updateVehicleStatus.mutate({
      unitId: selectedUnit.id,
      status: 'maintenance',
      nextMaintenance
    });
  };

  // Delete vehicle unit
  const handleDeleteUnit = () => {
    if (!selectedUnit) return;
    deleteVehicleUnit.mutate(selectedUnit.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar Veículo
        </Button>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : vehicleUnits?.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <Car className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-medium mb-1">Nenhum veículo na frota</h3>
            <p className="text-sm text-muted-foreground">
              Adicione veículos à sua frota para gerenciar a disponibilidade.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehicleUnits?.map((unit) => (
            <Card key={unit.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">
                  <span className="flex items-center">
                    <Car className="mr-2 h-5 w-5" />
                    {unit.identifier}
                  </span>
                </CardTitle>
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => {
                    setSelectedUnit(unit);
                    setIsDeleteDialogOpen(true);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <VehicleStatusBadge status={unit.status} />
                </div>
                
                {unit.next_maintenance && (
                  <div>
                    <span className="text-sm text-muted-foreground block">
                      Próxima manutenção:
                    </span>
                    <span className="text-sm font-medium">
                      {new Date(unit.next_maintenance).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                )}
                
                {unit.notes && (
                  <div>
                    <span className="text-sm text-muted-foreground block">
                      Notas:
                    </span>
                    <p className="text-sm">{unit.notes}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    size="sm"
                    variant={unit.status === 'available' ? 'default' : 'outline'}
                    className={unit.status === 'available' ? 'bg-green-500' : ''}
                    onClick={() => handleStatusChange(unit, 'available')}
                  >
                    <Check className="h-4 w-4 mr-1" /> Disponível
                  </Button>
                  <Button
                    size="sm"
                    variant={unit.status === 'maintenance' ? 'default' : 'outline'}
                    className={unit.status === 'maintenance' ? 'bg-orange-500' : ''}
                    onClick={() => handleStatusChange(unit, 'maintenance')}
                  >
                    <FileEdit className="h-4 w-4 mr-1" /> Manutenção
                  </Button>
                  <Button
                    size="sm"
                    variant={unit.status === 'rented' ? 'default' : 'outline'}
                    className={unit.status === 'rented' ? 'bg-blue-500' : ''}
                    onClick={() => handleStatusChange(unit, 'rented')}
                  >
                    <CalendarRange className="h-4 w-4 mr-1" /> Alugado
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* Add Vehicle Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar veículo à frota</DialogTitle>
            <DialogDescription>
              Adicione um novo veículo à sua frota com identificação única.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium mb-1">
                Identificação do veículo
              </label>
              <Input
                id="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Ex: PLACA-123 ou Modelo 2023 #1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Use uma identificação única para cada veículo da sua frota
              </p>
            </div>
            
            <div>
              <label htmlFor="notes" className="block text-sm font-medium mb-1">
                Notas (opcional)
              </label>
              <Input
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Informações adicionais sobre este veículo"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleAddUnit}
              disabled={addVehicleUnit.isPending || !identifier}
            >
              {addVehicleUnit.isPending ? "Adicionando..." : "Adicionar Veículo"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Maintenance Modal */}
      <Dialog open={isMaintenanceModalOpen} onOpenChange={setIsMaintenanceModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agendar manutenção</DialogTitle>
            <DialogDescription>
              Defina a data para a próxima manutenção do veículo.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Veículo: {selectedUnit?.identifier}
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Data da próxima manutenção
              </label>
              <Calendar
                mode="single"
                selected={nextMaintenance}
                onSelect={setNextMaintenance}
                className="rounded-md border"
                disabled={(date) => date < new Date()}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMaintenanceModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleSetMaintenance}
              disabled={updateVehicleStatus.isPending}
            >
              {updateVehicleStatus.isPending ? "Salvando..." : "Confirmar Manutenção"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover o veículo "{selectedUnit?.identifier}" da frota?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteVehicleUnit.isPending}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUnit}
              className="bg-destructive hover:bg-destructive/90"
              disabled={deleteVehicleUnit.isPending}
            >
              {deleteVehicleUnit.isPending ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FleetManager;
