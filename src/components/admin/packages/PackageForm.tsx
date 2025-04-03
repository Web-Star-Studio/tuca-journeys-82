
import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { usePackageDetail, usePackages } from "@/hooks/use-packages";
import { Package } from "@/data/types/packageTypes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
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
import SafeImage from "@/components/ui/safe-image";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPackagesByCategory } from "@/data/packages";

// Define the form schema with zod
const packageFormSchema = z.object({
  title: z.string().min(5, { message: "O título deve ter pelo menos 5 caracteres" }),
  description: z.string().min(20, { message: "A descrição deve ter pelo menos 20 caracteres" }),
  image: z.string().url({ message: "Informe uma URL de imagem válida" }),
  price: z.coerce.number().positive({ message: "O preço deve ser um valor positivo" }),
  days: z.coerce.number().int().positive({ message: "A duração deve ser um número inteiro positivo" }),
  persons: z.coerce.number().int().positive({ message: "O número de pessoas deve ser um número inteiro positivo" }),
  rating: z.coerce.number().min(0).max(5, { message: "A avaliação deve estar entre 0 e 5" }),
  category: z.string(),
  highlights: z.array(z.string()).optional(),
  includes: z.array(z.string()).optional(),
  excludes: z.array(z.string()).optional(),
  itinerary: z
    .array(
      z.object({
        day: z.coerce.number().int().positive(),
        title: z.string().min(3),
        description: z.string().min(10),
      })
    )
    .optional(),
  dates: z.array(z.string()).optional(),
});

type PackageFormValues = z.infer<typeof packageFormSchema>;

interface PackageFormProps {
  packageId: number | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export const PackageForm = ({
  packageId,
  onCancel,
  onSuccess,
}: PackageFormProps) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const { data: packageData, isLoading: isLoadingPackage } = usePackageDetail(
    packageId || 0
  );
  
  const { 
    createPackage, 
    updatePackage
  } = usePackages();

