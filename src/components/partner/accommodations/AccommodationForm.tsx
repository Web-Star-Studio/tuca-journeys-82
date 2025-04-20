
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Accommodation } from "@/types/database";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import GalleryUpload from "@/components/ui/gallery-upload";
import { stringToArray, arrayToString } from "@/utils/formUtils";

const accommodationSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  short_description: z.string().min(5, "A descrição curta deve ter pelo menos 5 caracteres"),
  price_per_night: z.coerce.number().min(1, "O preço deve ser maior que zero"),
  address: z.string().min(5, "O endereço deve ter pelo menos 5 caracteres"),
  bedrooms: z.coerce.number().min(1, "Deve ter pelo menos 1 quarto"),
  bathrooms: z.coerce.number().min(1, "Deve ter pelo menos 1 banheiro"),
  max_guests: z.coerce.number().min(1, "Deve acomodar pelo menos 1 hóspede"),
  type: z.string().min(1, "O tipo é obrigatório"),
  amenities: z.string().optional(),
  is_available: z.boolean().default(true),
});

type AccommodationFormValues = z.infer<typeof accommodationSchema>;

interface AccommodationFormProps {
  initialData?: Partial<Accommodation>;
  onSubmit: (data: Partial<Accommodation>) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const AccommodationForm = ({ initialData, onSubmit, onCancel, isLoading }: AccommodationFormProps) => {
  const form = useForm<AccommodationFormValues>({
    resolver: zodResolver(accommodationSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      short_description: initialData?.short_description || "",
      price_per_night: initialData?.price_per_night || 0,
      address: initialData?.address || "",
      bedrooms: initialData?.bedrooms || 1,
      bathrooms: initialData?.bathrooms || 1,
      max_guests: initialData?.max_guests || 1,
      type: initialData?.type || "apartment",
      amenities: initialData?.amenities ? arrayToString(initialData.amenities) : "",
      is_available: initialData?.is_available ?? true,
    },
  });

  const [galleryImages, setGalleryImages] = React.useState<string[]>(
    initialData?.gallery_images || []
  );
  const [mainImage, setMainImage] = React.useState<string>(initialData?.image_url || "");

  const handleSubmit = (values: AccommodationFormValues) => {
    const formattedData = {
      ...values,
      amenities: stringToArray(values.amenities || ""),
      image_url: mainImage,
      gallery_images: galleryImages,
    };

    onSubmit(formattedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Pousada Vista Mar" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="short_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição Curta</FormLabel>
                  <FormControl>
                    <Input placeholder="Uma breve descrição da hospedagem" {...field} />
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
                  <FormLabel>Descrição Completa</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva sua hospedagem em detalhes" 
                      {...field} 
                      className="min-h-32"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="price_per_night"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço por Noite (R$)</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Hospedagem</FormLabel>
                  <FormControl>
                    <Input placeholder="Apartamento, Casa, Chalé, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Input placeholder="Rua, número, bairro, cidade, estado" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              name="max_guests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacidade Máxima</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="amenities"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comodidades</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Wi-Fi, Ar-condicionado, Piscina (separados por vírgula)"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Lista de comodidades separadas por vírgula
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_available"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Disponível para Reserva</FormLabel>
                  <FormDescription>
                    Marque esta opção se a hospedagem estiver disponível para ser reservada
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <div>
              <FormLabel>Imagem Principal</FormLabel>
              <div className="mt-2">
                <GalleryUpload
                  initialImages={mainImage ? [mainImage] : []}
                  onImagesChange={(urls) => setMainImage(urls[0] || "")}
                  maxImages={1}
                />
              </div>
            </div>

            <div>
              <FormLabel>Galeria de Imagens</FormLabel>
              <div className="mt-2">
                <GalleryUpload
                  initialImages={galleryImages}
                  onImagesChange={setGalleryImages}
                  maxImages={5}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : initialData?.id ? "Atualizar" : "Criar"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AccommodationForm;
