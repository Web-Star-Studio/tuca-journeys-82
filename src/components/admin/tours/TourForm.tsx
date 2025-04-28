
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTours } from "@/hooks/use-tours";
import { useToast } from "@/hooks/use-toast";
import { TourFormValues, tourFormSchema, tourCategories, difficultyLevels } from "./TourFormTypes";
import TourBasicInfoForm from "./form/TourBasicInfoForm";
import TourMediaForm from "./form/TourMediaForm";
import TourScheduleForm from "./form/TourScheduleForm";
import TourFormActions from "./form/TourFormActions";
import { Form } from "@/components/ui/form";
import { Tour } from "@/types/database";
import { stringToArray } from "@/utils/formUtils";
import { withTimeout } from "@/utils/asyncUtils";

interface TourFormProps {
  tourId?: number;
  onSuccess: () => void;
  onCancel: () => void;
  setLoading?: (loading: boolean) => void;
  setError?: (error: string | null) => void;
}

export const TourForm: React.FC<TourFormProps> = ({ 
  tourId, 
  onSuccess, 
  onCancel,
  setLoading,
  setError
}) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const { toast } = useToast();
  const { saveTour, getTourById } = useTours();
  const [isLoading, setIsLoading] = useState(tourId ? true : false);
  const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(null);

  // Initialize form
  const form = useForm<TourFormValues>({
    resolver: zodResolver(tourFormSchema),
    defaultValues: {
      title: "",
      description: "",
      short_description: "",
      image_url: "",
      price: 0,
      duration: "",
      category: "",
      max_participants: 10,
      min_participants: 1,
      difficulty: "fácil",
      rating: 4.5,
      meeting_point: "",
      schedule: "",
      includes: "",
      excludes: "",
      notes: "",
      gallery_images: "",
    },
  });

  // Update external loading state
  useEffect(() => {
    if (setLoading) {
      setLoading(isLoading);
    }
    
    // Set a timeout to prevent UI from being stuck indefinitely
    if (isLoading && tourId) {
      const timeoutId = setTimeout(() => {
        if (setError) {
          setError("O carregamento demorou muito tempo. Por favor, tente novamente mais tarde.");
        }
        setIsLoading(false);
        if (setLoading) {
          setLoading(false);
        }
      }, 10000); // 10 second timeout
      
      setLoadingTimeout(timeoutId);
      
      return () => {
        if (timeoutId) clearTimeout(timeoutId);
      };
    }
  }, [isLoading, setLoading, tourId, setError]);

  // Fetch tour data when editing
  useEffect(() => {
    const loadTourData = async () => {
      if (tourId) {
        setIsLoading(true);
        try {
          // Use our timeout wrapper for the getTourById call
          const tour = await withTimeout(
            () => getTourById(tourId),
            8000, // 8 second timeout
            null  // Return null if timeout
          );
          
          if (tour) {
            form.reset({
              title: tour.title,
              description: tour.description,
              short_description: tour.short_description,
              image_url: tour.image_url,
              price: tour.price,
              duration: tour.duration,
              category: tour.category,
              max_participants: tour.max_participants,
              min_participants: tour.min_participants,
              difficulty: tour.difficulty || "fácil",
              rating: tour.rating,
              meeting_point: tour.meeting_point || "",
              schedule: tour.schedule?.join("\n") || "",
              includes: tour.includes?.join("\n") || "",
              excludes: tour.excludes?.join("\n") || "",
              notes: tour.notes?.join("\n") || "",
              gallery_images: tour.gallery_images?.join(",") || "",
            });
            setPreviewUrl(tour.image_url);
          } else {
            // Handle case where tour is not found
            if (setError) {
              setError("Não foi possível carregar os dados do passeio.");
            }
            toast({
              title: "Erro",
              description: "Passeio não encontrado ou erro ao carregar.",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error("Error loading tour:", error);
          if (setError) {
            setError("Erro ao carregar o passeio. Por favor, tente novamente.");
          }
          toast({
            title: "Erro",
            description: "Não foi possível carregar os dados do passeio.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
          if (loadingTimeout) {
            clearTimeout(loadingTimeout);
            setLoadingTimeout(null);
          }
        }
      }
    };

    loadTourData();
    
    return () => {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
    };
  }, [tourId, form, getTourById, toast, setError, loadingTimeout]);

  // Update image preview
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.image_url) {
        setPreviewUrl(value.image_url);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Form submission
  const onSubmit = async (data: TourFormValues) => {
    // Convert string lists to arrays
    const formattedData = {
      ...data,
      // Ensure price is always set
      price: data.price || 0,
      // Ensure all required fields are present including max_participants
      max_participants: data.max_participants || 10,
      min_participants: data.min_participants || 1,
      gallery_images: stringToArray(data.gallery_images, ","),
      schedule: stringToArray(data.schedule, "\n"),
      includes: stringToArray(data.includes, "\n"),
      excludes: stringToArray(data.excludes, "\n"),
      notes: stringToArray(data.notes, "\n"),
      // Ensure required fields are present
      title: data.title || "Novo Passeio",
      description: data.description || "Descrição padrão",
      short_description: data.short_description || (data.description ? data.description.substring(0, 100) : "Descrição curta"),
      duration: data.duration || "1 hora",
      category: data.category || "aventura",
      image_url: data.image_url || "/placeholder.jpg"
    } as Omit<Tour, "id" | "created_at" | "updated_at">;

    setIsLoading(true);
    
    try {
      if (tourId) {
        // Update existing tour with timeout
        await withTimeout(
          () => saveTour({ ...formattedData, id: tourId }),
          10000
        );
        toast({
          title: "Sucesso",
          description: "Passeio atualizado com sucesso.",
        });
      } else {
        // Create new tour with timeout
        await withTimeout(
          () => saveTour(formattedData),
          10000
        );
        toast({
          title: "Sucesso",
          description: "Novo passeio criado com sucesso.",
        });
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving tour:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o passeio. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <span>Carregando dados do passeio...</span>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <TourBasicInfoForm 
            form={form} 
            tourCategories={tourCategories} 
            difficultyLevels={difficultyLevels} 
          />

          {/* Right Column */}
          <div className="space-y-6">
            <TourMediaForm 
              form={form} 
              previewUrl={previewUrl} 
              setPreviewUrl={setPreviewUrl} 
            />
            
            <TourScheduleForm form={form} />
          </div>
        </div>

        <TourFormActions 
          onCancel={onCancel} 
          isEditing={!!tourId} 
          isSubmitting={isLoading}
        />
      </form>
    </Form>
  );
};

export default TourForm;
