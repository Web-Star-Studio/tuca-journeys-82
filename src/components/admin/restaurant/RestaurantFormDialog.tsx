import React, { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useRestaurantAdmin } from '@/hooks/use-restaurants';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { stringToArray, arrayToString } from '@/utils/formUtils';
import { formatCurrency } from '@/utils/format-utils';
import ImageUploader from '@/components/admin/shared/ImageUploader';
import TagInput from '@/components/admin/shared/TagInput';
import { isValidUrl } from '@/utils/validationUtils';
import { Loader2 } from 'lucide-react';
import type { Restaurant, RestaurantHours } from '@/types/restaurant';

interface RestaurantFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  restaurant: Restaurant | null;
}

const formSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  short_description: z.string().min(10, { message: "Descrição curta deve ter pelo menos 10 caracteres" }),
  description: z.string().min(20, { message: "Descrição completa deve ter pelo menos 20 caracteres" }),
  address: z.string().min(5, { message: "Endereço é obrigatório" }),
  location: z.string().min(3, { message: "Localização é obrigatória" }),
  image_url: z.string().url({ message: "URL de imagem inválida" }),
  cuisine_type: z.string().min(3, { message: "Tipo de cozinha é obrigatório" }),
  price_range: z.string().min(1, { message: "Faixa de preço é obrigatória" }),
  is_featured: z.boolean().default(false),
  is_active: z.boolean().default(true),
  payment_methods_string: z.string().optional(),
  reservation_policy: z.string().optional(),
  gallery_images_string: z.string().optional(),
  opening_hours: z.record(z.object({
    open: z.string().optional(),
    close: z.string().optional()
  })).optional()
});

const weekdays = [
  { id: 'monday', label: 'Segunda-feira' },
  { id: 'tuesday', label: 'Terça-feira' },
  { id: 'wednesday', label: 'Quarta-feira' },
  { id: 'thursday', label: 'Quinta-feira' },
  { id: 'friday', label: 'Sexta-feira' },
  { id: 'saturday', label: 'Sábado' },
  { id: 'sunday', label: 'Domingo' },
];

const priceRangeOptions = [
  { value: '$', label: '$ (Econômico)' },
  { value: '$$', label: '$$ (Moderado)' },
  { value: '$$$', label: '$$$ (Caro)' },
  { value: '$$$$', label: '$$$$ (Luxuoso)' },
];

const cuisineTypeOptions = [
  'Brasileira', 'Italiana', 'Japonesa', 'Chinesa', 'Mexicana', 
  'Indiana', 'Francesa', 'Mediterrânea', 'Vegetariana', 'Vegana',
  'Frutos do Mar', 'Churrascaria', 'Pizzaria', 'Fast Food', 'Contemporânea'
];

type FormValues = z.infer<typeof formSchema>;

