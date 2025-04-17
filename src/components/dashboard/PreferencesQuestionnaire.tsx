
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useUserPreferences } from '@/hooks/use-user-preferences';
import { Loader2 } from 'lucide-react';
import { UserPreferences } from '@/types/database';

const PreferencesQuestionnaire = () => {
  const { preferences, isLoading, updatePreferences } = useUserPreferences();
  const [formData, setFormData] = React.useState<Partial<UserPreferences>>({
    travel_style: '',
    activities: [],
    accommodation_types: [],
    budget_range: '',
    travel_frequency: '',
  });

  React.useEffect(() => {
    if (preferences) {
      setFormData({
        travel_style: preferences.travel_style || '',
        activities: preferences.activities || [],
        accommodation_types: preferences.accommodation_types || [],
        budget_range: preferences.budget_range || '',
        travel_frequency: preferences.travel_frequency || '',
      });
    }
  }, [preferences]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePreferences(formData);
  };

  const handleActivityChange = (checked: boolean, activity: string) => {
    setFormData(prev => ({
      ...prev,
      activities: checked 
        ? [...(prev.activities || []), activity]
        : (prev.activities || []).filter(a => a !== activity)
    }));
  };

  const handleAccommodationChange = (checked: boolean, type: string) => {
    setFormData(prev => ({
      ...prev,
      accommodation_types: checked 
        ? [...(prev.accommodation_types || []), type]
        : (prev.accommodation_types || []).filter(t => t !== type)
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-tuca-ocean-blue" />
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Suas preferências de viagem</CardTitle>
        <CardDescription>
          Ajude-nos a personalizar sua experiência respondendo algumas perguntas sobre suas preferências de viagem
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-medium">Qual é o seu estilo de viagem favorito?</h3>
            <RadioGroup 
              value={formData.travel_style} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, travel_style: value }))}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="adventure" id="adventure" />
                <Label htmlFor="adventure">Aventura</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="relaxation" id="relaxation" />
                <Label htmlFor="relaxation">Relaxamento</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cultural" id="cultural" />
                <Label htmlFor="cultural">Cultural</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="gastronomy" id="gastronomy" />
                <Label htmlFor="gastronomy">Gastronomia</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ecotourism" id="ecotourism" />
                <Label htmlFor="ecotourism">Ecoturismo</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium">Quais atividades você prefere?</h3>
            <div className="grid grid-cols-2 gap-2">
              {['hiking', 'diving', 'beach', 'city tours', 'historical sites', 'nightlife'].map(activity => (
                <div key={activity} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`activity-${activity}`}
                    checked={(formData.activities || []).includes(activity)}
                    onCheckedChange={(checked) => handleActivityChange(!!checked, activity)}
                  />
                  <Label htmlFor={`activity-${activity}`}>
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
                    id={`accommodation-${type}`}
                    checked={(formData.accommodation_types || []).includes(type)}
                    onCheckedChange={(checked) => handleAccommodationChange(!!checked, type)}
                  />
                  <Label htmlFor={`accommodation-${type}`}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Qual é sua faixa de orçamento?</h3>
            <RadioGroup 
              value={formData.budget_range} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, budget_range: value }))}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="economy" id="economy" />
                <Label htmlFor="economy">Econômico</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium">Médio</Label>
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

          <div className="space-y-3">
            <h3 className="font-medium">Com que frequência você viaja?</h3>
            <RadioGroup 
              value={formData.travel_frequency} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, travel_frequency: value }))}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly">Mensalmente</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="quarterly" id="quarterly" />
                <Label htmlFor="quarterly">Trimestralmente</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="biannual" id="biannual" />
                <Label htmlFor="biannual">Semestralmente</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="annual" id="annual" />
                <Label htmlFor="annual">Anualmente</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Salvar Preferências
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PreferencesQuestionnaire;
