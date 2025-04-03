
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface FormActionsProps {
  isSubmitting: boolean;
  packageId: number | null;
  onCancel: () => void;
}

const FormActions = ({ isSubmitting, packageId, onCancel }: FormActionsProps) => {
  return (
    <div className="flex justify-end gap-2 pt-4 border-t">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancelar
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {packageId ? "Salvando..." : "Criando..."}
          </>
        ) : (
          <>{packageId ? "Salvar Alterações" : "Criar Pacote"}</>
        )}
      </Button>
    </div>
  );
};

export default FormActions;
