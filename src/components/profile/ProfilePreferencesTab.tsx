
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/use-profile";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import TravelStyleCard from "./preferences/TravelStyleCard";
import BudgetCard from "./preferences/BudgetCard";
import ActivitiesCard from "./preferences/ActivitiesCard";
import NotificationsCard from "./preferences/NotificationsCard";
import { UserPreferences } from "@/types";

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
    travelStyle: profile?.preferences?.travel_style || 'relaxation',
    notifyPromos: profile?.preferences?.notifications?.marketing || true,
    notifyBookings: profile?.preferences?.notifications?.booking_updates || true,
    budget: profile?.preferences?.budget_range || 'medium',
    activities: profile?.preferences?.activities || ['beach', 'hiking'],
  });
  
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updatedPreferences: UserPreferences = {
        travel_style: preferences.travelStyle,
        budget_range: preferences.budget,
        activities: preferences.activities,
        notifications: {
          marketing: preferences.notifyPromos,
          booking_updates: preferences.notifyBookings,
          recommendations: true,
        },
      };

      await updateProfile({
        preferences: updatedPreferences,
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
      <TravelStyleCard
        value={preferences.travelStyle}
        onChange={(value) => setPreferences(prev => ({ ...prev, travelStyle: value }))}
      />
      
      <BudgetCard
        value={preferences.budget}
        onChange={(value) => setPreferences(prev => ({ ...prev, budget: value }))}
      />
      
      <ActivitiesCard
        activities={preferences.activities}
        onActivityToggle={handleActivityToggle}
      />
      
      <NotificationsCard
        notifyPromos={preferences.notifyPromos}
        notifyBookings={preferences.notifyBookings}
        onNotifyPromosChange={(checked) => 
          setPreferences(prev => ({ ...prev, notifyPromos: checked }))
        }
        onNotifyBookingsChange={(checked) => 
          setPreferences(prev => ({ ...prev, notifyBookings: checked }))
        }
      />
      
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
