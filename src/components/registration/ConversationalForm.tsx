
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { TravelPreference } from "@/types/user-preferences";

interface ConversationalFormProps {
  onComplete: (preferences: TravelPreference) => void;
}

const ConversationalForm: React.FC<ConversationalFormProps> = ({ onComplete }) => {
  const [preferences, setPreferences] = useState<Partial<TravelPreference>>({
    travel_style: '',
    activities: [],
    accommodation_types: [],
    budget_range: '',
    travel_frequency: '',
    // These two fields are required by the type but can be set later
    group_size: 0,
    trip_duration: 0,
  });

  const handleActivityChange = (checked: boolean, activity: string) => {
    setPreferences(prev => ({
      ...prev,
      activities: checked 
        ? [...(prev.activities || []), activity]
        : (prev.activities || []).filter(a => a !== activity)
    }));
  };

  const handleAccommodationChange = (checked: boolean, type: string) => {
    setPreferences(prev => ({
      ...prev,
      accommodation_types: checked 
        ? [...(prev.accommodation_types || []), type]
        : (prev.accommodation_types || []).filter(t => t !== type)
    }));
  };

  const handleSubmit = () => {
    onComplete(preferences as TravelPreference);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-3">
            <h3 className="font-medium">Qual é o seu estilo de viagem favorito?</h3>
            <RadioGroup 
              value={preferences.travel_style} 
              onValueChange={(value) => setPreferences(prev => ({ ...prev, travel_style: value }))}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="adventure" id="r-adventure" />
                <Label htmlFor="r-adventure">Aventura</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="relaxation" id="r-relaxation" />
                <Label htmlFor="r-relaxation">Relaxamento</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cultural" id="r-cultural" />
                <Label htmlFor="r-cultural">Cultural</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="gastronomy" id="r-gastronomy" />
                <Label htmlFor="r-gastronomy">Gastronomia</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ecotourism" id="r-ecotourism" />
                <Label htmlFor="r-ecotourism">Ecoturismo</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Quais atividades você prefere?</h3>
            <div className="grid grid-cols-2 gap-2">
              {['hiking', 'diving', 'beach', 'city tours', 'historical sites', 'nightlife'].map(activity => (
                <div key={activity} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`r-activity-${activity}`}
                    checked={(preferences.activities || []).includes(activity)}
                    onCheckedChange={(checked) => handleActivityChange(!!checked, activity)}
                  />
                  <Label htmlFor={`r-activity-${activity}`}>
                    {activity === 'hiking' ? 'Trilhas' :
                     activity === 'diving' ? 'Mergulho' :
                     activity === 'beach' ? 'Praia' :
                     activity === 'city tours' ? 'Passeios na cidade' :
                     activity === 'historical sites' ? 'Sítios históricos' :
                     'Vida noturna'}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Quais tipos de acomodação você prefere?</h3>
            <div className="grid grid-cols-2 gap-2">
              {['hotel', 'pousada', 'resort', 'hostel', 'apartment'].map(type => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`r-accommodation-${type}`}
                    checked={(preferences.accommodation_types || []).includes(type)}
                    onCheckedChange={(checked) => handleAccommodationChange(!!checked, type)}
                  />
                  <Label htmlFor={`r-accommodation-${type}`}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Qual é sua faixa de orçamento?</h3>
            <RadioGroup 
              value={preferences.budget_range} 
              onValueChange={(value) => setPreferences(prev => ({ ...prev, budget_range: value }))}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="economy" id="r-economy" />
                <Label htmlFor="r-economy">Econômico</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="r-medium" />
                <Label htmlFor="r-medium">Médio</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="premium" id="r-premium" />
                <Label htmlFor="r-premium">Premium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="luxury" id="r-luxury" />
                <Label htmlFor="r-luxury">Luxo</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Com que frequência você viaja?</h3>
            <RadioGroup 
              value={preferences.travel_frequency} 
              onValueChange={(value) => setPreferences(prev => ({ ...prev, travel_frequency: value }))}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="r-monthly" />
                <Label htmlFor="r-monthly">Mensalmente</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="quarterly" id="r-quarterly" />
                <Label htmlFor="r-quarterly">Trimestralmente</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="biannual" id="r-biannual" />
                <Label htmlFor="r-biannual">Semestralmente</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="annual" id="r-annual" />
                <Label htmlFor="r-annual">Anualmente</Label>
              </div>
            </RadioGroup>
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Concluir Registro
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversationalForm;
