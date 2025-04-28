
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TourForm } from "./TourForm";
import { Loader2 } from "lucide-react";

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
  const [isLoading, setIsLoading] = React.useState(false);
  const [loadError, setLoadError] = React.useState<string | null>(null);

  // Reset error state when dialog opens/closes
  React.useEffect(() => {
    if (open) {
      setLoadError(null);
    }
  }, [open]);

  return (
    <Dialog 
      open={open} 
      onOpenChange={(newOpen) => {
        // Only allow closing if not in loading state
        if (!isLoading || !newOpen) {
          onOpenChange(newOpen);
        }
      }}
    >
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
        
        {loadError ? (
          <div className="p-4 text-center text-red-600 bg-red-50 rounded-md">
            <p className="font-medium">Erro ao carregar dados</p>
            <p className="mt-1 text-sm">{loadError}</p>
            <button 
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm"
              onClick={() => {
                setLoadError(null);
                onOpenChange(false);
              }}
            >
              Fechar
            </button>
          </div>
        ) : (
          <TourForm
            tourId={tourId}
            onCancel={() => onOpenChange(false)}
            onSuccess={() => {
              onSuccess();
              onOpenChange(false);
            }}
            setLoading={setIsLoading}
            setError={setLoadError}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TourFormDialog;
