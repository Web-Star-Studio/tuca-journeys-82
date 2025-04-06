
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";
import { UserProfile } from "@/types/database";

export type ProfileData = {
  id: string;
  name: string | null;
  email: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zip_code?: string | null;
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
        console.log("Fetching profile for user:", user.id);
        // First, check if the profile exists in the user_profiles table
        const { data, error } = await supabase
          .from("user_profiles")
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
          setLoading(false);
          return;
        }

        if (data) {
          console.log("Profile found:", data);
          setProfile({
            id: data.id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            city: data.city,
            state: data.state,
            zip_code: data.zip_code
          });
        } else {
          // If no profile exists, we'll try to create one using application metadata
          // instead of silently failing with database permission errors
          console.log("No profile found, using auth metadata for profile");
          
          const newProfileData = {
            id: user.id,
            name: user.user_metadata?.name || user.user_metadata?.full_name || user.email?.split('@')[0] || "User",
            email: user.email
          };
          
          setProfile(newProfileData as ProfileData);
          
          // We won't immediately try to insert the profile anymore
          // as this is causing permission issues
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
      // First check if profile exists in DB
      const { data: existingProfile, error: checkError } = await supabase
        .from("user_profiles")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();
      
      if (checkError) {
        console.error("Error checking profile:", checkError);
        throw checkError;
      }
      
      let result;
      
      if (existingProfile) {
        // Update existing profile
        const { data, error } = await supabase
          .from("user_profiles")
          .update(newProfileData)
          .eq("id", user.id)
          .select()
          .single();
          
        if (error) throw error;
        result = data;
      } else {
        // Insert new profile
        const { data, error } = await supabase
          .from("user_profiles")
          .insert([{ ...profile, ...newProfileData }])
          .select()
          .single();
          
        if (error) throw error;
        result = data;
      }

      // Update the local state
      setProfile({ ...profile, ...newProfileData });

      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      });
      
      return result;
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Erro ao atualizar perfil",
        description: error.message,
        variant: "destructive",
      });
      throw error;
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