const RestaurantFormDialog: React.FC<RestaurantFormDialogProps> = ({
  isOpen,
  onOpenChange,
  restaurant
}) => {
  const { createRestaurant, updateRestaurant, isLoading } = useRestaurantAdmin();
  const [activeTab, setActiveTab] = useState("informacoes");
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      short_description: "",
      description: "",
      address: "",
      location: "",
      image_url: "",
      cuisine_type: "",
      price_range: "$",
      is_featured: false,
      is_active: true,
      payment_methods_string: "",
      reservation_policy: "",
      gallery_images_string: "",
      opening_hours: {
        monday: { open: "08:00", close: "22:00" },
        tuesday: { open: "08:00", close: "22:00" },
        wednesday: { open: "08:00", close: "22:00" },
        thursday: { open: "08:00", close: "22:00" },
        friday: { open: "08:00", close: "22:00" },
        saturday: { open: "08:00", close: "22:00" },
        sunday: { open: "08:00", close: "22:00" }
      }
    }
  });
  
  // Populate form with existing restaurant data if editing
  useEffect(() => {
    if (restaurant) {
      // Convert the restaurant.opening_hours to the expected record format
      let formattedOpeningHours: Record<string, { open?: string; close?: string }> = {};
      
      if (restaurant.opening_hours) {
        weekdays.forEach(day => {
          const dayId = day.id as keyof typeof restaurant.opening_hours;
          if (restaurant.opening_hours[dayId]) {
            formattedOpeningHours[dayId] = restaurant.opening_hours[dayId] || { open: "", close: "" };
          }
        });
      }
      
      form.reset({
        name: restaurant.name,
        short_description: restaurant.short_description,
        description: restaurant.description,
        address: restaurant.address,
        location: restaurant.location,
        image_url: restaurant.image_url,
        cuisine_type: restaurant.cuisine_type,
        price_range: restaurant.price_range,
        is_featured: restaurant.is_featured,
        is_active: restaurant.is_active,
        payment_methods_string: arrayToString(restaurant.payment_methods),
        reservation_policy: restaurant.reservation_policy || "",
        gallery_images_string: arrayToString(restaurant.gallery_images),
        opening_hours: formattedOpeningHours
      });
    }
  }, [restaurant, form]);
  
  const onSubmit = (values: FormValues) => {
    // Convert string fields to arrays for API
    const restaurantData = {
      ...values,
      payment_methods: values.payment_methods_string 
        ? stringToArray(values.payment_methods_string) 
        : [],
      gallery_images: values.gallery_images_string 
        ? stringToArray(values.gallery_images_string) 
        : [],
    };
    
    // Remove string fields that were converted
    delete (restaurantData as any).payment_methods_string;
    delete (restaurantData as any).gallery_images_string;
    
    if (restaurant) {
      // Update existing restaurant
      updateRestaurant({ 
        id: restaurant.id, 
        restaurant: restaurantData as Partial<Restaurant>
      });
    } else {
      // Create new restaurant
      createRestaurant(restaurantData);
    }
    
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {restaurant ? 'Editar Restaurante' : 'Adicionar Novo Restaurante'}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="informacoes">Informações</TabsTrigger>
                <TabsTrigger value="localizacao">Localização</TabsTrigger>
                <TabsTrigger value="horarios">Horários</TabsTrigger>
                <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
              </TabsList>
              
              {/* Tab: Informações Básicas */}
              <TabsContent value="informacoes" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome do Restaurante</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite o nome do restaurante" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="cuisine_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Cozinha</FormLabel>
                        <FormControl>
                          <Select 
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo de cozinha" />
                            </SelectTrigger>
                            <SelectContent>
                              {cuisineTypeOptions.map(cuisine => (
                                <SelectItem key={cuisine} value={cuisine}>
                                  {cuisine}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="price_range"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Faixa de Preço</FormLabel>
                        <FormControl>
                          <Select 
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a faixa de preço" />
                            </SelectTrigger>
                            <SelectContent>
                              {priceRangeOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="short_description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrição Curta</FormLabel>
                          <FormControl>
                            <Input placeholder="Uma breve descrição do restaurante" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrição Completa</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Descrição detalhada do restaurante" 
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="payment_methods_string"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Métodos de Pagamento</FormLabel>
                          <FormControl>
                            <TagInput
                              placeholder="Adicione métodos de pagamento e pressione Enter (ex: Dinheiro, Cartão, PIX)"
                              value={field.value || ""}
                              onChange={field.onChange}
                              tags={field.value ? stringToArray(field.value) : []}
                              onTagsChange={(tags) => field.onChange(tags.join(','))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>
              
              {/* Tab: Localização */}
              <TabsContent value="localizacao" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Endereço Completo</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Endereço completo do restaurante" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Região/Bairro</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Ex: Centro, Zona Sul, etc."
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>
              
              {/* Tab: Horários */}
              <TabsContent value="horarios" className="space-y-6">
                <div className="space-y-4">
                  {weekdays.map(day => (
                    <div key={day.id} className="grid grid-cols-2 gap-4 items-center py-2 border-b">
                      <div className="font-medium">{day.label}</div>
                      <div className="grid grid-cols-2 gap-2">
                        <FormField
                          control={form.control}
                          name={`opening_hours.${day.id}.open`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">Abertura</FormLabel>
                              <FormControl>
                                <Input 
                                  type="time"
                                  {...field}
                                  value={field.value || ""}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`opening_hours.${day.id}.close`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">Fechamento</FormLabel>
                              <FormControl>
                                <Input 
                                  type="time"
                                  {...field}
                                  value={field.value || ""}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              {/* Tab: Configurações */}
              <TabsContent value="configuracoes" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="image_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Imagem Principal</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="URL da imagem principal"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                          {field.value && isValidUrl(field.value) && (
                            <div className="mt-2 border rounded-md overflow-hidden h-40">
                              <img 
                                src={field.value} 
                                alt="Imagem principal"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="gallery_images_string"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Galeria de Imagens</FormLabel>
                          <FormControl>
                            <TagInput
                              placeholder="Adicione URLs de imagens e pressione Enter"
                              value={field.value || ""}
                              onChange={field.onChange}
                              tags={field.value ? stringToArray(field.value) : []}
                              onTagsChange={(tags) => field.onChange(tags.join(','))}
                            />
                          </FormControl>
                          <FormMessage />
                          {field.value && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {stringToArray(field.value).map((url, index) => (
                                isValidUrl(url) && (
                                  <div key={index} className="h-16 w-16 rounded-md overflow-hidden">
                                    <img 
                                      src={url} 
                                      alt={`Galeria ${index + 1}`}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                )
                              ))}
                            </div>
                          )}
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="reservation_policy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Política de Reservas</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Descrição das políticas de reserva"
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
                        name="is_active"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Ativo</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="is_featured"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Destaque</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter className="mt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {restaurant ? 'Salvar Alterações' : 'Criar Restaurante'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RestaurantFormDialog;