  // Define the form
  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageFormSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      price: 0,
      days: 1,
      persons: 1,
      rating: 4.5,
      category: "romantic",
      highlights: [""],
      includes: [""],
      excludes: [""],
      itinerary: [{ day: 1, title: "", description: "" }],
      dates: [""],
    },
  });

  // Setup field arrays for the lists
  const highlightsArray = useFieldArray({
    control: form.control,
    name: "highlights",
  });

  const includesArray = useFieldArray({
    control: form.control,
    name: "includes",
  });

  const excludesArray = useFieldArray({
    control: form.control,
    name: "excludes",
  });

  const itineraryArray = useFieldArray({
    control: form.control,
    name: "itinerary",
  });

  const datesArray = useFieldArray({
    control: form.control,
    name: "dates",
  });

  // Load package data when editing
  useEffect(() => {
    if (packageData) {
      // Determine category based on package ID patterns
      let category = "romantic";
      if (packageData.id >= 1 && packageData.id <= 2 || packageData.id === 6) {
        category = "romantic";
      } else if (packageData.id >= 3 && packageData.id <= 4) {
        category = "adventure";
      } else if (packageData.id === 5) {
        category = "family";
      } else if (packageData.id === 4) {
        category = "premium";
      } else {
        category = "budget";
      }

      // Set form values
      form.reset({
        title: packageData.title,
        description: packageData.description,
        image: packageData.image,
        price: packageData.price,
        days: packageData.days,
        persons: packageData.persons,
        rating: packageData.rating,
        category,
        highlights: packageData.highlights || [""],
        includes: packageData.includes || [""],
        excludes: packageData.excludes || [""],
        itinerary: packageData.itinerary || [{ day: 1, title: "", description: "" }],
        dates: packageData.dates || [""],
      });

      setPreviewUrl(packageData.image);
    }
  }, [packageData, form]);

  // Update image preview when URL changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "image") {
        setPreviewUrl(value.image as string);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  // Form submission
  const onSubmit = (data: PackageFormValues) => {
    if (packageId) {
      // Update existing package
      updatePackage.mutate(
        {
          id: packageId,
          ...data,
        } as Package,
        {
          onSuccess: onSuccess,
        }
      );
    } else {
      // Create new package
      createPackage.mutate(data as Omit<Package, "id">, {
        onSuccess: onSuccess,
      });
    }
  };

  // Check if the form is being submitted
  const isSubmitting = createPackage.isPending || updatePackage.isPending;

  if (packageId && isLoadingPackage) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-tuca-ocean-blue" />
        <span className="ml-2">Carregando informações do pacote...</span>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="basic" className="flex-1">
              Informações Básicas
            </TabsTrigger>
            <TabsTrigger value="highlights" className="flex-1">
              Destaques
            </TabsTrigger>
            <TabsTrigger value="details" className="flex-1">
              Detalhes
            </TabsTrigger>
            <TabsTrigger value="itinerary" className="flex-1">
              Itinerário
            </TabsTrigger>
          </TabsList>

          {/* Basic Information Tab */}
          <TabsContent value="basic" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título do Pacote</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Escapada Romântica" />
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
                          {...field}
                          placeholder="Descreva o pacote de viagem"
                          rows={4}
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
                          <Input
                            {...field}
                            type="number"
                            placeholder="0.00"
                            step="0.01"
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
                            {...field}
                            type="number"
                            placeholder="4.5"
                            step="0.1"
                            min="0"
                            max="5"
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
                        <FormLabel>Duração (dias)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="3"
                            min="1"
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
                            {...field}
                            type="number"
                            placeholder="2"
                            min="1"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="romantic">Romântico</SelectItem>
                          <SelectItem value="adventure">Aventura</SelectItem>
                          <SelectItem value="family">Família</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                          <SelectItem value="budget">Econômico</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL da Imagem</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://example.com/image.jpg" />
                      </FormControl>
                      <FormDescription>
                        Informe a URL da imagem principal do pacote
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mt-4 border rounded-md overflow-hidden bg-gray-50 aspect-video flex items-center justify-center">
                  {previewUrl ? (
                    <SafeImage
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      fallbackSrc="/placeholder.svg"
                    />
                  ) : (
                    <div className="text-gray-400 text-center p-4">
                      <p>Pré-visualização da imagem</p>
                      <p className="text-sm">Informe uma URL válida para ver a imagem aqui</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Highlights Tab */}
          <TabsContent value="highlights" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Destaques do Pacote</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => highlightsArray.append("")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Destaque
                </Button>
              </div>
              
              <div className="space-y-3">
                {highlightsArray.fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name={`highlights.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1 mb-0">
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Destaque do pacote"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => highlightsArray.remove(index)}
                      disabled={highlightsArray.fields.length <= 1}
                      className="h-10 w-10 text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Datas Disponíveis</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => datesArray.append("")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Data
                </Button>
              </div>
              
              <div className="space-y-3">
                {datesArray.fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name={`dates.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1 mb-0">
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="01/06/2023 - 05/06/2023"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => datesArray.remove(index)}
                      disabled={datesArray.fields.length <= 1}
                      className="h-10 w-10 text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-6 pt-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">O que Inclui</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => includesArray.append("")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Item
                </Button>
              </div>
              
              <div className="space-y-3">
                {includesArray.fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name={`includes.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1 mb-0">
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Item incluído no pacote"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => includesArray.remove(index)}
                      disabled={includesArray.fields.length <= 1}
                      className="h-10 w-10 text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">O que Não Inclui</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => excludesArray.append("")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Item
                </Button>
              </div>
              
              <div className="space-y-3">
                {excludesArray.fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name={`excludes.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1 mb-0">
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Item não incluído no pacote"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => excludesArray.remove(index)}
                      disabled={excludesArray.fields.length <= 1}
                      className="h-10 w-10 text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Itinerary Tab */}
          <TabsContent value="itinerary" className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Itinerário</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const nextDay = itineraryArray.fields.length + 1;
                  itineraryArray.append({
                    day: nextDay,
                    title: "",
                    description: "",
                  });
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Dia
              </Button>
            </div>

            <div className="space-y-6">
              {itineraryArray.fields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-md bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Dia {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => itineraryArray.remove(index)}
                      disabled={itineraryArray.fields.length <= 1}
                      className="text-red-500 h-8"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remover
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name={`itinerary.${index}.day`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dia</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              min="1"
                              onChange={(e) => {
                                const value = parseInt(e.target.value);
                                field.onChange(value || 1);
                              }}
                            />
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
                          <FormLabel>Título do Dia</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Chegada a Fernando de Noronha"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`itinerary.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrição das Atividades</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Descreva as atividades do dia"
                              rows={3}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {packageId ? "Salvando..." : "Criando..."}
              </>
            ) : (
              <>{packageId ? "Salvar Alterações" : "Criar Pacote"}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
