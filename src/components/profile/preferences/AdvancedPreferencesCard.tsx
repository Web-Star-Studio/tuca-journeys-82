
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Car, Bus, TrainFront, Plane, Bicycle, Wheelchair, Utensils, Vegan, Accessibility } from "lucide-react";

interface AdvancedPreferencesCardProps {
  transportModes: string[];
  onTransportModesChange: (values: string[]) => void;
  dietaryRestrictions: {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
  };
  onDietaryChange: (key: keyof typeof dietaryRestrictions, value: boolean) => void;
  accessibility: {
    mobilitySupport: boolean;
    visualAids: boolean;
    hearingAids: boolean;
  };
  onAccessibilityChange: (key: keyof typeof accessibility, value: boolean) => void;
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
              <TrainFront className="h-4 w-4 mr-2" />
              Trem
            </ToggleGroupItem>
            <ToggleGroupItem value="plane" aria-label="Avião">
              <Plane className="h-4 w-4 mr-2" />
              Avião
            </ToggleGroupItem>
            <ToggleGroupItem value="bicycle" aria-label="Bicicleta">
              <Bicycle className="h-4 w-4 mr-2" />
              Bicicleta
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="space-y-4">
          <Label>Restrições Alimentares</Label>
          <div className="space-y-4">
            {Object.entries({
              vegetarian: { icon: Utensils, label: "Vegetariano" },
              vegan: { icon: Vegan, label: "Vegano" },
              glutenFree: { icon: Utensils, label: "Sem Glúten" },
              dairyFree: { icon: Utensils, label: "Sem Lactose" },
            }).map(([key, { icon: Icon, label }]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </div>
                <Switch
                  checked={dietaryRestrictions[key as keyof typeof dietaryRestrictions]}
                  onCheckedChange={(checked) => 
                    onDietaryChange(key as keyof typeof dietaryRestrictions, checked)
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
              mobilitySupport: { icon: Wheelchair, label: "Suporte à Mobilidade" },
              visualAids: { icon: Accessibility, label: "Auxílios Visuais" },
              hearingAids: { icon: Accessibility, label: "Auxílios Auditivos" },
            }).map(([key, { icon: Icon, label }]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </div>
                <Switch
                  checked={accessibility[key as keyof typeof accessibility]}
                  onCheckedChange={(checked) => 
                    onAccessibilityChange(key as keyof typeof accessibility, checked)
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
