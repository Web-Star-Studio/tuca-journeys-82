
import { useState } from "react";
import { useUserPreferences } from "@/hooks/use-user-preferences";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { UserPreferences } from "@/types";

// UI-oriented interfaces for the form
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

// Combined preferences state type to match component usage
interface PreferencesState {
  travelStyle: string;
  budget: string;
  activities: string[];
  notifyPromos: boolean;
  notifyBookings: boolean;
  transportModes: string[];
  dietaryRestrictions: DietaryRestrictions;
  accessibility: AccessibilityOptions;
}

// Initial state values matching the component usage
const INITIAL_PREFERENCES: PreferencesState = {
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
    dairyFree: false
  },
  accessibility: {
    mobilitySupport: false,
    visualAids: false,
    hearingAids: false
  }
};

export const usePreferencesWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  // Combined preferences state to match component usage
  const [preferences, setPreferences] = useState<PreferencesState>(INITIAL_PREFERENCES);
  
  const { updatePreferences } = useUserPreferences();
  
  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };
  
  const handleNext = () => {
    setCurrentStep((prev) => Math.min(4, prev + 1));
  };
  
  const handleFinish = async () => {
    setIsSubmitting(true);
    
    try {
      // Map component preferences to database UserPreferences format
      const userPreferences: UserPreferences = {
        travel_style: preferences.travelStyle,
        activities: preferences.activities,
        budget_range: preferences.budget,
        transport_modes: preferences.transportModes,
        dietary_restrictions: {
          vegetarian: preferences.dietaryRestrictions.vegetarian,
          vegan: preferences.dietaryRestrictions.vegan,
          gluten_free: preferences.dietaryRestrictions.glutenFree,
          other: ""
        },
        accessibility: {
          wheelchair: preferences.accessibility.mobilitySupport,
          limited_mobility: preferences.accessibility.visualAids,
          other: preferences.accessibility.hearingAids ? "hearing_aids" : ""
        },
        notifications: {
          marketing: preferences.notifyPromos,
          booking_updates: preferences.notifyBookings,
          recommendations: true
        }
      };
      
      await updatePreferences(userPreferences);
      toast.success("Preferências salvas com sucesso!");
      navigate("/perfil");
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast.error("Ocorreu um erro ao salvar suas preferências");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    currentStep,
    preferences,
    setPreferences,
    handleNext,
    handlePrevious,
    handleFinish,
    isSubmitting
  };
};
