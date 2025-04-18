
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useCreatePartner } from "@/hooks/use-partner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Loader2 } from "lucide-react";

const partnerFormSchema = z.object({
  business_name: z.string().min(3, {
    message: "Nome do negócio deve ter pelo menos 3 caracteres",
  }),
  business_type: z.enum(['accommodation', 'tour', 'vehicle', 'event', 'product', 'restaurant', 'service'], {
    required_error: "Selecione o tipo de negócio",
  }),
  description: z.string().min(20, {
    message: "Descrição deve ter pelo menos 20 caracteres",
  }),
  contact_email: z.string().email({
    message: "Email inválido",
  }),
  contact_phone: z.string().min(10, {
    message: "Telefone deve ter pelo menos 10 dígitos",
  }),
  address: z.string().min(5, {
    message: "Endereço deve ter pelo menos 5 caracteres",
  }),
  website: z.string().url({
    message: "URL inválida",
  }).optional().or(z.literal('')),
});

type PartnerFormValues = z.infer<typeof partnerFormSchema>;

const PartnerRegister: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const { mutate: createPartner, isPending } = useCreatePartner();

  const form = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerFormSchema),
    defaultValues: {
      business_name: "",
      business_type: undefined,
      description: "",
      contact_email: user?.email || "",
      contact_phone: "",
      address: "",
      website: "",
    },
  });

  React.useEffect(() => {
    if (!authLoading && !user) {
      toast.error("Você precisa estar logado para se cadastrar como parceiro");
      navigate("/login?redirectTo=/parceiro/cadastro");
    }
  }, [user, authLoading, navigate]);

  const onSubmit = (data: PartnerFormValues) => {
    createPartner(data, {
      onSuccess: () => {
        navigate("/parceiro/dashboard");
      },
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-tuca-ocean-blue" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-medium mb-6 text-center">Cadastre-se como Parceiro</h1>
            <p className="text-gray-500 mb-8 text-center">
              Junte-se à Tuca Noronha e expanda seu negócio em Fernando de Noronha.
              Cadastre-se como parceiro para oferecer seus serviços em nossa plataforma.
            </p>

            <Card>
              <CardHeader>
                <CardTitle>Informações do Negócio</CardTitle>
                <CardDescription>
                  Forneça as informações do seu negócio para análise e aprovação.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="business_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome do Negócio</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome do seu negócio" {...field} />
                          </FormControl>
                          <FormDescription>
                            O nome oficial do seu negócio.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="business_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de Negócio</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo de negócio" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="accommodation">Hospedagem</SelectItem>
                              <SelectItem value="tour">Passeio</SelectItem>
                              <SelectItem value="vehicle">Veículo</SelectItem>
                              <SelectItem value="event">Evento</SelectItem>
                              <SelectItem value="product">Produto</SelectItem>
                              <SelectItem value="restaurant">Restaurante</SelectItem>
                              <SelectItem value="service">Serviço</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Selecione o tipo principal do seu negócio.
                          </FormDescription>
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
                              placeholder="Descreva seu negócio"
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Uma descrição detalhada do seu negócio ou serviço.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="contact_email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email de Contato</FormLabel>
                            <FormControl>
                              <Input placeholder="email@exemplo.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contact_phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone de Contato</FormLabel>
                            <FormControl>
                              <Input placeholder="(81) 99999-9999" {...field} />
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
                            <Input placeholder="Endereço do negócio em Fernando de Noronha" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website (opcional)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://www.exemplo.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={isPending}
                      >
                        {isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            Enviar Cadastro
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PartnerRegister;
