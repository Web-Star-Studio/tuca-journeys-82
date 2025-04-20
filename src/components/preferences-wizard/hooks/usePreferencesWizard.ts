
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/use-profile";
import { toast } from "sonner";

export interface WizardState {
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

export const usePreferencesWizard = () => {
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

  const handleNext = () => {
    if (currentStep < 4) {
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

  return {
    currentStep,
    isSubmitting,
    preferences,
    setPreferences,
    handleNext,
    handlePrevious,
    handleFinish,
  };
};
