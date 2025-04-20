
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import TravelStyleStep from "./steps/TravelStyleStep";
import BudgetStep from "./steps/BudgetStep";
import ActivitiesStep from "./steps/ActivitiesStep";
import NotificationsStep from "./steps/NotificationsStep";
import AdvancedPreferencesStep from "./steps/AdvancedPreferencesStep";
import WizardNavigation from "./WizardNavigation";
import { usePreferencesWizard } from "./hooks/usePreferencesWizard";

const PreferencesWizard = () => {
  const {
    currentStep,
    isSubmitting,
    preferences,
    setPreferences,
    handleNext,
    handlePrevious,
    handleFinish,
  } = usePreferencesWizard();

  const steps = [
    {
      title: "Estilo de Viagem",
      component: (
        <TravelStyleStep 
          value={preferences.travelStyle}
          onChange={(value) => setPreferences(prev => ({ ...prev, travelStyle: value }))}
        />
      ),
    },
    {
      title: "Orçamento",
      component: (
        <BudgetStep 
          value={preferences.budget}
          onChange={(value) => setPreferences(prev => ({ ...prev, budget: value }))}
        />
      ),
    },
    {
      title: "Atividades",
      component: (
        <ActivitiesStep 
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
        />
      ),
    },
    {
      title: "Notificações",
      component: (
        <NotificationsStep 
          notifyPromos={preferences.notifyPromos}
          notifyBookings={preferences.notifyBookings}
          onNotifyPromosChange={(checked) => setPreferences(prev => ({ ...prev, notifyPromos: checked }))}
          onNotifyBookingsChange={(checked) => setPreferences(prev => ({ ...prev, notifyBookings: checked }))}
        />
      ),
    },
    {
      title: "Preferências Avançadas",
      component: (
        <AdvancedPreferencesStep 
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
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>{steps[currentStep].title}</CardTitle>
        </CardHeader>
        
        <CardContent>
          {steps[currentStep].component}
        </CardContent>

        <CardFooter>
          <WizardNavigation
            currentStep={currentStep}
            totalSteps={steps.length}
            isSubmitting={isSubmitting}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onFinish={handleFinish}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default PreferencesWizard;
