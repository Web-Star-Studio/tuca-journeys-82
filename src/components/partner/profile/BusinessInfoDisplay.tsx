
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Partner } from "@/types/partner";
import { Upload, Mail, MapPin, Phone, Globe, Building, Smile, AlertTriangle } from "lucide-react";

interface BusinessInfoDisplayProps {
  partner: Partner | null | undefined;
  onEdit: () => void;
  getPartnerTypeLabel: () => string;
}

const BusinessInfoDisplay: React.FC<BusinessInfoDisplayProps> = ({
  partner,
  onEdit,
  getPartnerTypeLabel,
}) => {
  return (
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
  );
};

export default BusinessInfoDisplay;
