
import { useState } from "react";
import { useUserPreferences } from "@/hooks/use-user-preferences";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { UserPreferences } from "@/types/database";

// Step types
type TravelStyleStep = {
  travelStyle: string;
};

type ActivitiesStep = {
  selectedActivities: string[];
};

type AccommodationsStep = {
  selectedAccommodations: string[];
};

type BudgetStep = {
  budgetRange: string;
};

type AccessibilityStep = {
  accessibilityNeeds: {
    mobilitySupport: boolean;
    visualAids: boolean;
    hearingAids: boolean;
  };
};

const INITIAL_TRAVEL_STYLE: TravelStyleStep = {
  travelStyle: "relaxation",
};

const INITIAL_ACTIVITIES: ActivitiesStep = {
  selectedActivities: [],
};

const INITIAL_ACCOMMODATIONS: AccommodationsStep = {
  selectedAccommodations: [],
};

const INITIAL_BUDGET: BudgetStep = {
  budgetRange: "medium",
};

const INITIAL_ACCESSIBILITY: AccessibilityStep = {
  accessibilityNeeds: {
    mobilitySupport: false,
    visualAids: false,
    hearingAids: false,
  },
};

export const usePreferencesWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  // Step state
  const [travelStyle, setTravelStyle] = useState<TravelStyleStep>(INITIAL_TRAVEL_STYLE);
  const [activities, setActivities] = useState<ActivitiesStep>(INITIAL_ACTIVITIES);
  const [accommodations, setAccommodations] = useState<AccommodationsStep>(INITIAL_ACCOMMODATIONS);
  const [budget, setBudget] = useState<BudgetStep>(INITIAL_BUDGET);
  const [accessibility, setAccessibility] = useState<AccessibilityStep>(INITIAL_ACCESSIBILITY);
  
  const { updatePreferences } = useUserPreferences();
  
  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };
  
  const prevStep = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };
  
  const handleComplete = async () => {
    setIsSubmitting(true);
    
    try {
      const preferences: UserPreferences = {
        travel_style: travelStyle.travelStyle,
        activities: activities.selectedActivities,
        accommodation_types: accommodations.selectedAccommodations,
        budget_range: budget.budgetRange,
        accessibility: {
          wheelchair: accessibility.accessibilityNeeds.mobilitySupport,
          limited_mobility: accessibility.accessibilityNeeds.mobilitySupport, // Using the same field for now
          other: accessibility.accessibilityNeeds.visualAids || accessibility.accessibilityNeeds.hearingAids ? 
            "Visual or hearing assistance required" : undefined
        }
      };
      
      const success = await updatePreferences(preferences);
      
      if (success) {
        toast.success("Preferências salvas com sucesso!");
        navigate("/perfil");
      } else {
        toast.error("Erro ao salvar preferências");
      }
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast.error("Ocorreu um erro ao salvar suas preferências");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    currentStep,
    nextStep,
    prevStep,
    travelStyle,
    setTravelStyle,
    activities,
    setActivities,
    accommodations,
    setAccommodations,
    budget,
    setBudget,
    accessibility,
    setAccessibility,
    totalSteps: 5,
    isSubmitting,
    handleComplete,
  };
};
