
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Check } from "lucide-react";
import { seedDatabase } from "@/utils/seedDatabase";
import { toast } from "sonner";

interface DatabaseSeedStepProps {
  isSeeding: boolean;
  seedingComplete: boolean;
  onSeedComplete: () => void;
}

export const DatabaseSeedStep: React.FC<DatabaseSeedStepProps> = ({
  isSeeding,
  seedingComplete,
  onSeedComplete,
}) => {
  const handleSeedDatabase = async () => {
    if (seedingComplete) {
      toast.info("O banco de dados já foi inicializado");
      return;
    }
    
    try {
      const result = await seedDatabase();
      if (result.success) {
        toast.success("Banco de dados inicializado com sucesso!");
        onSeedComplete();
      } else {
        toast.error("Erro ao inicializar o banco de dados");
      }
    } catch (error) {
      console.error("Error seeding database:", error);
      toast.error("Erro ao inicializar o banco de dados");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">1. Inicializar Banco de Dados</h3>
        {seedingComplete ? <Check className="h-5 w-5 text-green-500" /> : null}
      </div>
      <Button 
        onClick={handleSeedDatabase}
        disabled={isSeeding || seedingComplete}
        className="w-full"
      >
        {isSeeding ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Inicializando...
          </>
        ) : seedingComplete ? (
          "Banco de Dados Inicializado"
        ) : (
          "Inicializar Banco de Dados"
        )}
      </Button>
    </div>
  );
};
