
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, AlertCircle, Loader2 } from "lucide-react";
import { markSetupAsComplete } from "@/utils/seedDatabase";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface SetupCompletionProps {
  isComplete: boolean;
}

export const SetupCompletion: React.FC<SetupCompletionProps> = ({ isComplete }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFinalized, setIsFinalized] = useState(false);
  const navigate = useNavigate();
  
  const handleCompleteSetup = async () => {
    if (!isComplete) {
      toast.error("Complete todos os passos antes de finalizar o setup");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const result = await markSetupAsComplete();
      
      if (result.success) {
        toast.success("Setup finalizado com sucesso!");
        setIsFinalized(true);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Erro ao finalizar setup:", error);
      toast.error("Erro ao finalizar o setup");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isComplete) {
    return (
      <div className="flex items-center text-sm text-amber-600 w-full">
        <AlertCircle className="mr-2 h-4 w-4" />
        Complete todos os passos para continuar.
      </div>
    );
  }

  if (isFinalized) {
    return (
      <>
        <div className="flex items-center text-sm text-green-600 w-full">
          <Check className="mr-2 h-4 w-4" />
          Configuração concluída! Você já pode acessar o sistema.
        </div>
        <div className="text-center mt-4">
          <Button onClick={() => navigate("/login")}>
            Acessar o Sistema
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center text-sm text-green-600 w-full">
        <Check className="mr-2 h-4 w-4" />
        Todos os passos concluídos! Clique no botão para finalizar a configuração.
      </div>
      <div className="text-center mt-4">
        <Button 
          onClick={handleCompleteSetup}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Finalizando...
            </>
          ) : (
            "Finalizar Configuração"
          )}
        </Button>
      </div>
    </>
  );
};
