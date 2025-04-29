
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/use-profile";
import { tours } from "@/data/tours";
import { accommodations } from "@/data/accommodations";
import { getPackageById } from "@/data/packages";
import { v4 as uuidv4 } from "uuid";

// Define the form schema
const bookingFormSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(10, { message: "Telefone deve ter pelo menos 10 dígitos" }),
  tourId: z.string().optional(),
  accommodationId: z.string().optional(),
  packageId: z.string().optional(),
  checkInDate: z.date({ required_error: "Data de check-in é obrigatória" }),
  checkOutDate: z.date({ required_error: "Data de check-out é obrigatória" }),
  guests: z.string().min(1, { message: "Número de hóspedes é obrigatório" }),
  specialRequests: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "Você deve aceitar os termos e condições",
  }),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

interface BookingFormProps {
  selectedPackageId?: number | null;
}

const BookingForm = ({ selectedPackageId }: BookingFormProps) => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Initialize form with default values
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      tourId: undefined,
      accommodationId: undefined,
      packageId: selectedPackageId ? selectedPackageId.toString() : undefined,
      checkInDate: new Date(),
      checkOutDate: new Date(new Date().setDate(new Date().getDate() + 5)),
      guests: "2",
      specialRequests: "",
      termsAccepted: false,
    },
  });

  // Update form values when profile is loaded
  useEffect(() => {
    if (profile) {
      form.setValue("name", profile.name || "");
      form.setValue("email", profile.email || "");
      form.setValue("phone", profile.phone || "");
    }
  }, [profile, form]);

  // Load package data when selectedPackageId changes
  useEffect(() => {
    if (selectedPackageId) {
      const packageData = getPackageById(selectedPackageId);
      setSelectedPackage(packageData);
      
      if (packageData) {
        // Update form with package details
        form.setValue("packageId", selectedPackageId.toString());
        if (packageData.persons) {
          form.setValue("guests", packageData.persons.toString());
        }
      }
    }
  }, [selectedPackageId, form]);

  // Function to handle form submission
  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Here we would typically send the data to a backend API
      console.log("Booking form data:", data);
      
      // Create mock booking for demonstration
      const bookingId = uuidv4().substring(0, 8).toUpperCase();
      const bookingData = {
        bookingId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        accommodationType: selectedPackage ? "Pacote" : 
                          data.accommodationId && data.accommodationId !== "none" ? "Hospedagem" : 
                          data.tourId && data.tourId !== "none" ? "Passeio" : "Não especificado",
        checkIn: data.checkInDate,
        checkOut: data.checkOutDate,
        guests: data.guests,
        notes: data.specialRequests,
        packageDetails: selectedPackage,
      };
      
      // Show success toast
      toast({
        title: "Reserva iniciada",
        description: "Sua solicitação de reserva foi enviada com sucesso!",
      });
      
      // Simulate API call delay
      setTimeout(() => {
        // Redirect to booking confirmation page with booking data
        navigate("/reserva-confirmada", { state: { booking: bookingData } });
      }, 1500);
    } catch (error) {
      console.error("Error submitting booking form:", error);
      toast({
        title: "Erro ao enviar reserva",
        description: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-sm">
      <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-tuca-deep-blue">
        {selectedPackage ? `Reservar ${selectedPackage.title}` : "Solicitar Reserva"}
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Informações Pessoais</h3>
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="(xx) xxxxx-xxxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Booking Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Detalhes da Reserva</h3>
              
              {!selectedPackageId && (
                <>
                  <FormField
                    control={form.control}
                    name="tourId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Passeio (opcional)</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um passeio" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="none">Nenhum passeio</SelectItem>
                            {tours.map((tour) => (
                              <SelectItem key={tour.id} value={tour.id.toString()}>
                                {tour.title}
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
                    name="accommodationId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hospedagem (opcional)</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma hospedagem" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="none">Nenhuma hospedagem</SelectItem>
                            {accommodations.map((accommodation) => (
                              <SelectItem key={accommodation.id} value={accommodation.id.toString()}>
                                {accommodation.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              
              {selectedPackage && (
                <div className="bg-blue-50 p-4 rounded-md mb-4">
                  <p className="font-medium">Pacote selecionado: {selectedPackage.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedPackage.short_description}
                  </p>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="checkInDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Check-in</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`w-full pl-3 text-left font-normal ${
                                !field.value ? "text-muted-foreground" : ""
                              }`}
                            >
                              {field.value ? (
                                format(field.value, "PPP", { locale: ptBR })
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
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="checkOutDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Check-out</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`w-full pl-3 text-left font-normal ${
                                !field.value ? "text-muted-foreground" : ""
                              }`}
                            >
                              {field.value ? (
                                format(field.value, "PPP", { locale: ptBR })
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
                            disabled={(date) => {
                              const checkIn = form.getValues("checkInDate");
                              return date < checkIn || date < new Date();
                            }}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="guests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de Hóspedes</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o número de hóspedes" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(
                          (num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? "pessoa" : "pessoas"}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <FormField
            control={form.control}
            name="specialRequests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Solicitações Especiais</FormLabel>
                <FormControl>
                  <textarea
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Informe qualquer solicitação especial para sua estadia..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Eu concordo com os{" "}
                    <a
                      href="#"
                      className="text-tuca-ocean-blue hover:underline"
                    >
                      termos e condições
                    </a>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          
          <Button
            type="submit"
            className="w-full bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90 py-6 text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : `Enviar Solicitação de Reserva${selectedPackage ? ' do Pacote' : ''}`}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BookingForm;
