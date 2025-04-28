
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
import { Loader2 } from "lucide-react";

interface DeleteTourDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tourToDelete: Tour | null;
  onConfirmDelete: () => Promise<void>;
  isDeleting?: boolean;
}

const DeleteTourDialog: React.FC<DeleteTourDialogProps> = ({
  open,
  onOpenChange,
  tourToDelete,
  onConfirmDelete,
  isDeleting = false,
}) => {
  return (
    <Dialog 
      open={open} 
      onOpenChange={(newValue) => {
        // Prevent closing while deletion is in progress
        if (!isDeleting) {
          onOpenChange(newValue);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar exclusão</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir o passeio "{tourToDelete?.title}"?
            Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancelar
          </Button>
          <Button 
            variant="destructive" 
            onClick={() => onConfirmDelete()}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Excluindo...
              </>
            ) : (
              "Excluir"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTourDialog;
