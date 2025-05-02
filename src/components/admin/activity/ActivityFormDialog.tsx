
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useActivities, useActivity } from "@/hooks/use-activities";
import { ACTIVITY_CATEGORIES, ACTIVITY_DIFFICULTY_LEVELS } from "@/types/activity";
import ActivityBasicInfoForm from "./ActivityBasicInfoForm";
import ActivityMediaForm from "./ActivityMediaForm";
import ActivityScheduleForm from "./ActivityScheduleForm";
import ActivityDetailsForm from "./ActivityDetailsForm";
import ActivityFormActions from "./ActivityFormActions";

// Form schema for activity creation/edition
const activityFormSchema = z.object({
  title: z.string().min(3, { message: "Título deve ter pelo menos 3 caracteres" }),
  short_description: z.string().min(10, { message: "Descrição curta deve ter pelo menos 10 caracteres" }),
  description: z.string().min(20, { message: "Descrição completa deve ter pelo menos 20 caracteres" }),
  price: z.coerce.number().positive({ message: "Preço deve ser maior que zero" }),
  category: z.string().min(1, { message: "Categoria é obrigatória" }),
  difficulty: z.string().min(1, { message: "Nível de dificuldade é obrigatório" }),
  duration: z.string().min(1, { message: "Duração é obrigatória" }),
  meeting_point: z.string().min(3, { message: "Ponto de encontro é obrigatório" }),
  min_participants: z.coerce.number().int().positive(),
  max_participants: z.coerce.number().int().positive(),
  includes: z.string().optional(),
  excludes: z.string().optional(),
  notes: z.string().optional(),
  schedule: z.string().optional(),
  image_url: z.string().url({ message: "URL de imagem inválida" }),
  gallery_images: z.string().optional(),
  rating: z.coerce.number().min(0).max(5).optional(),
  is_active: z.boolean().default(true),
  is_featured: z.boolean().default(false),
});

export type ActivityFormValues = z.infer<typeof activityFormSchema>;

interface ActivityFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activityId?: number | null;
  onSuccess?: () => void;
}

const ActivityFormDialog: React.FC<ActivityFormDialogProps> = ({
  open,
  onOpenChange,
  activityId,
  onSuccess,
}) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [previewUrl, setPreviewUrl] = useState("");
  
  const { createActivity, updateActivity, isCreating, isUpdating } = useActivities();
  const { activity, isLoading } = useActivity(activityId || undefined);

  const form = useForm<ActivityFormValues>({
    resolver: zodResolver(activityFormSchema),
    defaultValues: {
      title: "",
      short_description: "",
      description: "",
      price: 0,
      category: "",
      difficulty: "",
      duration: "",
      meeting_point: "",
      min_participants: 1,
      max_participants: 10,
      includes: "",
      excludes: "",
      notes: "",
      schedule: "",
      image_url: "",
      gallery_images: "",
      rating: 4.5,
      is_active: true,
      is_featured: false,
    },
  });

  // Format activity data for form
  useEffect(() => {
    if (activity) {
      form.reset({
        title: activity.title,
        short_description: activity.short_description,
        description: activity.description,
        price: activity.price,
        category: activity.category,
        difficulty: activity.difficulty,
        duration: activity.duration,
        meeting_point: activity.meeting_point || "",
        min_participants: activity.min_participants,
        max_participants: activity.max_participants,
        includes: Array.isArray(activity.includes) ? activity.includes.join("\n") : "",
        excludes: Array.isArray(activity.excludes) ? activity.excludes.join("\n") : "",
        notes: Array.isArray(activity.notes) ? activity.notes.join("\n") : "",
        schedule: Array.isArray(activity.schedule) ? activity.schedule.join("\n") : "",
        image_url: activity.image_url,
        gallery_images: Array.isArray(activity.gallery_images) ? activity.gallery_images.join(",") : "",
        rating: activity.rating,
        is_active: activity.is_active,
        is_featured: activity.is_featured,
      });
      setPreviewUrl(activity.image_url);
    }
  }, [activity, form]);

  const onSubmit = (values: ActivityFormValues) => {
    // Ensure all required fields have values (non-optional)
    const processedValues = {
      title: values.title,
      short_description: values.short_description,
      description: values.description,
      price: values.price,
      category: values.category,
      difficulty: values.difficulty,
      duration: values.duration,
      meeting_point: values.meeting_point,
      min_participants: values.min_participants,
      max_participants: values.max_participants, 
      includes: values.includes ? values.includes.split("\n").filter(Boolean) : [],
      excludes: values.excludes ? values.excludes.split("\n").filter(Boolean) : [],
      notes: values.notes ? values.notes.split("\n").filter(Boolean) : [],
      schedule: values.schedule ? values.schedule.split("\n").filter(Boolean) : [],
      image_url: values.image_url,
      gallery_images: values.gallery_images ? values.gallery_images.split(",").filter(Boolean) : [],
      rating: values.rating || 4.5,
      is_active: values.is_active,
      is_featured: values.is_featured,
    };

    if (activityId) {
      updateActivity({ id: activityId, data: processedValues });
    } else {
      createActivity(processedValues);
    }

    if (onSuccess) {
      onSuccess();
    }
  };

  const isSubmitting = isCreating || isUpdating;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {activityId ? "Editar Atividade" : "Nova Atividade"}
          </DialogTitle>
        </DialogHeader>

        {isLoading && activityId ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="basic">Informações</TabsTrigger>
                  <TabsTrigger value="details">Detalhes</TabsTrigger>
                  <TabsTrigger value="schedule">Programação</TabsTrigger>
                  <TabsTrigger value="media">Mídia</TabsTrigger>
                </TabsList>

                <TabsContent value="basic">
                  <ActivityBasicInfoForm 
                    form={form}
                    categories={ACTIVITY_CATEGORIES.filter(c => c !== "Todos")}
                    difficultyLevels={ACTIVITY_DIFFICULTY_LEVELS}
                  />
                </TabsContent>

                <TabsContent value="details">
                  <ActivityDetailsForm form={form} />
                </TabsContent>

                <TabsContent value="schedule">
                  <ActivityScheduleForm form={form} />
                </TabsContent>

                <TabsContent value="media">
                  <ActivityMediaForm 
                    form={form}
                    previewUrl={previewUrl}
                    setPreviewUrl={setPreviewUrl}
                  />
                </TabsContent>
              </Tabs>

              <div className="mt-6">
                <ActivityFormActions
                  onCancel={() => onOpenChange(false)}
                  isEditing={!!activityId}
                  isSubmitting={isSubmitting}
                />
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ActivityFormDialog;
