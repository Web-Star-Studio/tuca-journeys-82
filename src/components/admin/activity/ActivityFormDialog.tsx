
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ActivityForm from "./ActivityForm";

interface ActivityFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activityId?: number | null;
  onSuccess: () => void;
}

const ActivityFormDialog: React.FC<ActivityFormDialogProps> = ({
  open,
  onOpenChange,
  activityId,
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
            {activityId ? "Editar Atividade" : "Nova Atividade"}
          </DialogTitle>
          <DialogDescription>
            {activityId
              ? "Edite os detalhes da atividade abaixo."
              : "Preencha os detalhes da nova atividade abaixo."}
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
          <ActivityForm
            activityId={activityId || undefined}
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

export default ActivityFormDialog;
