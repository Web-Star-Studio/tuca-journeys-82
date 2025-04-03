
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useTours } from "@/hooks/use-tours";
import { Tour } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

// Form schema for validation
const tourFormSchema = z.object({
  title: z.string().min(3, { message: "O título deve ter pelo menos 3 caracteres" }),
  description: z.string().min(10, { message: "A descrição deve ter pelo menos 10 caracteres" }),
  image_url: z.string().url({ message: "Forneça uma URL válida para a imagem" }),
  price: z.coerce.number().positive({ message: "O preço deve ser um valor positivo" }),
  duration: z.string().min(1, { message: "A duração é obrigatória" }),
  category: z.string().min(1, { message: "A categoria é obrigatória" }),
  rating: z.coerce.number().min(0).max(5, { message: "A avaliação deve estar entre 0 e 5" }),
  locations: z.string().optional(),
  schedule: z.string().optional(),
  included: z.string().optional(),
  not_included: z.string().optional(),
  requirements: z.string().optional(),
});

type TourFormValues = z.infer<typeof tourFormSchema>;

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
      image_url: "",
      price: 0,
      duration: "",
      category: "",
      rating: 4.5,
      locations: "",
      schedule: "",
      included: "",
      not_included: "",
      requirements: "",
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
              image_url: tour.image_url,
              price: tour.price,
              duration: tour.duration,
              category: tour.category,
              rating: tour.rating,
              locations: tour.locations?.join(", ") || "",
              schedule: tour.schedule?.join("\n") || "",
              included: tour.included?.join("\n") || "",
              not_included: tour.not_included?.join("\n") || "",
              requirements: tour.requirements?.join("\n") || "",
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
      locations: data.locations ? data.locations.split(",").map(item => item.trim()) : [],
      schedule: data.schedule ? data.schedule.split("\n").map(item => item.trim()).filter(Boolean) : [],
      included: data.included ? data.included.split("\n").map(item => item.trim()).filter(Boolean) : [],
      not_included: data.not_included ? data.not_included.split("\n").map(item => item.trim()).filter(Boolean) : [],
      requirements: data.requirements ? data.requirements.split("\n").map(item => item.trim()).filter(Boolean) : [],
    };

    try {
      if (tourId) {
        // Update existing tour
        await updateTour({ ...formattedData, id: tourId } as Tour);
        toast({
          title: "Sucesso",
          description: "Passeio atualizado com sucesso.",
        });
      } else {
        // Create new tour
        await createTour(formattedData as Omit<Tour, "id">);
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

  const tourCategories = [
    "aventura",
    "mergulho",
    "trilha",
    "histórico",
    "natureza",
    "praia",
    "barco",
    "família",
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Título do passeio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descrição do passeio"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço (R$)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duração</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 3 horas" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {tourCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avaliação (0-5)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="locations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Locais (separados por vírgula)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Praia do Sancho, Baía dos Porcos, ..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Lista de locais visitados durante o passeio
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Imagem</FormLabel>
                  <FormControl>
                    <Input placeholder="URL da imagem principal" {...field} />
                  </FormControl>
                  <FormMessage />
                  {previewUrl && (
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground mb-1">Preview:</p>
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="rounded-md h-40 object-cover"
                        onError={() => setPreviewUrl("")}
                      />
                    </div>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="schedule"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cronograma (uma linha por item)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="09:00 - Saída do hotel&#10;10:00 - Chegada ao local&#10;..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Detalhe o cronograma do passeio. Cada linha será um item.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="included"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Incluso (uma linha por item)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Transporte&#10;Guia&#10;Almoço&#10;..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="not_included"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Não Incluso (uma linha por item)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Bebidas&#10;Taxa de conservação&#10;..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requisitos (uma linha por item)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Protetor solar&#10;Roupas leves&#10;Calçado adequado&#10;..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            {tourId ? "Atualizar Passeio" : "Criar Passeio"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
