
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useAccommodations } from "@/hooks/use-accommodations";
import { Accommodation } from "@/types/database";
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
const accommodationFormSchema = z.object({
  title: z.string().min(3, { message: "O título deve ter pelo menos 3 caracteres" }),
  description: z.string().min(10, { message: "A descrição deve ter pelo menos 10 caracteres" }),
  image_url: z.string().url({ message: "Forneça uma URL válida para a imagem" }),
  type: z.string().min(1, { message: "O tipo de hospedagem é obrigatório" }),
  price_per_night: z.coerce.number().positive({ message: "O preço deve ser um valor positivo" }),
  bedrooms: z.coerce.number().int().min(1, { message: "Precisa ter pelo menos 1 quarto" }),
  bathrooms: z.coerce.number().int().min(1, { message: "Precisa ter pelo menos 1 banheiro" }),
  capacity: z.coerce.number().int().min(1, { message: "Precisa acomodar pelo menos 1 pessoa" }),
  location: z.string().min(3, { message: "A localização é obrigatória" }),
  rating: z.coerce.number().min(0).max(5, { message: "A avaliação deve estar entre 0 e 5" }),
  amenities: z.string().optional(),
  gallery: z.string().optional(),
});

type AccommodationFormValues = z.infer<typeof accommodationFormSchema>;

interface AccommodationFormProps {
  accommodationId?: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export const AccommodationForm: React.FC<AccommodationFormProps> = ({ 
  accommodationId, 
  onSuccess, 
  onCancel 
}) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const { toast } = useToast();
  const { createAccommodation, updateAccommodation, getAccommodationById } = useAccommodations();
  const [isLoading, setIsLoading] = useState(accommodationId ? true : false);

  // Initialize form
  const form = useForm<AccommodationFormValues>({
    resolver: zodResolver(accommodationFormSchema),
    defaultValues: {
      title: "",
      description: "",
      image_url: "",
      type: "",
      price_per_night: 0,
      bedrooms: 1,
      bathrooms: 1,
      capacity: 2,
      location: "",
      rating: 4.5,
      amenities: "",
      gallery: "",
    },
  });

  // Fetch accommodation data when editing
  useEffect(() => {
    const loadAccommodationData = async () => {
      if (accommodationId) {
        try {
          const accommodation = await getAccommodationById(accommodationId);
          if (accommodation) {
            form.reset({
              title: accommodation.title,
              description: accommodation.description,
              image_url: accommodation.image_url,
              type: accommodation.type,
              price_per_night: accommodation.price_per_night,
              bedrooms: accommodation.bedrooms,
              bathrooms: accommodation.bathrooms,
              capacity: accommodation.max_guests,
              location: accommodation.address,
              rating: accommodation.rating,
              amenities: accommodation.amenities?.join("\n") || "",
              gallery: accommodation.gallery_images?.join("\n") || "",
            });
            setPreviewUrl(accommodation.image_url);
          }
        } catch (error) {
          console.error("Error loading accommodation:", error);
          toast({
            title: "Erro",
            description: "Não foi possível carregar os dados da hospedagem.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadAccommodationData();
  }, [accommodationId, form, getAccommodationById, toast]);

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
  const onSubmit = async (data: AccommodationFormValues) => {
    // Convert string lists to arrays
    const amenitiesArray = data.amenities ? data.amenities.split("\n").map(item => item.trim()).filter(Boolean) : [];
    const galleryArray = data.gallery ? data.gallery.split("\n").map(item => item.trim()).filter(Boolean) : [];

    try {
      if (accommodationId) {
        // Update existing accommodation
        await updateAccommodation({ 
          id: accommodationId,
          title: data.title,
          description: data.description,
          short_description: data.description.substring(0, 100),
          price_per_night: data.price_per_night,
          image_url: data.image_url,
          type: data.type,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          max_guests: data.capacity,
          address: data.location,
          amenities: amenitiesArray,
          gallery_images: galleryArray,
          rating: data.rating
        });
        
        toast({
          title: "Sucesso",
          description: "Hospedagem atualizada com sucesso.",
        });
      } else {
        // Create new accommodation
        await createAccommodation({ 
          title: data.title,
          description: data.description,
          short_description: data.description.substring(0, 100),
          price_per_night: data.price_per_night,
          image_url: data.image_url,
          type: data.type,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          max_guests: data.capacity,
          address: data.location,
          amenities: amenitiesArray,
          gallery_images: galleryArray,
          rating: data.rating
        });
        
        toast({
          title: "Sucesso",
          description: "Nova hospedagem criada com sucesso.",
        });
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving accommodation:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar a hospedagem. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <span>Carregando dados da hospedagem...</span>
      </div>
    );
  }

  const accommodationTypes = [
    "hotel",
    "pousada",
    "resort",
    "apartamento",
    "casa",
    "chalé",
    "villa",
    "hostel",
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
                  <FormLabel>Nome da Hospedagem</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da hospedagem" {...field} />
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
                      placeholder="Descrição da hospedagem"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localização</FormLabel>
                  <FormControl>
                    <Input placeholder="Endereço / Localização" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
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
                        {accommodationTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
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
                name="price_per_night"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço por Noite (R$)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quartos</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bathrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Banheiros</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacidade</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Imagem Principal</FormLabel>
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
              name="gallery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Galeria de Imagens (uma URL por linha)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="https://exemplo.com/imagem1.jpg&#10;https://exemplo.com/imagem2.jpg&#10;..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Adicione URLs de imagens adicionais para a galeria, uma por linha
                  </FormDescription>
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

            <FormField
              control={form.control}
              name="amenities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comodidades (uma por linha)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Wi-Fi gratuito&#10;Piscina&#10;Café da manhã&#10;Ar-condicionado&#10;..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Liste as comodidades disponíveis, uma por linha
                  </FormDescription>
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
            {accommodationId ? "Atualizar Hospedagem" : "Criar Hospedagem"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

