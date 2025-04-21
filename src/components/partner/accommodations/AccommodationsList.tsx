
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accommodation } from "@/types/database";
import { Pencil, Trash2, CalendarDays, Eye } from "lucide-react";
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
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import AccommodationFormDialog from "./AccommodationFormDialog";
import { Skeleton } from "@/components/ui/skeleton";

interface AccommodationsListProps {
  accommodations: Accommodation[];
  isLoading: boolean;
}

const AccommodationsList: React.FC<AccommodationsListProps> = ({ 
  accommodations,
  isLoading
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [editAccommodation, setEditAccommodation] = useState<Accommodation | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteAccommodation, setDeleteAccommodation] = useState<Accommodation | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (accommodation: Accommodation) => {
    setEditAccommodation(accommodation);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (accommodation: Accommodation) => {
    setDeleteAccommodation(accommodation);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteAccommodation) return;
    
    setIsDeleting(true);
    
    try {
      const { error } = await supabase
        .from('accommodations')
        .delete()
        .eq('id', deleteAccommodation.id);
        
      if (error) throw error;
      
      toast.success("Hospedagem excluída com sucesso");
      queryClient.invalidateQueries({ queryKey: ['accommodations'] });
    } catch (error) {
      console.error("Erro ao excluir hospedagem:", error);
      toast.error("Erro ao excluir hospedagem");
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      setDeleteAccommodation(null);
    }
  };

  const handleManageAvailability = (accommodationId: number) => {
    navigate(`/parceiro/hospedagens/${accommodationId}/disponibilidade`);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardHeader>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
            <CardFooter>
              <div className="flex justify-between w-full">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (accommodations.length === 0) {
    return (
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle>Nenhuma hospedagem encontrada</CardTitle>
          <CardDescription>
            Adicione sua primeira hospedagem clicando no botão "Nova Hospedagem" acima.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accommodations.map((accommodation) => (
          <Card key={accommodation.id} className="overflow-hidden">
            {accommodation.image_url && (
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={accommodation.image_url} 
                  alt={accommodation.title}
                  className="object-cover w-full h-full" 
                />
                <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(accommodation)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{accommodation.title}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {accommodation.type}
                </span>
              </CardTitle>
              <CardDescription>
                {accommodation.short_description}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Preço/noite</span>
                  <span className="font-medium">R$ {accommodation.price_per_night}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Capacidade</span>
                  <span>{accommodation.max_guests} hóspedes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Quartos</span>
                  <span>{accommodation.bedrooms} quartos, {accommodation.bathrooms} banheiros</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                size="sm"
                className="flex gap-1"
                onClick={() => handleManageAvailability(accommodation.id)}
              >
                <CalendarDays className="h-4 w-4" />
                Disponibilidade
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button 
                  variant="destructive" 
                  size="icon"
                  onClick={() => handleDelete(accommodation)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Edit Dialog */}
      {editAccommodation && (
        <AccommodationFormDialog
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setEditAccommodation(null);
          }}
          accommodation={editAccommodation}
        />
      )}
      
      {/* Delete Dialog */}
      <AlertDialog 
        open={isDeleteDialogOpen} 
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir a hospedagem "{deleteAccommodation?.title}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete} 
              className="bg-destructive hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AccommodationsList;
