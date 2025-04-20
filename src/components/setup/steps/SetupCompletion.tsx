
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, AlertCircle } from "lucide-react";

interface SetupCompletionProps {
  isComplete: boolean;
}

export const SetupCompletion: React.FC<SetupCompletionProps> = ({ isComplete }) => {
  if (!isComplete) {
    return (
      <div className="flex items-center text-sm text-amber-600 w-full">
        <AlertCircle className="mr-2 h-4 w-4" />
        Complete todos os passos para continuar.
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center text-sm text-green-600 w-full">
        <Check className="mr-2 h-4 w-4" />
        Configuração concluída! Você já pode acessar o sistema.
      </div>
      <div className="text-center mt-4">
        <Button asChild>
          <a href="/login">Acessar o Sistema</a>
        </Button>
      </div>
    </>
  );
};
