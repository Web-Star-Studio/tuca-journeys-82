
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TourForm } from "./TourForm";

interface TourFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tourId?: number;
  onSuccess: () => void;
}

const TourFormDialog: React.FC<TourFormDialogProps> = ({
  open,
  onOpenChange,
  tourId,
  onSuccess,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {tourId ? "Editar Passeio" : "Novo Passeio"}
          </DialogTitle>
          <DialogDescription>
            {tourId
              ? "Edite os detalhes do passeio abaixo."
              : "Preencha os detalhes do novo passeio abaixo."}
          </DialogDescription>
        </DialogHeader>
        <TourForm
          tourId={tourId}
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

export default TourFormDialog;
