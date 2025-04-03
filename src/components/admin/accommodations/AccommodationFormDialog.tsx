
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AccommodationForm } from "./AccommodationForm";

interface AccommodationFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accommodationId?: number;
  onSuccess: () => void;
}

const AccommodationFormDialog: React.FC<AccommodationFormDialogProps> = ({
  open,
  onOpenChange,
  accommodationId,
  onSuccess,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {accommodationId ? "Editar Hospedagem" : "Nova Hospedagem"}
          </DialogTitle>
          <DialogDescription>
            {accommodationId
              ? "Edite os detalhes da hospedagem abaixo."
              : "Preencha os detalhes da nova hospedagem abaixo."}
          </DialogDescription>
        </DialogHeader>
        <AccommodationForm
          accommodationId={accommodationId}
          onCancel={() => onOpenChange(false)}
          onSuccess={() => {
            onSuccess();
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AccommodationFormDialog;
