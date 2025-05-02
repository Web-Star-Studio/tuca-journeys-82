import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarIcon, X, Plus, Info } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ImageUploader from "@/components/admin/shared/ImageUploader";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/types/event";

// Define the schema for event form
const eventSchema = z.object({
  name: z.string().min(3, { message: "Nome do evento é obrigatório" }),
  description: z.string().min(10, { message: "Descrição mais detalhada é necessária" }),
  short_description: z.string().optional(),
  date: z.date({ required_error: "Data é obrigatória" }),
  start_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Formato inválido. Use HH:MM",
  }),
  end_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Formato inválido. Use HH:MM",
  }),
  location: z.string().min(3, { message: "Local do evento é obrigatório" }),
  price: z.coerce.number().min(0, { message: "Preço não pode ser negativo" }),
  category: z.string().min(1, { message: "Categoria é obrigatória" }),
  image_url: z.string().url({ message: "URL de imagem inválida" }).optional().or(z.literal("")),
  organizer: z.string().min(1, { message: "Organizador é obrigatório" }),
  capacity: z.coerce.number().int().positive({ message: "Capacidade deve ser positiva" }),
  available_spots: z.coerce.number().int().nonnegative({ message: "Vagas disponíveis não pode ser negativo" }),
  featured: z.boolean().optional(),
  policies: z.string().optional(),
  tickets: z.array(z.object({
    name: z.string().min(1, { message: "Nome do ingresso é obrigatório" }),
    price: z.coerce.number().min(0, { message: "Preço não pode ser negativo" }),
    available_quantity: z.coerce.number().int().positive({ message: "Quantidade deve ser positiva" }),
    description: z.string().optional(),
    type: z.string().optional(),
    max_per_order: z.coerce.number().int().positive().optional(),
    benefits: z.array(z.string()).optional(),
  })).optional(),
});

type EventFormValues = z.infer<typeof eventSchema>;

interface EventFormProps {
  event?: Event;
  onSubmit: (data: EventFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const EVENT_CATEGORIES = [
  "Música",
  "Esporte",
  "Cultura",
  "Gastronomia",
  "Tecnologia",
  "Educação",
  "Entretenimento",
  "Turismo"
];

const TICKET_TYPES = [
  "regular",
  "vip",
  "discount",
  "free"
];

const EventForm = ({ event, onSubmit, onCancel, isLoading = false }: EventFormProps) => {
  const [image, setImage] = useState<string>(event?.image_url || "");
  
  const defaultValues: Partial<EventFormValues> = {
    name: event?.name || "",
    description: event?.description || "",
    short_description: event?.description?.substring(0, 150) || "",
    date: event?.date ? new Date(event.date) : new Date(),
    start_time: event?.start_time || "19:00",
    end_time: event?.end_time || "22:00",
    location: event?.location || "",
    price: event?.price || 0,
    image_url: event?.image_url || "",
    category: event?.category || EVENT_CATEGORIES[0],
    organizer: event?.organizer || "Fernando de Noronha Eventos",
    capacity: event?.capacity || 100,
    available_spots: event?.available_spots || 100,
    featured: event?.featured || false,
    policies: event?.policies || "",
    tickets: [],
  };

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues,
  });

  // Setup field array for tickets
  const {
    fields: ticketFields,
    append: appendTicket,
    remove: removeTicket,
  } = useFieldArray({
    control: form.control,
    name: "tickets",
  });

  // Update image URL in form when image changes
  useEffect(() => {
    if (image) {
      form.setValue("image_url", image);
    }
  }, [image, form]);

  useEffect(() => {
    if (event) {
      // Initialize all fields from event
      Object.entries(event).forEach(([key, value]) => {
        if (key in form.getValues() && value !== undefined) {
          // @ts-ignore - Dynamically setting form values
          form.setValue(key, value);
        }
      });
      
      // Set image if available
      if (event.image_url) {
        setImage(event.image_url);
      }

      // Load date correctly
      if (event.date) {
        form.setValue("date", new Date(event.date));
      }
      
      // Handle featured/is_featured property
      if (event.is_featured !== undefined) {
        form.setValue("featured", event.is_featured);
      }
    }
  }, [event, form]);

  const handleFormSubmit = (data: EventFormValues) => {
    // Ensure short_description is set if not provided
    if (!data.short_description && data.description) {
      data.short_description = data.description.substring(0, 150);
    }
    
    onSubmit(data);
  };

