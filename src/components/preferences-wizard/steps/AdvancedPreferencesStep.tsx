import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Car, Bus, Train, Plane, Bike, Accessibility, Utensils, Activity } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface DietaryRestrictions {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
}

interface AccessibilityOptions {
  mobilitySupport: boolean;
  visualAids: boolean;
  hearingAids: boolean;
}

interface AdvancedPreferencesStepProps {
  transportModes: string[];
  onTransportModesChange: (values: string[]) => void;
  dietaryRestrictions: DietaryRestrictions;
  onDietaryChange: (key: keyof DietaryRestrictions, value: boolean) => void;
  accessibility: AccessibilityOptions;
  onAccessibilityChange: (key: keyof AccessibilityOptions, value: boolean) => void;
}

const AdvancedPreferencesStep = ({
  transportModes,
  onTransportModesChange,
  dietaryRestrictions,
  onDietaryChange,
  accessibility,
  onAccessibilityChange,
}: AdvancedPreferencesStepProps) => {
  return (
    <div className="space-y-8">
      <p className="text-muted-foreground">
        Configure preferências avançadas para personalizar ainda mais sua experiência de viagem.
      </p>
      
      <div className="space-y-4">
        <Label>Modos de Transporte Preferidos</Label>
        <ToggleGroup 
          type="multiple" 
          value={transportModes}
          onValueChange={onTransportModesChange}
          className="flex flex-wrap gap-2"
        >
          <ToggleGroupItem value="car" aria-label="Carro">
            <Car className="h-4 w-4 mr-2" />
            Carro
          </ToggleGroupItem>
          <ToggleGroupItem value="bus" aria-label="Ônibus">
            <Bus className="h-4 w-4 mr-2" />
            Ônibus
          </ToggleGroupItem>
          <ToggleGroupItem value="train" aria-label="Trem">
            <Train className="h-4 w-4 mr-2" />
            Trem
          </ToggleGroupItem>
          <ToggleGroupItem value="plane" aria-label="Avião">
            <Plane className="h-4 w-4 mr-2" />
            Avião
          </ToggleGroupItem>
          <ToggleGroupItem value="bicycle" aria-label="Bicicleta">
            <Bike className="h-4 w-4 mr-2" />
            Bicicleta
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-4">
        <Label>Restrições Alimentares</Label>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Utensils className="h-4 w-4" />
              <span>Vegetariano</span>
            </div>
            <Switch
              checked={dietaryRestrictions.vegetarian}
              onCheckedChange={(checked) => onDietaryChange("vegetarian", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>Vegano</span>
            </div>
            <Switch
              checked={dietaryRestrictions.vegan}
              onCheckedChange={(checked) => onDietaryChange("vegan", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Utensils className="h-4 w-4" />
              <span>Sem Glúten</span>
            </div>
            <Switch
              checked={dietaryRestrictions.glutenFree}
              onCheckedChange={(checked) => onDietaryChange("glutenFree", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Utensils className="h-4 w-4" />
              <span>Sem Lactose</span>
            </div>
            <Switch
              checked={dietaryRestrictions.dairyFree}
              onCheckedChange={(checked) => onDietaryChange("dairyFree", checked)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Label>Necessidades de Acessibilidade</Label>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Accessibility className="h-4 w-4" />
              <span>Suporte à Mobilidade</span>
            </div>
            <Switch
              checked={accessibility.mobilitySupport}
              onCheckedChange={(checked) => onAccessibilityChange("mobilitySupport", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Accessibility className="h-4 w-4" />
              <span>Auxílios Visuais</span>
            </div>
            <Switch
              checked={accessibility.visualAids}
              onCheckedChange={(checked) => onAccessibilityChange("visualAids", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Accessibility className="h-4 w-4" />
              <span>Auxílios Auditivos</span>
            </div>
            <Switch
              checked={accessibility.hearingAids}
              onCheckedChange={(checked) => onAccessibilityChange("hearingAids", checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedPreferencesStep;
