
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ActivityForm, { ActivityFormValues } from "./ActivityForm";

interface ActivityFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activityId?: number;
  onSuccess: () => void;
}

const ActivityFormDialog: React.FC<ActivityFormDialogProps> = ({
  open,
  onOpenChange,
  activityId,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
        {error && (
          <div className="bg-red-50 text-red-800 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        <ActivityForm
          activityId={activityId}
          onSuccess={onSuccess}
          onCancel={() => onOpenChange(false)}
          setLoading={setLoading}
          setError={setError}
        />
      </DialogContent>
    </Dialog>
  );
};

// Use export type for re-exporting types when isolatedModules is enabled
export type { ActivityFormValues };
export default ActivityFormDialog;
