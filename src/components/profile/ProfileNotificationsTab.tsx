
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Save, Loader2, BellRing } from "lucide-react";

interface NotificationPreference {
  id: string;
  name: string;
  description: string;
  email: boolean;
  push: boolean;
  sms: boolean;
}

const ProfileNotificationsTab = () => {
  const [isSaving, setIsSaving] = useState(false);
  
  // Mock notification preferences data
  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    {
      id: "bookings",
      name: "Atualizações de Reservas",
      description: "Confirmações, alterações e lembretes sobre suas reservas",
      email: true,
      push: true,
      sms: false
    },
    {
      id: "promotions",
      name: "Promoções e Ofertas",
      description: "Descontos especiais e ofertas limitadas",
      email: true,
      push: false,
      sms: false
    },
    {
      id: "recommendations",
      name: "Recomendações Personalizadas",
      description: "Sugestões baseadas em suas preferências e histórico",
      email: true,
      push: true,
      sms: false
    },
    {
      id: "account",
      name: "Atualizações da Conta",
      description: "Segurança, privacidade e alterações de conta",
      email: true,
      push: false,
      sms: false
    },
    {
      id: "newsletter",
      name: "Newsletter",
      description: "Notícias e atualizações sobre Fernando de Noronha",
      email: false,
      push: false,
      sms: false
    }
  ]);

  // Handle notification preference changes
  const handlePreferenceChange = (
    id: string, 
    channel: "email" | "push" | "sms", 
    value: boolean
  ) => {
    setPreferences(preferences.map(pref => 
      pref.id === id ? { ...pref, [channel]: value } : pref
    ));
  };

  // Save notification preferences
  const handleSavePreferences = async () => {
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Preferências de notificação salvas com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar preferências de notificação.");
      console.error("Error saving notification preferences:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <BellRing className="h-5 w-5 mr-2" />
            Configurações de Notificação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-5 gap-4 border-b pb-2 mb-4">
              <div className="col-span-2">
                <h3 className="font-medium">Tipo de Notificação</h3>
              </div>
              <div className="text-center">
                <h3 className="font-medium">Email</h3>
              </div>
              <div className="text-center">
                <h3 className="font-medium">Push</h3>
              </div>
              <div className="text-center">
                <h3 className="font-medium">SMS</h3>
              </div>
            </div>
            
            {preferences.map((pref) => (
              <div key={pref.id} className="grid grid-cols-5 gap-4 items-center">
                <div className="col-span-2">
                  <Label htmlFor={`${pref.id}-email`} className="font-medium">{pref.name}</Label>
                  <p className="text-sm text-gray-500 mt-0.5">{pref.description}</p>
                </div>
                
                <div className="flex justify-center">
                  <Switch
                    id={`${pref.id}-email`}
                    checked={pref.email}
                    onCheckedChange={(checked) => 
                      handlePreferenceChange(pref.id, "email", checked)
                    }
                  />
                </div>
                
                <div className="flex justify-center">
                  <Switch
                    id={`${pref.id}-push`}
                    checked={pref.push}
                    onCheckedChange={(checked) => 
                      handlePreferenceChange(pref.id, "push", checked)
                    }
                  />
                </div>
                
                <div className="flex justify-center">
                  <Switch
                    id={`${pref.id}-sms`}
                    checked={pref.sms}
                    onCheckedChange={(checked) => 
                      handlePreferenceChange(pref.id, "sms", checked)
                    }
                  />
                </div>
              </div>
            ))}
            
            <Button 
              onClick={handleSavePreferences}
              className="mt-6" 
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Configurações
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileNotificationsTab;
