
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Accommodation } from "@/types/database";
import { partnerService } from "@/services/partner-service";
import ImageUpload from "@/components/ui/image-upload";
import GalleryUpload from "@/components/ui/gallery-upload";
import { useCurrentPartner } from "@/hooks/use-partner";
import { Loader2 } from "lucide-react";

// Schema for form validation
const accommodationSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  short_description: z.string().min(5, "A descrição curta deve ter pelo menos 5 caracteres"),
  type: z.string().min(1, "O tipo é obrigatório"),
  price_per_night: z.coerce.number().positive("O preço deve ser positivo"),
  bedrooms: z.coerce.number().int().positive("O número de quartos deve ser positivo"),
  bathrooms: z.coerce.number().int().positive("O número de banheiros deve ser positivo"),
  max_guests: z.coerce.number().int().positive("O número máximo de hóspedes deve ser positivo"),
  address: z.string().min(5, "O endereço deve ter pelo menos 5 caracteres"),
  city: z.string().min(2, "A cidade deve ter pelo menos 2 caracteres"),
  state: z.string().min(2, "O estado deve ter pelo menos 2 caracteres"),
  country: z.string().min(2, "O país deve ter pelo menos 2 caracteres"),
  amenities: z.array(z.string()).optional(),
  image_url: z.string().min(1, "Uma imagem principal é obrigatória"),
  gallery_images: z.array(z.string()).optional(),
});

type AccommodationFormValues = z.infer<typeof accommodationSchema>;

interface AccommodationFormProps {
  accommodation?: Partial<Accommodation>;
  onSuccess: () => void;
}

const AccommodationForm: React.FC<AccommodationFormProps> = ({ 
  accommodation, 
  onSuccess 
}) => {
  const { data: partner } = useCurrentPartner();
  
  const defaultValues: Partial<AccommodationFormValues> = {
    title: accommodation?.title || "",
    description: accommodation?.description || "",
    short_description: accommodation?.short_description || "",
    type: accommodation?.type || "apartment",
    price_per_night: accommodation?.price_per_night || 0,
    bedrooms: accommodation?.bedrooms || 1,
    bathrooms: accommodation?.bathrooms || 1,
    max_guests: accommodation?.max_guests || 2,
    address: accommodation?.address || "",
    city: "",
    state: "",
    country: "Brasil",
    amenities: accommodation?.amenities || [],
    image_url: accommodation?.image_url || "",
    gallery_images: accommodation?.gallery_images || [],
  };

  const form = useForm<AccommodationFormValues>({
    resolver: zodResolver(accommodationSchema),
    defaultValues,
  });
  
  const isSubmitting = form.formState.isSubmitting;
  
  const onSubmit = async (data: AccommodationFormValues) => {
    if (!partner) {
      toast.error("Você precisa estar logado como parceiro");
      return;
    }
    
    try {
      const accommodationData = {
        ...data,
        partner_id: partner.id,
        rating: accommodation?.rating || 0,
      };
      
      if (accommodation?.id) {
        // Update existing accommodation
        await partnerService.updateAccommodation(accommodation.id, accommodationData);
        toast.success("Hospedagem atualizada com sucesso");
      } else {
        // Create new accommodation
        await partnerService.createAccommodation(partner.id, accommodationData);
        toast.success("Hospedagem criada com sucesso");
        form.reset(defaultValues); // Reset form after creation
      }
      
      onSuccess();
    } catch (error) {
      console.error("Erro ao salvar hospedagem:", error);
      toast.error("Erro ao salvar hospedagem. Tente novamente.");
    }
  };
  
  const handleImageUploaded = (url: string) => {
    form.setValue("image_url", url);
  };
  
  const handleGalleryUploaded = (urls: string[]) => {
    form.setValue("gallery_images", urls);
  };

  // Define amenity options
  const amenityOptions = [
    { label: "Wi-Fi", value: "wifi" },
    { label: "Ar-condicionado", value: "ac" },
    { label: "TV", value: "tv" },
    { label: "Cozinha", value: "kitchen" },
    { label: "Piscina", value: "pool" },
    { label: "Estacionamento", value: "parking" },
    { label: "Academia", value: "gym" },
    { label: "Café da manhã", value: "breakfast" },
    { label: "Área de trabalho", value: "workspace" },
    { label: "Pet friendly", value: "pet_friendly" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Informações Básicas</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da hospedagem" {...field} />
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
                  <FormLabel>Tipo</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      {...field}
                    >
                      <option value="apartment">Apartamento</option>
                      <option value="house">Casa</option>
                      <option value="hotel">Hotel</option>
                      <option value="hostel">Hostel</option>
                      <option value="pousada">Pousada</option>
                      <option value="chalet">Chalé</option>
                      <option value="resort">Resort</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="short_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição Curta</FormLabel>
                <FormControl>
                  <Input placeholder="Breve descrição" {...field} />
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
                    placeholder="Descreva detalhadamente a hospedagem" 
                    className="min-h-32"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Características</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="price_per_night"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço por noite (R$)</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
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
          </div>
          
          <FormField
            control={form.control}
            name="max_guests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacidade de hóspedes</FormLabel>
                <FormControl>
                  <Input type="number" min="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Localização</h3>
          
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Input placeholder="Endereço completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Cidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input placeholder="Estado" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>País</FormLabel>
                  <FormControl>
                    <Input placeholder="País" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Imagens</h3>
          
          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagem Principal</FormLabel>
                <FormControl>
                  <ImageUpload 
                    currentImageUrl={field.value} 
                    onImageUploaded={handleImageUploaded} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="gallery_images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Galeria de Imagens</FormLabel>
                <FormControl>
                  <GalleryUpload
                    initialImages={field.value || []}
                    onImagesChange={handleGalleryUploaded}
                    maxImages={5}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : accommodation?.id ? (
            "Atualizar Hospedagem"
          ) : (
            "Criar Hospedagem"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AccommodationForm;
