
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useProfile, ExtendedUserProfile } from "@/hooks/use-profile";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface PreferenceState {
  travelStyle: string;
  notifyPromos: boolean;
  notifyBookings: boolean;
  budget: string;
  activities: string[];
}

const ProfilePreferencesTab = () => {
  const { profile, updateProfile, isLoading } = useProfile();
  
  const [preferences, setPreferences] = useState<PreferenceState>({
    travelStyle: profile?.preferences?.travelStyle || 'relaxation',
    notifyPromos: profile?.preferences?.notifications?.marketing || true,
    notifyBookings: profile?.preferences?.notifications?.booking_updates || true,
    budget: profile?.preferences?.budget_range || 'medium',
    activities: profile?.preferences?.activities || ['beach', 'hiking'],
  });
  
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfile({
        ...(profile as ExtendedUserProfile),
        preferences: {
          ...(profile?.preferences || {}),
          travelStyle: preferences.travelStyle,
          budget_range: preferences.budget,
          activities: preferences.activities,
          notifications: {
            marketing: preferences.notifyPromos,
            booking_updates: preferences.notifyBookings,
            recommendations: true,
          },
        },
      });
      toast.success("Preferências salvas com sucesso");
    } catch (error) {
      console.error("Erro ao salvar preferências:", error);
      toast.error("Erro ao salvar suas preferências");
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleActivityToggle = (activity: string) => {
    setPreferences(prev => {
      const activities = [...prev.activities];
      
      if (activities.includes(activity)) {
        return { 
          ...prev, 
          activities: activities.filter(a => a !== activity) 
        };
      } else {
        return { 
          ...prev, 
          activities: [...activities, activity] 
        };
      }
    });
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Estilo de Viagem</h3>
          
          <RadioGroup
            value={preferences.travelStyle}
            onValueChange={(value) => setPreferences(prev => ({ ...prev, travelStyle: value }))}
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
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Faixa de Orçamento</h3>
          
          <RadioGroup
            value={preferences.budget}
            onValueChange={(value) => setPreferences(prev => ({ ...prev, budget: value }))}
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
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Atividades Preferidas</h3>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="beach" 
                checked={preferences.activities.includes('beach')}
                onCheckedChange={() => handleActivityToggle('beach')}
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
                checked={preferences.activities.includes('hiking')}
                onCheckedChange={() => handleActivityToggle('hiking')}
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
                checked={preferences.activities.includes('diving')}
                onCheckedChange={() => handleActivityToggle('diving')}
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
                checked={preferences.activities.includes('cultural')}
                onCheckedChange={() => handleActivityToggle('cultural')}
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
                id="gastronomy" 
                checked={preferences.activities.includes('gastronomy')}
                onCheckedChange={() => handleActivityToggle('gastronomy')}
              />
              <label
                htmlFor="gastronomy"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Experiências gastronômicas
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="wildlife" 
                checked={preferences.activities.includes('wildlife')}
                onCheckedChange={() => handleActivityToggle('wildlife')}
              />
              <label
                htmlFor="wildlife"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Observação de fauna e flora
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Notificações</h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="notifyPromos" 
                checked={preferences.notifyPromos}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ 
                    ...prev, 
                    notifyPromos: checked === true 
                  }))
                }
              />
              <div className="space-y-1">
                <label
                  htmlFor="notifyPromos"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Promoções e ofertas especiais
                </label>
                <p className="text-sm text-gray-500">
                  Receba notificações sobre promoções, descontos e ofertas exclusivas.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="notifyBookings" 
                checked={preferences.notifyBookings}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ 
                    ...prev, 
                    notifyBookings: checked === true 
                  }))
                }
              />
              <div className="space-y-1">
                <label
                  htmlFor="notifyBookings"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Atualizações de reservas
                </label>
                <p className="text-sm text-gray-500">
                  Receba notificações sobre confirmações, cancelamentos e alterações em suas reservas.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            "Salvar Preferências"
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProfilePreferencesTab;
