import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCreatePartner } from '@/hooks/use-partner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const partnerFormSchema = z.object({
  business_name: z.string().min(3, "Nome do negócio deve ter pelo menos 3 caracteres"),
  business_type: z.enum(['accommodation', 'tour', 'vehicle', 'event', 'product', 'restaurant', 'service']),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  contact_email: z.string().email("Email inválido").optional(),
  contact_phone: z.string().optional(),
  website: z.string().url("URL inválida").optional(),
  address: z.string().optional(),
});

type PartnerFormValues = z.infer<typeof partnerFormSchema>;

const PartnerRegister = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const createPartner = useCreatePartner();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerFormSchema),
    defaultValues: {
      business_name: '',
      business_type: 'accommodation',
      description: '',
      contact_email: user?.email || '',
      contact_phone: '',
      website: '',
      address: '',
    },
  });

  const onSubmit = async (data: PartnerFormValues) => {
    if (!user) {
      toast.error("Você precisa estar logado para se cadastrar como parceiro");
      return;
    }

    setIsSubmitting(true);
    try {
      await createPartner.mutateAsync({
        business_name: data.business_name,
        business_type: data.business_type,
        description: data.description,
        contact_email: data.contact_email,
        contact_phone: data.contact_phone,
        website: data.website,
        address: data.address,
        is_verified: false,
        is_active: true
      });
      
      toast.success("Cadastro de parceiro realizado com sucesso!");
      navigate('/parceiro/dashboard');
    } catch (error) {
      console.error("Error creating partner:", error);
      toast.error("Erro ao criar perfil de parceiro. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold mb-8 text-center">Torne-se um Parceiro</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Cadastro de Parceiro</CardTitle>
              <CardDescription>
                Preencha as informações abaixo para se cadastrar como parceiro da plataforma Tuca Noronha.
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="business_name">Nome do Negócio *</Label>
                  <Input
                    id="business_name"
                    {...form.register("business_name")}
                    placeholder="Nome da sua empresa ou estabelecimento"
                  />
                  {form.formState.errors.business_name && (
                    <p className="text-sm text-red-500">{form.formState.errors.business_name.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="business_type">Tipo de Negócio *</Label>
                  <Select
                    defaultValue={form.getValues("business_type")}
                    onValueChange={(value) => form.setValue("business_type", value as any)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de negócio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="accommodation">Hospedagem</SelectItem>
                      <SelectItem value="tour">Passeio/Tour</SelectItem>
                      <SelectItem value="vehicle">Veículo/Transporte</SelectItem>
                      <SelectItem value="event">Evento</SelectItem>
                      <SelectItem value="product">Produto</SelectItem>
                      <SelectItem value="restaurant">Restaurante</SelectItem>
                      <SelectItem value="service">Serviço</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.business_type && (
                    <p className="text-sm text-red-500">{form.formState.errors.business_type.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição do Negócio *</Label>
                  <Textarea
                    id="description"
                    {...form.register("description")}
                    placeholder="Descreva seu negócio, produtos ou serviços"
                    rows={4}
                  />
                  {form.formState.errors.description && (
                    <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact_email">Email de Contato</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    {...form.register("contact_email")}
                    placeholder="Email para clientes entrarem em contato"
                  />
                  {form.formState.errors.contact_email && (
                    <p className="text-sm text-red-500">{form.formState.errors.contact_email.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact_phone">Telefone de Contato</Label>
                  <Input
                    id="contact_phone"
                    {...form.register("contact_phone")}
                    placeholder="Telefone para clientes entrarem em contato"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    {...form.register("website")}
                    placeholder="https://www.seusite.com.br"
                  />
                  {form.formState.errors.website && (
                    <p className="text-sm text-red-500">{form.formState.errors.website.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    {...form.register("address")}
                    placeholder="Endereço do seu estabelecimento"
                  />
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => navigate(-1)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Cadastrar como Parceiro"}
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-medium mb-2">Vantagens de ser um parceiro</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-2">✓</span>
                <span>Aumente sua visibilidade para turistas em Fernando de Noronha</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-2">✓</span>
                <span>Gerencie reservas e disponibilidade em uma plataforma integrada</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-2">✓</span>
                <span>Crie cupons de desconto exclusivos para atrair mais clientes</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-2">✓</span>
                <span>Acesse estatísticas e relatórios sobre seu desempenho</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PartnerRegister;
