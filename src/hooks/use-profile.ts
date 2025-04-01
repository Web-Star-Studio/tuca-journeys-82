
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useToast } from "./use-toast";

export type ProfileData = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipcode?: string;
};

export const useProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);

  // Fetch the profile data when the user changes
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setProfile(null);
        return;
      }

      setLoading(true);
      try {
        // First, check if the profile exists in the profiles table
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          // PGRST116 is the error code for no rows returned
          console.error("Error fetching profile:", error);
          toast({
            title: "Erro ao carregar perfil",
            description: error.message,
            variant: "destructive",
          });
          return;
        }

        if (data) {
          setProfile(data);
        } else {
          // If no profile exists, create one with the user's metadata
          const newProfile = {
            id: user.id,
            name: user.user_metadata?.name || "",
            email: user.email || "",
          };

          const { error: insertError } = await supabase
            .from("profiles")
            .insert([newProfile]);

          if (insertError) {
            console.error("Error creating profile:", insertError);
            toast({
              title: "Erro ao criar perfil",
              description: insertError.message,
              variant: "destructive",
            });
            return;
          }

          setProfile(newProfile);
        }
      } catch (error: any) {
        console.error("Unexpected error fetching profile:", error);
        toast({
          title: "Erro ao carregar perfil",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, toast]);

  // Function to update the profile
  const updateProfile = async (newProfileData: Partial<ProfileData>) => {
    if (!user || !profile) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update(newProfileData)
        .eq("id", user.id);

      if (error) {
        console.error("Error updating profile:", error);
        toast({
          title: "Erro ao atualizar perfil",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      // Update the local state
      setProfile({ ...profile, ...newProfileData });

      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      });
    } catch (error: any) {
      console.error("Unexpected error updating profile:", error);
      toast({
        title: "Erro ao atualizar perfil",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    updateProfile,
  };
};
