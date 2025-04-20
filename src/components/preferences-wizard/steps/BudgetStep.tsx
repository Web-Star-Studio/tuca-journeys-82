
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface BudgetStepProps {
  value: string;
  onChange: (value: string) => void;
}

const BudgetStep = ({ value, onChange }: BudgetStepProps) => {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Qual é sua faixa de orçamento preferida para viagens? Isso nos ajudará a mostrar opções adequadas ao seu perfil.
      </p>
      
      <RadioGroup 
        value={value}
        onValueChange={onChange}
        className="space-y-3"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="economy" id="economy" />
          <Label htmlFor="economy">Econômico</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="medium" id="medium" />
          <Label htmlFor="medium">Moderado</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="premium" id="premium" />
          <Label htmlFor="premium">Premium</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="luxury" id="luxury" />
          <Label htmlFor="luxury">Luxo</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default BudgetStep;
