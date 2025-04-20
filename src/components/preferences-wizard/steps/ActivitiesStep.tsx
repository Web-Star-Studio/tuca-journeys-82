
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface ActivitiesStepProps {
  activities: string[];
  onActivityToggle: (activity: string) => void;
}

const ActivitiesStep = ({ activities, onActivityToggle }: ActivitiesStepProps) => {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Selecione as atividades que você mais gosta de fazer durante suas viagens.
      </p>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="beach" 
            checked={activities.includes('beach')}
            onCheckedChange={() => onActivityToggle('beach')}
          />
          <label
            htmlFor="beach"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Praia e sol
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="hiking" 
            checked={activities.includes('hiking')}
            onCheckedChange={() => onActivityToggle('hiking')}
          />
          <label
            htmlFor="hiking"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Trilhas e caminhadas
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="diving" 
            checked={activities.includes('diving')}
            onCheckedChange={() => onActivityToggle('diving')}
          />
          <label
            htmlFor="diving"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Mergulho e snorkeling
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="cultural" 
            checked={activities.includes('cultural')}
            onCheckedChange={() => onActivityToggle('cultural')}
          />
          <label
            htmlFor="cultural"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Passeios culturais
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="wildlife" 
            checked={activities.includes('wildlife')}
            onCheckedChange={() => onActivityToggle('wildlife')}
          />
          <label
            htmlFor="wildlife"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Observação de fauna e flora
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="gastronomy" 
            checked={activities.includes('gastronomy')}
            onCheckedChange={() => onActivityToggle('gastronomy')}
          />
          <label
            htmlFor="gastronomy"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Experiências gastronômicas
          </label>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesStep;