  const addEmptyTicket = () => {
    appendTicket({
      name: "",
      price: 0,
      available_quantity: 50,
      description: "",
      type: "regular",
      max_per_order: 4,
      benefits: [],
    });
  };

  const addTicketBenefit = (ticketIndex: number, benefit: string) => {
    const currentBenefits = form.getValues(`tickets.${ticketIndex}.benefits`) || [];
    form.setValue(`tickets.${ticketIndex}.benefits`, [...currentBenefits, benefit]);
  };

  const removeTicketBenefit = (ticketIndex: number, benefitIndex: number) => {
    const currentBenefits = form.getValues(`tickets.${ticketIndex}.benefits`) || [];
    const updatedBenefits = currentBenefits.filter((_, idx) => idx !== benefitIndex);
    form.setValue(`tickets.${ticketIndex}.benefits`, updatedBenefits);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Evento</FormLabel>
                  <FormControl>
                    <Input placeholder="Festival de Verão" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className="pl-3 text-left font-normal"
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="start_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horário Início</FormLabel>
                      <FormControl>
                        <Input placeholder="19:00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="end_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horário Fim</FormLabel>
                      <FormControl>
                        <Input placeholder="22:00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Local</FormLabel>
                  <FormControl>
                    <Input placeholder="Praia do Leão, Fernando de Noronha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço Base</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {EVENT_CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacidade Total</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="available_spots"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vagas Disponíveis</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="organizer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organizador</FormLabel>
                  <FormControl>
                    <Input placeholder="Fernando de Noronha Eventos" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4 rounded border-gray-300 text-tuca-ocean-blue focus:ring-tuca-ocean-blue"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Destacar Evento</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Exibe este evento na página inicial e em áreas destacadas
                    </p>
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagem Principal</FormLabel>
                  <FormControl>
                    <ImageUploader
                      currentImage={image}
                      onImageUploaded={setImage}
                      folder="events"
                    />
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
                      placeholder="Descreva o evento em detalhes..."
                      className="resize-none min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="policies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Políticas do Evento</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva as políticas de cancelamento, reembolso, etc..."
                      className="resize-none min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Tickets Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Tipos de Ingresso</h3>
            <Button 
              type="button" 
              onClick={addEmptyTicket} 
              variant="outline"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Ingresso
            </Button>
          </div>

          {ticketFields.length === 0 ? (
            <div className="text-center p-6 border border-dashed rounded-md bg-muted/50">
              <Info className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                Nenhum tipo de ingresso adicionado. Adicione pelo menos um tipo de ingresso para o evento.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {ticketFields.map((ticketField, index) => (
                <Card key={ticketField.id} className="overflow-hidden">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium">Ingresso #{index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTicket(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`tickets.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                              <Input placeholder="Ingresso VIP" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`tickets.${index}.type`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tipo</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione um tipo" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {TICKET_TYPES.map((type) => (
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
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <FormField
                        control={form.control}
                        name={`tickets.${index}.price`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preço</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`tickets.${index}.available_quantity`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantidade</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="50" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`tickets.${index}.max_per_order`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Máximo por Pedido</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="4" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="mt-4">
                      <FormField
                        control={form.control}
                        name={`tickets.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Descreva os detalhes deste tipo de ingresso"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="mt-4">
                      <FormLabel>Benefícios</FormLabel>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {form.getValues(`tickets.${index}.benefits`)?.map((benefit, benefitIndex) => (
                          <Badge key={benefitIndex} variant="secondary" className="gap-1">
                            {benefit}
                            <button
                              type="button"
                              onClick={() => removeTicketBenefit(index, benefitIndex)}
                              className="text-xs ml-1 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <Input
                          placeholder="Adicionar benefício"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const input = e.currentTarget;
                              if (input.value.trim()) {
                                addTicketBenefit(index, input.value.trim());
                                input.value = '';
                              }
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={(e) => {
                            const input = (e.currentTarget.previousSibling as HTMLInputElement);
                            if (input.value.trim()) {
                              addTicketBenefit(index, input.value.trim());
                              input.value = '';
                            }
                          }}
                        >
                          Adicionar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : event ? "Atualizar Evento" : "Criar Evento"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EventForm;
