
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Eye } from "lucide-react";
import { Accommodation } from "@/types/database";
import { useAccommodations } from "@/hooks/use-accommodations";
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
import AccommodationFormDialog from "./AccommodationFormDialog";
import SafeImage from "@/components/ui/safe-image";

interface AccommodationItemProps {
  accommodation: Accommodation;
}

const AccommodationItem = ({ accommodation }: AccommodationItemProps) => {
  const { deleteAccommodation } = useAccommodations();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!accommodation.id) return;
    
    setIsDeleting(true);
    try {
      await deleteAccommodation(accommodation.id);
    } catch (error) {
      console.error("Error deleting accommodation:", error);
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            {accommodation.image_url && (
              <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                <SafeImage
                  src={accommodation.image_url}
                  alt={accommodation.title}
                  className="w-full h-full object-cover"
                  fallbackSrc="/placeholder.svg"
                />
              </div>
            )}
            
            <div className="flex-grow space-y-1">
              <div className="flex justify-between">
                <h3 className="font-medium">{accommodation.title}</h3>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setIsEditDialogOpen(true)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-destructive"
                    onClick={() => setIsDeleteDialogOpen(true)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-2">
                {accommodation.description}
              </p>
              
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={accommodation.is_available ? "default" : "secondary"}>
                  {accommodation.is_available ? "Disponível" : "Indisponível"}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  R$ {accommodation.price_per_night.toLocaleString('pt-BR')} /noite
                </span>
                <span className="text-sm text-muted-foreground">
                  {accommodation.bedrooms} quarto(s) • {accommodation.max_guests} hóspede(s)
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog 
        open={isDeleteDialogOpen} 
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Hospedagem</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir &quot;{accommodation.title}&quot;? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              disabled={isDeleting} 
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AccommodationFormDialog
        accommodation={accommodation}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      />
    </>
  );
};

export default AccommodationItem;
