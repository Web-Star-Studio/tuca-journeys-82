
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  isSubmitting: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
}

const WizardNavigation = ({
  currentStep,
  totalSteps,
  isSubmitting,
  onPrevious,
  onNext,
  onFinish,
}: WizardNavigationProps) => {
  return (
    <div className="flex justify-between">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 0}
      >
        <ArrowLeft className="mr-2" />
        Anterior
      </Button>

      {currentStep < totalSteps - 1 ? (
        <Button onClick={onNext}>
          Próximo
          <ArrowRight className="ml-2" />
        </Button>
      ) : (
        <Button onClick={onFinish} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Check className="mr-2" />
              Concluir
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default WizardNavigation;
