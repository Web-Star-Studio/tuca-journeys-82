
import React, { useState } from "react";
import PartnerLayout from "@/components/partner/PartnerLayout";
import { useCurrentPartner } from "@/hooks/use-partner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Smile, AlertTriangle, Loader2 } from "lucide-react";
import BusinessInfoForm from "@/components/partner/profile/BusinessInfoForm";
import BusinessInfoDisplay from "@/components/partner/profile/BusinessInfoDisplay";
import TeamTab from "@/components/partner/profile/TeamTab";
import SettingsTab from "@/components/partner/profile/SettingsTab";
import { PartnerFormData } from "@/utils/validation";
import { toast } from "sonner";

const PartnerProfile: React.FC = () => {
  const { data: partner, isLoading, error } = useCurrentPartner();
  const [isEditing, setIsEditing] = useState(false);
  
  // Create initialData object matching the expected PartnerFormData type
  const initialData: PartnerFormData = {
    business_name: partner?.business_name || "",
    business_type: (partner?.business_type || "accommodation") as PartnerFormData["business_type"],
    description: partner?.description || "",
    contact_email: partner?.contact_email || "",
    contact_phone: partner?.contact_phone || "",
    website: partner?.website || "",
    address: partner?.address || ""
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
  
  const getBusinessTypeSpecificContent = () => {
    if (!partner) return null;
    
    switch (partner.business_type) {
      case "accommodation":
        return (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Informações da Hospedagem</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Adicione informações específicas sobre sua hospedagem, como tipos de quartos disponíveis,
                comodidades, e políticas de check-in/check-out.
              </p>
              <Button variant="outline">Gerenciar Detalhes da Hospedagem</Button>
            </CardContent>
          </Card>
        );
      case "tour":
        return (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Informações dos Passeios</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Gerencie seus passeios, adicione horários disponíveis, pontos de encontro e requisitos específicos.
              </p>
              <Button variant="outline">Gerenciar Passeios</Button>
            </CardContent>
          </Card>
        );
      case "vehicle":
        return (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Informações dos Veículos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Adicione os veículos disponíveis para aluguel, especificações, requisitos e políticas de uso.
              </p>
              <Button variant="outline">Gerenciar Veículos</Button>
            </CardContent>
          </Card>
        );
      case "event":
        return (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Informações dos Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Gerencie seus eventos, capacidade, locais e informações específicas para os participantes.
              </p>
              <Button variant="outline">Gerenciar Eventos</Button>
            </CardContent>
          </Card>
        );
      case "product":
        return (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Informações dos Produtos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Adicione e gerencie seu catálogo de produtos, estoque disponível e informações de envio.
              </p>
              <Button variant="outline">Gerenciar Produtos</Button>
            </CardContent>
          </Card>
        );
      case "restaurant":
        return (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Informações do Restaurante</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Configure seu cardápio, horários de funcionamento e sistema de reservas de mesas.
              </p>
              <Button variant="outline">Gerenciar Restaurante</Button>
            </CardContent>
          </Card>
        );
      case "service":
        return (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Informações dos Serviços</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Adicione os serviços que você oferece, duração estimada e outras informações importantes.
              </p>
              <Button variant="outline">Gerenciar Serviços</Button>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  // Handle loading state
  if (isLoading) {
    return (
      <PartnerLayout pageTitle="Meu Perfil">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-tuca-ocean-blue" />
          <span className="ml-2 text-lg">Carregando seu perfil...</span>
        </div>
      </PartnerLayout>
    );
  }

  // Handle error state
  if (error) {
    toast.error("Erro ao carregar o perfil. Por favor, tente novamente.");
    return (
      <PartnerLayout pageTitle="Meu Perfil">
        <div className="bg-red-50 border border-red-200 p-4 rounded-md">
          <h3 className="text-red-800 font-medium">Não foi possível carregar o perfil</h3>
          <p className="text-red-600 mt-2">
            Ocorreu um erro ao carregar as informações do seu perfil. 
            Por favor, tente novamente ou entre em contato com o suporte.
          </p>
          <Button 
            className="mt-4" 
            variant="outline"
            onClick={() => window.location.reload()}
          >
            Tentar Novamente
          </Button>
        </div>
      </PartnerLayout>
    );
  }

  // Handle no partner data
  if (!partner) {
    return (
      <PartnerLayout pageTitle="Meu Perfil">
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-md">
          <h3 className="text-amber-800 font-medium">Perfil não encontrado</h3>
          <p className="text-amber-600 mt-2">
            Não encontramos seu perfil de parceiro. 
            Por favor, complete o cadastro para continuar.
          </p>
          <Button 
            className="mt-4" 
            onClick={() => window.location.href = "/parceiro/cadastro"}
          >
            Completar Cadastro
          </Button>
        </div>
      </PartnerLayout>
    );
  }

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
                  <BusinessInfoForm 
                    initialData={initialData}
                    onCancel={() => setIsEditing(false)}
                  />
                ) : (
                  <BusinessInfoDisplay 
                    partner={partner}
                    onEdit={() => setIsEditing(true)}
                    getPartnerTypeLabel={getPartnerTypeLabel}
                  />
                )}
              </CardContent>
            </Card>

            {/* Display business-type specific content */}
            {getBusinessTypeSpecificContent()}
          </TabsContent>
          
          <TabsContent value="team" className="mt-6">
            <TeamTab />
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </PartnerLayout>
  );
};

export default PartnerProfile;
