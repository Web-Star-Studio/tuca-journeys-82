
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTours } from "@/hooks/use-tours";
import { toast } from "sonner";
import { TourFormValues, tourFormSchema, tourCategories, difficultyLevels } from "./TourFormTypes";
import TourBasicInfoForm from "./form/TourBasicInfoForm";
import TourMediaForm from "./form/TourMediaForm";
import TourScheduleForm from "./form/TourScheduleForm";
import TourFormActions from "./form/TourFormActions";
import { Form } from "@/components/ui/form";
import { Tour } from "@/types/database";
import { stringToArray } from "@/utils/formUtils";
import { withTimeout } from "@/utils/asyncUtils";
import { useTour } from "@/hooks/use-tours";

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
  
  // Use optimized tourData fetching from the useTour hook instead of getTourById
  const { data: tourData, isLoading: isTourLoading, error: tourError } = useTour(tourId);
  const { saveTour, isSaving } = useTours();
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  // Combined loading state
  const isLoading = isTourLoading || isSubmitting;

  // Update external loading state
  useEffect(() => {
    if (setLoading) {
      setLoading(isLoading);
    }
    
    // Set a timeout to prevent UI from being stuck indefinitely
    if (isTourLoading && tourId) {
      const timeoutId = setTimeout(() => {
        if (setError) {
          setError("O carregamento demorou muito tempo. Por favor, tente novamente mais tarde.");
        }
        if (setLoading) {
          setLoading(false);
        }
      }, 10000); // 10 second timeout
      
      setLoadingTimeout(timeoutId);
      
      return () => {
        if (timeoutId) clearTimeout(timeoutId);
      };
    }
  }, [isLoading, setLoading, tourId, setError, isTourLoading]);

  // Set up form with tour data when available
  useEffect(() => {
    if (tourData && !isSubmitting) {
      form.reset({
        title: tourData.title,
        description: tourData.description,
        short_description: tourData.short_description,
        image_url: tourData.image_url,
        price: tourData.price,
        duration: tourData.duration,
        category: tourData.category,
        max_participants: tourData.max_participants,
        min_participants: tourData.min_participants,
        difficulty: tourData.difficulty || "fácil",
        rating: tourData.rating,
        meeting_point: tourData.meeting_point || "",
        schedule: tourData.schedule?.join("\n") || "",
        includes: tourData.includes?.join("\n") || "",
        excludes: tourData.excludes?.join("\n") || "",
        notes: tourData.notes?.join("\n") || "",
        gallery_images: tourData.gallery_images?.join(",") || "",
      });
      setPreviewUrl(tourData.image_url);
      
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
        setLoadingTimeout(null);
      }
    }
  }, [tourData, form, loadingTimeout, isSubmitting]);

  // Handle tour error
  useEffect(() => {
    if (tourError && setError) {
      setError("Não foi possível carregar os dados do passeio.");
      toast.error("Erro ao carregar passeio");
      console.error("Error loading tour:", tourError);
    }
  }, [tourError, setError]);

  // Update image preview
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.image_url) {
        setPreviewUrl(value.image_url);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Form submission with improved error handling
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
    } as Partial<Tour>;

    setIsSubmitting(true);
    if (setLoading) setLoading(true);
    
    try {
      if (tourId) {
        // Update existing tour with timeout
        await withTimeout(
          () => saveTour({ ...formattedData, id: tourId }), 
          15000,
          null as any // Fallback value
        );
        toast.success("Passeio atualizado com sucesso.");
      } else {
        // Create new tour with timeout
        await withTimeout(
          () => saveTour(formattedData), 
          15000,
          null as any // Fallback value
        );
        toast.success("Novo passeio criado com sucesso.");
      }
      onSuccess();
      return Promise.resolve();
    } catch (error) {
      console.error("Error saving tour:", error);
      toast.error("Não foi possível salvar o passeio. Tente novamente.");
      return Promise.reject(error);
    } finally {
      setIsSubmitting(false);
      if (setLoading) setLoading(false);
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
          isSubmitting={isSubmitting || isSaving}
        />
      </form>
    </Form>
  );
};

export default TourForm;
