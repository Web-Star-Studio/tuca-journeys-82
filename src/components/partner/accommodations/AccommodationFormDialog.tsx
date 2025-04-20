
import React from "react";
import { Accommodation } from "@/types/database";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AccommodationForm from "./AccommodationForm";
import { useAccommodations } from "@/hooks/use-accommodations";

interface AccommodationFormDialogProps {
  accommodation?: Accommodation;
  isOpen: boolean;
  onClose: () => void;
}

const AccommodationFormDialog = ({
  accommodation,
  isOpen,
  onClose,
}: AccommodationFormDialogProps) => {
  const { createAccommodation, updateAccommodation } = useAccommodations();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (data: Partial<Accommodation>) => {
    setIsLoading(true);
    
    try {
      if (accommodation?.id) {
        await updateAccommodation({ ...data, id: accommodation.id });
      } else {
        await createAccommodation(data);
      }
      onClose();
    } catch (error) {
      console.error("Error saving accommodation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const dialogTitle = accommodation?.id ? "Editar Hospedagem" : "Nova Hospedagem";
  const dialogDescription = accommodation?.id 
    ? "Atualize os detalhes da sua hospedagem." 
    : "Adicione uma nova hospedagem ao seu catálogo.";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <AccommodationForm
          initialData={accommodation}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AccommodationFormDialog;
