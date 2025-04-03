
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTours } from "@/hooks/use-tours";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { TourFormValues, tourFormSchema, tourCategories, difficultyLevels } from "./TourFormTypes";
import TourBasicInfoForm from "./form/TourBasicInfoForm";
import TourMediaForm from "./form/TourMediaForm";
import TourScheduleForm from "./form/TourScheduleForm";
import TourFormActions from "./form/TourFormActions";

interface TourFormProps {
  tourId?: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export const TourForm: React.FC<TourFormProps> = ({ tourId, onSuccess, onCancel }) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const { toast } = useToast();
  const { createTour, updateTour, getTourById } = useTours();
  const [isLoading, setIsLoading] = useState(tourId ? true : false);

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

  // Fetch tour data when editing
  useEffect(() => {
    const loadTourData = async () => {
      if (tourId) {
        try {
          const tour = await getTourById(tourId);
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
          }
        } catch (error) {
          console.error("Error loading tour:", error);
          toast({
            title: "Erro",
            description: "Não foi possível carregar os dados do passeio.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadTourData();
  }, [tourId, form, getTourById, toast]);

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
      gallery_images: data.gallery_images ? data.gallery_images.split(",").map(item => item.trim()).filter(Boolean) : [],
      schedule: data.schedule ? data.schedule.split("\n").map(item => item.trim()).filter(Boolean) : [],
      includes: data.includes ? data.includes.split("\n").map(item => item.trim()).filter(Boolean) : [],
      excludes: data.excludes ? data.excludes.split("\n").map(item => item.trim()).filter(Boolean) : [],
      notes: data.notes ? data.notes.split("\n").map(item => item.trim()).filter(Boolean) : [],
    };

    try {
      if (tourId) {
        // Update existing tour
        await updateTour({ ...formattedData, id: tourId });
        toast({
          title: "Sucesso",
          description: "Passeio atualizado com sucesso.",
        });
      } else {
        // Create new tour
        await createTour(formattedData);
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

        <TourFormActions onCancel={onCancel} isEditing={!!tourId} />
      </form>
    </Form>
  );
};

export default TourForm;
