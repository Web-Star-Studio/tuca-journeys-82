
import React from "react";
import { Button } from "@/components/ui/button";

interface TourFormActionsProps {
  onCancel: () => void;
  isEditing: boolean;
}

const TourFormActions: React.FC<TourFormActionsProps> = ({
  onCancel,
  isEditing,
}) => {
  return (
    <div className="flex justify-end gap-2">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancelar
      </Button>
      <Button type="submit">
        {isEditing ? "Atualizar Passeio" : "Criar Passeio"}
      </Button>
    </div>
  );
};

export default TourFormActions;
