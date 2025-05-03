
import React, { useState, useEffect } from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Activity, ACTIVITY_CATEGORIES, ACTIVITY_DIFFICULTY_LEVELS } from "@/types/activity";
import { useActivity } from "@/hooks/activities";
import { useActivityMutations } from "@/hooks/activities/use-activity-mutations";
import ActivityBasicInfoForm from "./ActivityBasicInfoForm";
import ActivityMediaForm from "./ActivityMediaForm";
import ActivityScheduleForm from "./ActivityScheduleForm";
import ActivityDetailsForm from "./ActivityDetailsForm";

// Activity form schema
export const activityFormSchema = z.object({
  title: z.string().min(3, "O título deve ter no mínimo 3 caracteres"),
  description: z.string().min(10, "A descrição deve ter no mínimo 10 caracteres"),
  short_description: z.string().min(10, "A descrição curta deve ter no mínimo 10 caracteres"),
  image_url: z.string().url("URL de imagem inválida"),
  price: z.coerce.number().min(0, "O preço deve ser maior ou igual a zero"),
  duration: z.string().min(1, "A duração é obrigatória"),
  category: z.string().min(1, "A categoria é obrigatória"),
  max_participants: z.coerce.number().min(1, "O número máximo de participantes deve ser pelo menos 1"),
  difficulty: z.string(),
  rating: z.coerce.number().min(0, "A avaliação deve ser maior ou igual a zero"),
  meeting_point: z.string().optional(),
  schedule: z.string().optional(),
  includes: z.string().optional(),
  excludes: z.string().optional(),
  notes: z.string().optional(),
  gallery_images: z.string().optional(),
});

// Export the type based on the schema
export type ActivityFormValues = z.infer<typeof activityFormSchema>;

interface ActivityFormProps {
  activityId?: number;
  onSuccess: () => void;
  onCancel: () => void;
  setLoading?: (loading: boolean) => void;
  setError?: (error: string | null) => void;
}

const ActivityForm: React.FC<ActivityFormProps> = ({
  activityId,
  onSuccess,
  onCancel,
  setLoading,
  setError
}) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const { activity, isLoading: isActivityLoading } = useActivity(activityId);
  const { createActivity, updateActivity, isCreating, isUpdating } = useActivityMutations();

  // Create form
  const form = useForm<ActivityFormValues>({
    resolver: zodResolver(activityFormSchema),
    defaultValues: {
      title: "",
      description: "",
      short_description: "",
      image_url: "",
      price: 0,
      duration: "",
      category: "",
      max_participants: 10,
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
      setLoading(isActivityLoading || isCreating || isUpdating);
    }
  }, [isActivityLoading, isCreating, isUpdating, setLoading]);

  // Fill form with activity data when available
  useEffect(() => {
    if (activity && !isCreating && !isUpdating) {
      form.reset({
        title: activity.title,
        description: activity.description,
        short_description: activity.short_description,
        image_url: activity.image_url,
        price: activity.price,
        duration: activity.duration,
        category: activity.category,
        max_participants: activity.max_participants,
        difficulty: activity.difficulty || "fácil",
        rating: activity.rating,
        meeting_point: activity.meeting_point || "",
        schedule: activity.schedule?.join("\n") || "",
        includes: activity.includes?.join("\n") || "",
        excludes: activity.excludes?.join("\n") || "",
        notes: activity.notes?.join("\n") || "",
        gallery_images: activity.gallery_images?.join(",") || "",
      });
      setPreviewUrl(activity.image_url);
    }
  }, [activity, form, isCreating, isUpdating]);

  // Handle form submission
  const onSubmit = async (data: ActivityFormValues) => {
    try {
      // Helper function to convert string to array
      const stringToArray = (str: string | undefined, separator: string) => {
        return str ? str.split(separator).filter(item => item.trim() !== '') : [];
      };

      const formattedData = {
        ...data,
        price: data.price || 0,
        gallery_images: stringToArray(data.gallery_images, ","),
        schedule: stringToArray(data.schedule, "\n"),
        includes: stringToArray(data.includes, "\n"),
        excludes: stringToArray(data.excludes, "\n"),
        notes: stringToArray(data.notes, "\n"),
      };

      if (setLoading) setLoading(true);

      if (activityId) {
        await updateActivity({ id: activityId, data: formattedData });
      } else {
        await createActivity(formattedData);
      }
      
      onSuccess();
    } catch (error: any) {
      if (setError) {
        setError(error.message || "Ocorreu um erro ao salvar a atividade.");
      }
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  // Show loading state
  if (activityId && isActivityLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <ActivityBasicInfoForm 
              form={form} 
              categories={ACTIVITY_CATEGORIES} 
              difficultyLevels={ACTIVITY_DIFFICULTY_LEVELS} 
            />
            <ActivityDetailsForm form={form} />
          </div>
          
          <div className="space-y-6">
            <ActivityMediaForm form={form} previewUrl={previewUrl} />
            <ActivityScheduleForm form={form} />
          </div>
        </div>
        
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button 
            type="submit" 
            disabled={isCreating || isUpdating}
          >
            {(isCreating || isUpdating) ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {activityId ? "Atualizando..." : "Criando..."}
              </>
            ) : (
              activityId ? "Atualizar Atividade" : "Criar Atividade"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ActivityForm;
