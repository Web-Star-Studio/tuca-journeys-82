import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useProfile } from "@/hooks/use-profile";
import { toast } from "sonner";
import { Loader2, ArrowLeft, ArrowRight, Check } from "lucide-react";
import TravelStyleStep from "./steps/TravelStyleStep";
import BudgetStep from "./steps/BudgetStep";
import ActivitiesStep from "./steps/ActivitiesStep";
import NotificationsStep from "./steps/NotificationsStep";
import AdvancedPreferencesStep from "./steps/AdvancedPreferencesStep";

interface WizardState {
  travelStyle: string;
  budget: string;
  activities: string[];
  notifyPromos: boolean;
  notifyBookings: boolean;
  transportModes: string[];
  dietaryRestrictions: {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
  };
  accessibility: {
    mobilitySupport: boolean;
    visualAids: boolean;
    hearingAids: boolean;
  };
}

const PreferencesWizard = () => {
  const navigate = useNavigate();
  const { updateProfile, profile } = useProfile();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preferences, setPreferences] = useState<WizardState>({
    travelStyle: "relaxation",
    budget: "medium",
    activities: [],
    notifyPromos: true,
    notifyBookings: true,
    transportModes: [],
    dietaryRestrictions: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
    },
    accessibility: {
      mobilitySupport: false,
      visualAids: false,
      hearingAids: false,
    },
  });

  const steps = [
    {
      title: "Estilo de Viagem",
      component: <TravelStyleStep 
        value={preferences.travelStyle}
        onChange={(value) => setPreferences(prev => ({ ...prev, travelStyle: value }))}
      />,
    },
    {
      title: "Orçamento",
      component: <BudgetStep 
        value={preferences.budget}
        onChange={(value) => setPreferences(prev => ({ ...prev, budget: value }))}
      />,
    },
    {
      title: "Atividades",
      component: <ActivitiesStep 
        activities={preferences.activities}
        onActivityToggle={(activity) => {
          setPreferences(prev => {
            const activities = [...prev.activities];
            if (activities.includes(activity)) {
              return { ...prev, activities: activities.filter(a => a !== activity) };
            }
            return { ...prev, activities: [...activities, activity] };
          });
        }}
      />,
    },
    {
      title: "Notificações",
      component: <NotificationsStep 
        notifyPromos={preferences.notifyPromos}
        notifyBookings={preferences.notifyBookings}
        onNotifyPromosChange={(checked) => setPreferences(prev => ({ ...prev, notifyPromos: checked }))}
        onNotifyBookingsChange={(checked) => setPreferences(prev => ({ ...prev, notifyBookings: checked }))}
      />,
    },
    {
      title: "Preferências Avançadas",
      component: <AdvancedPreferencesStep 
        transportModes={preferences.transportModes}
        onTransportModesChange={(values) => setPreferences(prev => ({ ...prev, transportModes: values }))}
        dietaryRestrictions={preferences.dietaryRestrictions}
        onDietaryChange={(key, value) => 
          setPreferences(prev => ({
            ...prev,
            dietaryRestrictions: {
              ...prev.dietaryRestrictions,
              [key]: value,
            },
          }))
        }
        accessibility={preferences.accessibility}
        onAccessibilityChange={(key, value) => 
          setPreferences(prev => ({
            ...prev,
            accessibility: {
              ...prev.accessibility,
              [key]: value,
            },
          }))
        }
      />,
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    try {
      await updateProfile({
        ...profile!,
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
          transportModes: preferences.transportModes,
          dietaryRestrictions: preferences.dietaryRestrictions,
          accessibility: preferences.accessibility,
        },
      });
      toast.success("Preferências salvas com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast.error("Erro ao salvar preferências");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>{steps[currentStep].title}</CardTitle>
        </CardHeader>
        
        <CardContent>
          {steps[currentStep].component}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="mr-2" />
            Anterior
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button onClick={handleNext}>
              Próximo
              <ArrowRight className="ml-2" />
            </Button>
          ) : (
            <Button onClick={handleFinish} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Check className="mr-2" />
                  Concluir
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default PreferencesWizard;
