
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Accommodation } from "@/types/database";
import AccommodationForm from "./AccommodationForm";

interface AccommodationFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  accommodation?: Partial<Accommodation>;
}

const AccommodationFormDialog: React.FC<AccommodationFormDialogProps> = ({ 
  isOpen, 
  onClose,
  accommodation
}) => {
  const handleSuccess = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {accommodation?.id ? "Editar hospedagem" : "Nova hospedagem"}
          </DialogTitle>
          <DialogDescription>
            {accommodation?.id
              ? "Atualize os detalhes da sua hospedagem."
              : "Adicione uma nova hospedagem ao seu catálogo."}
          </DialogDescription>
        </DialogHeader>
        
        <AccommodationForm 
          accommodation={accommodation}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AccommodationFormDialog;
