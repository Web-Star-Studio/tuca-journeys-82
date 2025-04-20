import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Car, Bus, Train, Plane, Bike, Accessibility, Utensils, Activity } from "lucide-react";

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

interface AdvancedPreferencesCardProps {
  transportModes: string[];
  onTransportModesChange: (values: string[]) => void;
  dietaryRestrictions: DietaryRestrictions;
  onDietaryChange: (key: keyof DietaryRestrictions, value: boolean) => void;
  accessibility: AccessibilityOptions;
  onAccessibilityChange: (key: keyof AccessibilityOptions, value: boolean) => void;
}

const AdvancedPreferencesCard = ({ 
  transportModes,
  onTransportModesChange,
  dietaryRestrictions,
  onDietaryChange,
  accessibility,
  onAccessibilityChange,
}: AdvancedPreferencesCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6 space-y-8">
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
            {Object.entries({
              vegetarian: { icon: Utensils, label: "Vegetariano" },
              vegan: { icon: Activity, label: "Vegano" },
              glutenFree: { icon: Utensils, label: "Sem Glúten" },
              dairyFree: { icon: Utensils, label: "Sem Lactose" },
            }).map(([key, { icon: Icon, label }]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </div>
                <Switch
                  checked={dietaryRestrictions[key as keyof DietaryRestrictions]}
                  onCheckedChange={(checked) => 
                    onDietaryChange(key as keyof DietaryRestrictions, checked)
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label>Necessidades de Acessibilidade</Label>
          <div className="space-y-4">
            {Object.entries({
              mobilitySupport: { icon: Accessibility, label: "Suporte à Mobilidade" },
              visualAids: { icon: Accessibility, label: "Auxílios Visuais" },
              hearingAids: { icon: Accessibility, label: "Auxílios Auditivos" },
            }).map(([key, { icon: Icon, label }]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </div>
                <Switch
                  checked={accessibility[key as keyof AccessibilityOptions]}
                  onCheckedChange={(checked) => 
                    onAccessibilityChange(key as keyof AccessibilityOptions, checked)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedPreferencesCard;
