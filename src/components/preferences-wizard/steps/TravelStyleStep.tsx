
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface TravelStyleStepProps {
  value: string;
  onChange: (value: string) => void;
}

const TravelStyleStep = ({ value, onChange }: TravelStyleStepProps) => {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Qual é o seu estilo preferido de viagem? Isso nos ajudará a personalizar suas recomendações.
      </p>
      
      <RadioGroup 
        value={value}
        onValueChange={onChange}
        className="space-y-3"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="relaxation" id="relaxation" />
          <Label htmlFor="relaxation">Relaxamento e descanso</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="adventure" id="adventure" />
          <Label htmlFor="adventure">Aventura e adrenalina</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="cultural" id="cultural" />
          <Label htmlFor="cultural">Cultural e histórico</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="gastronomy" id="gastronomy" />
          <Label htmlFor="gastronomy">Gastronomia</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="ecotourism" id="ecotourism" />
          <Label htmlFor="ecotourism">Ecoturismo e natureza</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default TravelStyleStep;
