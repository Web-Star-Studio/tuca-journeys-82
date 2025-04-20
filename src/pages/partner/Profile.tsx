
import React, { useState } from "react";
import PartnerLayout from "@/components/partner/PartnerLayout";
import { useCurrentPartner } from "@/hooks/use-partner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Smile, AlertTriangle } from "lucide-react";
import BusinessInfoForm from "@/components/partner/profile/BusinessInfoForm";
import BusinessInfoDisplay from "@/components/partner/profile/BusinessInfoDisplay";
import TeamTab from "@/components/partner/profile/TeamTab";
import SettingsTab from "@/components/partner/profile/SettingsTab";

const PartnerProfile: React.FC = () => {
  const { data: partner } = useCurrentPartner();
  const [isEditing, setIsEditing] = useState(false);
  
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
                  <BusinessInfoForm 
                    formData={formData}
                    onSubmit={handleSubmit}
                    onChange={handleChange}
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
