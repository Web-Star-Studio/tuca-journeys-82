import React, { useState } from "react";
import PartnerLayout from "@/components/partner/PartnerLayout";
import { useCurrentPartner } from "@/hooks/use-partner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Upload, Mail, MapPin, Phone, Globe, Building, Smile, AlertTriangle } from "lucide-react";

const PartnerProfile: React.FC = () => {
  const { data: partner } = useCurrentPartner();
  const [isEditing, setIsEditing] = useState(false);
  
  // Form data state would be initialized with partner data in a real implementation
  const [formData, setFormData] = useState({
    business_name: partner?.business_name || "",
    description: partner?.description || "",
    contact_email: partner?.contact_email || "",
    contact_phone: partner?.contact_phone || "",
    website: partner?.website || "",
    address: partner?.address || ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would update the partner data using the API
    // For now, just toggle editing mode off
    setIsEditing(false);
  };

  const getPartnerTypeLabel = () => {
    switch (partner?.business_type) {
      case "accommodation": return "Hospedagem";
      case "tour": return "Passeio";
      case "vehicle": return "Aluguel de Veículos";
      case "event": return "Organizador de Eventos";
      case "product": return "Produtos";
      case "restaurant": return "Restaurante";
      case "service": return "Serviço";
      default: return "Parceiro";
    }
  };

  return (
    <PartnerLayout pageTitle="Meu Perfil">
      <div className="grid gap-6">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="team">Equipe</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Informações do Negócio</CardTitle>
                  <div className="flex items-center gap-2">
                    {partner?.is_verified ? (
                      <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">
                        <Smile className="w-3 h-3 mr-1" /> Verificado
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-amber-600 bg-amber-50 border-amber-200">
                        <AlertTriangle className="w-3 h-3 mr-1" /> Aguardando verificação
                      </Badge>
                    )}
                    {!isEditing && (
                      <Button onClick={() => setIsEditing(true)}>Editar</Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="business_name">Nome do Negócio</Label>
                      <Input 
                        id="business_name" 
                        name="business_name" 
                        value={formData.business_name} 
                        onChange={handleChange} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea 
                        id="description" 
                        name="description" 
                        value={formData.description} 
                        onChange={handleChange}
                        rows={4}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contact_email">Email de Contato</Label>
                        <Input 
                          id="contact_email" 
                          name="contact_email" 
                          value={formData.contact_email} 
                          onChange={handleChange}
                          type="email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact_phone">Telefone</Label>
                        <Input 
                          id="contact_phone" 
                          name="contact_phone" 
                          value={formData.contact_phone} 
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input 
                        id="website" 
                        name="website" 
                        value={formData.website} 
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Endereço</Label>
                      <Input 
                        id="address" 
                        name="address" 
                        value={formData.address} 
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>Cancelar</Button>
                      <Button type="submit">Salvar</Button>
                    </div>
                  </form>
                ) : (
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-1 flex flex-col items-center">
                      <div className="relative mb-4">
                        <Avatar className="h-32 w-32">
                          <AvatarImage src={partner?.logo_url || ""} alt={partner?.business_name} />
                          <AvatarFallback className="text-3xl">
                            {partner?.business_name?.[0] || "P"}
                          </AvatarFallback>
                        </Avatar>
                        <Button size="icon" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                      <Badge className="mb-2">{getPartnerTypeLabel()}</Badge>
                    </div>
                    
                    <div className="md:col-span-2 space-y-4">
                      <h3 className="text-xl font-semibold">{partner?.business_name || "Seu Negócio"}</h3>
                      <p className="text-gray-600">
                        {partner?.description || "Adicione uma descrição do seu negócio para que os clientes saibam mais sobre você."}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-3">Informações de Contato</h4>
                          <div className="space-y-2">
                            <div className="flex">
                              <Mail className="h-5 w-5 mr-2 text-gray-400" />
                              <span>{partner?.contact_email || "Não informado"}</span>
                            </div>
                            <div className="flex">
                              <Phone className="h-5 w-5 mr-2 text-gray-400" />
                              <span>{partner?.contact_phone || "Não informado"}</span>
                            </div>
                            <div className="flex">
                              <Globe className="h-5 w-5 mr-2 text-gray-400" />
                              <span>{partner?.website || "Não informado"}</span>
                            </div>
                            <div className="flex">
                              <Building className="h-5 w-5 mr-2 text-gray-400" />
                              <span>{partner?.address || "Não informado"}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-3">Status da Conta</h4>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Badge variant={partner?.is_verified ? "default" : "outline"}>
                                {partner?.is_verified ? "Verificado" : "Aguardando Verificação"}
                              </Badge>
                            </div>
                            <div className="flex items-center">
                              <Badge variant={partner?.is_active ? "default" : "destructive"}>
                                {partner?.is_active ? "Ativo" : "Inativo"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="team" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Membros da Equipe</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">Adicione membros à sua equipe</h3>
                  <p className="text-gray-500 mt-2 mb-4">
                    Equipes permitem que você trabalhe com outros colaboradores em seu negócio.
                  </p>
                  <Button>Adicionar Membro</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações da Conta</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 mb-4">
                  Gerencie as configurações da sua conta de parceiro.
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <div>
                      <h3 className="font-medium">Notificações por Email</h3>
                      <p className="text-sm text-gray-500">Receba atualizações sobre reservas e mensagens</p>
                    </div>
                    <Button variant="outline">Configurar</Button>
                  </div>
                  
                  <div className="flex justify-between items-center pb-4 border-b">
                    <div>
                      <h3 className="font-medium">Configurações de Pagamento</h3>
                      <p className="text-sm text-gray-500">Gerencie seus métodos de recebimento</p>
                    </div>
                    <Button variant="outline">Configurar</Button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-red-600">Desativar Conta</h3>
                      <p className="text-sm text-gray-500">Suspenda temporariamente sua conta de parceiro</p>
                    </div>
                    <Button variant="destructive">Desativar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PartnerLayout>
  );
};

export default PartnerProfile;
