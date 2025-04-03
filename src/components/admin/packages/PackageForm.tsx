
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PlusCircle, Trash2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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
import { getPackageById } from "@/data/packages";
import { Package } from "@/data/types/packageTypes";
import { DialogFooter } from "@/components/ui/dialog";

// Define the form schema with Zod for validation
const packageFormSchema = z.object({
  title: z.string().min(3, { message: "O título deve ter pelo menos 3 caracteres" }),
  description: z.string().min(10, { message: "A descrição deve ter pelo menos 10 caracteres" }),
  image: z.string().url({ message: "URL da imagem inválida" }),
  price: z.coerce.number().positive({ message: "O preço deve ser um valor positivo" }),
  days: z.coerce.number().int().positive({ message: "Os dias devem ser um número positivo" }),
  persons: z.coerce.number().int().positive({ message: "As pessoas devem ser um número positivo" }),
  rating: z.coerce.number().min(0).max(5, { message: "A avaliação deve estar entre 0 e 5" }),
  highlights: z.array(z.string()).optional(),
  includes: z.array(z.string()).optional(),
  excludes: z.array(z.string()).optional(),
  itinerary: z.array(
    z.object({
      day: z.number(),
      title: z.string(),
      description: z.string(),
    })
  ).optional(),
  dates: z.array(z.string()).optional(),
});

type PackageFormValues = z.infer<typeof packageFormSchema>;

interface PackageFormProps {
  packageId: number | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export function PackageForm({ packageId, onCancel, onSuccess }: PackageFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Define form default values
  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageFormSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      price: 0,
      days: 1,
      persons: 1,
      rating: 0,
      highlights: [],
      includes: [],
      excludes: [],
      itinerary: [],
      dates: [],
    }
  });

  // Load existing package data if editing
  useEffect(() => {
    if (packageId) {
      const existingPackage = getPackageById(packageId);
      
      if (existingPackage) {
        form.reset({
          title: existingPackage.title,
          description: existingPackage.description,
          image: existingPackage.image,
          price: existingPackage.price,
          days: existingPackage.days,
          persons: existingPackage.persons,
          rating: existingPackage.rating,
          highlights: existingPackage.highlights || [],
          includes: existingPackage.includes || [],
          excludes: existingPackage.excludes || [],
          itinerary: existingPackage.itinerary || [],
          dates: existingPackage.dates || [],
        });
      }
    }
  }, [packageId, form]);

  // Form submission handler
  const onSubmit = (data: PackageFormValues) => {
    setLoading(true);

    try {
      // Here we would call an API to save the package data
      console.log("Package data:", data);
      
      // Simulating API call with timeout
      setTimeout(() => {
        toast({
          title: packageId ? "Pacote atualizado" : "Pacote criado",
          description: packageId 
            ? "O pacote foi atualizado com sucesso." 
            : "O novo pacote foi criado com sucesso.",
        });
        
        setLoading(false);
        onSuccess();
      }, 800);
    } catch (error) {
      console.error("Error saving package:", error);
      
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar o pacote. Tente novamente.",
        variant: "destructive",
      });
      
      setLoading(false);
    }
  };

  // Helper functions for array fields
  const addArrayItem = (fieldName: "highlights" | "includes" | "excludes" | "dates") => {
    const currentValues = form.getValues(fieldName) || [];
    form.setValue(fieldName, [...currentValues, ""]);
  };

  const removeArrayItem = (fieldName: "highlights" | "includes" | "excludes" | "dates", index: number) => {
    const currentValues = form.getValues(fieldName) || [];
    form.setValue(
      fieldName,
      currentValues.filter((_, i) => i !== index)
    );
  };

  const addItineraryItem = () => {
    const currentValues = form.getValues("itinerary") || [];
    const nextDay = currentValues.length > 0 
      ? Math.max(...currentValues.map(item => item.day)) + 1 
      : 1;
    
    form.setValue("itinerary", [
      ...currentValues,
      { day: nextDay, title: "", description: "" }
    ]);
  };

  const removeItineraryItem = (index: number) => {
    const currentValues = form.getValues("itinerary") || [];
    form.setValue(
      "itinerary",
      currentValues.filter((_, i) => i !== index)
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Título do pacote" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Imagem</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="URL da imagem do pacote" />
                  </FormControl>
                  <FormDescription>
                    URL da imagem principal do pacote
                  </FormDescription>
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
                      <Input 
                        type="number" 
                        {...field} 
                        placeholder="Preço do pacote" 
                      />
                    </FormControl>
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
                        {...field} 
                        placeholder="Avaliação" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="days"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dias</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        placeholder="Número de dias" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="persons"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pessoas</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        placeholder="Número de pessoas" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Descrição detalhada do pacote" 
                      rows={10}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Array Fields - Highlights, Includes, Excludes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Highlights */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-700">Destaques</h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => addArrayItem("highlights")}
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Adicionar
              </Button>
            </div>
            {form.watch("highlights")?.map((_, index) => (
              <div key={index} className="flex items-center mb-2">
                <FormField
                  control={form.control}
                  name={`highlights.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input {...field} placeholder="Destaque do pacote" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="ml-2"
                  onClick={() => removeArrayItem("highlights", index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Includes */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-700">Inclui</h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => addArrayItem("includes")}
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Adicionar
              </Button>
            </div>
            {form.watch("includes")?.map((_, index) => (
              <div key={index} className="flex items-center mb-2">
                <FormField
                  control={form.control}
                  name={`includes.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input {...field} placeholder="Item incluído" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="ml-2"
                  onClick={() => removeArrayItem("includes", index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Excludes */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-700">Não Inclui</h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => addArrayItem("excludes")}
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Adicionar
              </Button>
            </div>
            {form.watch("excludes")?.map((_, index) => (
              <div key={index} className="flex items-center mb-2">
                <FormField
                  control={form.control}
                  name={`excludes.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input {...field} placeholder="Item não incluído" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="ml-2"
                  onClick={() => removeArrayItem("excludes", index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Itinerary */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700">Itinerário</h3>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={addItineraryItem}
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              Adicionar Dia
            </Button>
          </div>
          {form.watch("itinerary")?.map((_, index) => (
            <div key={index} className="border p-4 rounded-md mb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Dia {form.watch(`itinerary.${index}.day`)}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => removeItineraryItem(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`itinerary.${index}.day`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dia</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`itinerary.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Título do dia" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`itinerary.${index}.description`}
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Descrição do dia" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Available Dates */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700">Datas Disponíveis</h3>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => addArrayItem("dates")}
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              Adicionar Data
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {form.watch("dates")?.map((_, index) => (
              <div key={index} className="flex items-center">
                <FormField
                  control={form.control}
                  name={`dates.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input {...field} placeholder="Ex: 01/01/2023 - 10/01/2023" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="ml-2"
                  onClick={() => removeArrayItem("dates", index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Salvando..." : packageId ? "Atualizar Pacote" : "Criar Pacote"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
