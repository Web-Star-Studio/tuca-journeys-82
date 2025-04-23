
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

const preferencesSchema = z.object({
  travelStyle: z.string().min(1, "Selecione um estilo de viagem"),
  preferredActivities: z.array(z.string()).min(1, "Selecione pelo menos uma atividade"),
  accommodationType: z.array(z.string()).min(1, "Selecione pelo menos um tipo de hospedagem"),
  budgetRange: z.string().min(1, "Selecione uma faixa de orçamento"),
  travelFrequency: z.string().min(1, "Selecione uma frequência de viagem"),
});

type PreferencesFormValues = z.infer<typeof preferencesSchema>;

const travelStyles = [
  { id: "adventure", label: "Aventura" },
  { id: "relaxation", label: "Relaxamento" },
  { id: "cultural", label: "Cultural" },
  { id: "nature", label: "Natureza" },
  { id: "gastronomic", label: "Gastronômico" },
];

const activities = [
  { id: "hiking", label: "Trilhas" },
  { id: "diving", label: "Mergulho" },
  { id: "tours", label: "Passeios Guiados" },
  { id: "beach", label: "Praia" },
  { id: "photography", label: "Fotografia" },
  { id: "local_cuisine", label: "Culinária Local" },
  { id: "wildlife", label: "Observação de Fauna" },
];

const accommodationTypes = [
  { id: "hotel", label: "Hotel" },
  { id: "pousada", label: "Pousada" },
  { id: "resort", label: "Resort" },
  { id: "hostel", label: "Hostel" },
  { id: "apartment", label: "Apartamento" },
];

const ProfilePreferencesTab = () => {
  const [isSaving, setIsSaving] = useState(false);
  
  // Get profile and predefined preference values (mock data for now)
  const mockPreferences = {
    travelStyle: "adventure",
    preferredActivities: ["hiking", "diving", "beach"],
    accommodationType: ["pousada", "hotel"],
    budgetRange: "medium",
    travelFrequency: "quarterly",
  };

  const form = useForm<PreferencesFormValues>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: mockPreferences,
  });

  const onSubmit = async (values: PreferencesFormValues) => {
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Preferências salvas com sucesso!");
      console.log("Updated preferences:", values);
    } catch (error) {
      toast.error("Erro ao salvar preferências.");
      console.error("Error saving preferences:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Preferências de Viagem</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="travelStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estilo de Viagem</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione seu estilo preferido de viagem" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {travelStyles.map(style => (
                          <SelectItem key={style.id} value={style.id}>
                            {style.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Este será o foco principal das recomendações de viagem.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferredActivities"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Atividades Preferidas</FormLabel>
                      <FormDescription>
                        Selecione suas atividades favoritas durante viagens.
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {activities.map((activity) => (
                        <FormField
                          key={activity.id}
                          control={form.control}
                          name="preferredActivities"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={activity.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(activity.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, activity.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== activity.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {activity.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accommodationType"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Tipo de Hospedagem</FormLabel>
                      <FormDescription>
                        Selecione os tipos de hospedagem que você prefere.
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {accommodationTypes.map((accommodation) => (
                        <FormField
                          key={accommodation.id}
                          control={form.control}
                          name="accommodationType"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={accommodation.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(accommodation.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, accommodation.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== accommodation.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {accommodation.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="budgetRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Faixa de Orçamento</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione seu orçamento típico" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="economy">Econômico</SelectItem>
                          <SelectItem value="medium">Médio</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                          <SelectItem value="luxury">Luxo</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Isso ajuda a filtrar recomendações por preço.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="travelFrequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frequência de Viagem</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Com que frequência você viaja?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="monthly">Mensalmente</SelectItem>
                          <SelectItem value="quarterly">Trimestralmente</SelectItem>
                          <SelectItem value="biannually">Semestralmente</SelectItem>
                          <SelectItem value="annually">Anualmente</SelectItem>
                          <SelectItem value="rarely">Raramente</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Usamos isso para enviar recomendações oportunas.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full md:w-auto"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Preferências
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePreferencesTab;
