
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ActivityFormActionsProps {
  onCancel: () => void;
  isEditing: boolean;
  isSubmitting?: boolean;
}

const ActivityFormActions: React.FC<ActivityFormActionsProps> = ({
  onCancel,
  isEditing,
  isSubmitting = false,
}) => {
  return (
    <div className="flex justify-end gap-2">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
        disabled={isSubmitting}
      >
        Cancelar
      </Button>
      <Button 
        type="submit" 
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            {isEditing ? "Atualizando..." : "Criando..."}
          </>
        ) : (
          isEditing ? "Atualizar Atividade" : "Criar Atividade"
        )}
      </Button>
    </div>
  );
};

export default ActivityFormActions;
