
import React from "react";
import { Tour } from "@/types/database";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteTourDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tourToDelete: Tour | null;
  onConfirmDelete: () => void;
}

const DeleteTourDialog: React.FC<DeleteTourDialogProps> = ({
  open,
  onOpenChange,
  tourToDelete,
  onConfirmDelete,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar exclusão</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir o passeio "{tourToDelete?.title}"?
            Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirmDelete}>
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTourDialog;
