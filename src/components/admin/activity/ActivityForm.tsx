
import React, { useState, useEffect } from "react";
import { useActivity } from "@/hooks/activities";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { useActivitiesBase } from "@/hooks/activities/use-activities-base";
import { useActivityMutations } from "@/hooks/activities/use-activity-mutations";

// Define form schema using zod
export const activityFormSchema = z.object({
  title: z.string().min(3, { message: "Título deve ter pelo menos 3 caracteres" }),
  description: z.string().min(10, { message: "Descrição deve ter pelo menos 10 caracteres" }),
  short_description: z.string().optional(),
  price: z.string().or(z.number()).transform(val => Number(val)),
  category: z.string().min(1, { message: "Categoria é obrigatória" }),
  difficulty: z.string().min(1, { message: "Nível de dificuldade é obrigatório" }),
  duration: z.string().min(1, { message: "Duração é obrigatória" }),
  meeting_point: z.string().optional(),
  min_participants: z.string().or(z.number()).transform(val => Number(val)),
  max_participants: z.string().or(z.number()).transform(val => Number(val)),
  includes: z.string().optional(),
  excludes: z.string().optional(),
  notes: z.string().optional(),
  schedule: z.string().optional(),
  image_url: z.string().min(1, { message: "Imagem principal é obrigatória" }),
  gallery_images: z.string().optional(),
  is_active: z.boolean().default(true),
  is_featured: z.boolean().default(false),
  rating: z.string().or(z.number()).transform(val => Number(val)).default(0),
});

export type ActivityFormValues = z.infer<typeof activityFormSchema>;

interface ActivityFormProps {
  activityId?: number;
  onSuccess: () => void;
  onCancel: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const ActivityForm: React.FC<ActivityFormProps> = ({
  activityId,
  onSuccess,
  onCancel,
  setLoading,
  setError,
}) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [previewUrl, setPreviewUrl] = useState("");
  
  const { activity, isLoading } = useActivity(activityId);
  const { createActivity, updateActivity, isSaving } = useActivityMutations();

  // Initialize form with empty values
  const form = useForm<ActivityFormValues>({
    resolver: zodResolver(activityFormSchema),
    defaultValues: {
      title: "",
      description: "",
      short_description: "",
      price: 0,
      category: "",
      difficulty: "fácil",
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
      is_active: true,
      is_featured: false,
      rating: 0,
    },
  });

  // Update form values when activity data is loaded
  useEffect(() => {
    if (activity) {
      // Update form values with activity data
      form.reset({
        title: activity.title,
        description: activity.description,
        short_description: activity.short_description,
        price: activity.price,
        category: activity.category,
        difficulty: activity.difficulty,
        duration: activity.duration,
        meeting_point: activity.meeting_point,
        min_participants: activity.min_participants,
        max_participants: activity.max_participants,
        includes: activity.includes?.join("\n"),
        excludes: activity.excludes?.join("\n"),
        notes: activity.notes?.join("\n"),
        schedule: activity.schedule?.join("\n"),
        image_url: activity.image_url,
        gallery_images: activity.gallery_images?.join(","),
        is_active: activity.is_active,
        is_featured: activity.is_featured,
        rating: activity.rating,
      });
      
      setPreviewUrl(activity.image_url);
    }
  }, [activity, form]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  // Handle form submission
  const onSubmit = async (values: ActivityFormValues) => {
    try {
      const activityData = {
        ...values,
        includes: values.includes ? values.includes.split("\n").filter(Boolean) : [],
        excludes: values.excludes ? values.excludes.split("\n").filter(Boolean) : [],
        notes: values.notes ? values.notes.split("\n").filter(Boolean) : [],
        schedule: values.schedule ? values.schedule.split("\n").filter(Boolean) : [],
        gallery_images: values.gallery_images ? values.gallery_images.split(",").filter(Boolean) : [],
      };
      
      if (activityId) {
        await updateActivity({ id: activityId, data: activityData });
      } else {
        await createActivity(activityData);
      }
      
      onSuccess();
      toast.success(
        activityId ? "Atividade atualizada com sucesso!" : "Atividade criada com sucesso!"
      );
    } catch (error) {
      console.error("Error saving activity:", error);
      toast.error("Erro ao salvar atividade");
      setError(error instanceof Error ? error.message : "Erro desconhecido");
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="media">Mídia</TabsTrigger>
              <TabsTrigger value="schedule">Cronograma e Itens</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="p-4">
              <p className="text-center">Componente de Informações Básicas</p>
            </TabsContent>
            
            <TabsContent value="details" className="p-4">
              <p className="text-center">Componente de Detalhes</p>
            </TabsContent>
            
            <TabsContent value="media" className="p-4">
              <p className="text-center">Componente de Mídia</p>
            </TabsContent>
            
            <TabsContent value="schedule" className="p-4">
              <p className="text-center">Componente de Cronograma e Itens</p>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSaving}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {activityId ? "Atualizar" : "Criar"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ActivityForm;
