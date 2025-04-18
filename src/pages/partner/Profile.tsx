
import React from "react";
import PartnerLayout from "@/components/partner/PartnerLayout";
import { useCurrentPartner } from "@/hooks/use-partner";

const PartnerProfile: React.FC = () => {
  const { data: partner } = useCurrentPartner();

  return (
    <PartnerLayout pageTitle="Meu Perfil">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Perfil do Parceiro</h2>
        {partner ? (
          <div className="space-y-2">
            <p><span className="font-medium">Nome do Negócio:</span> {partner.business_name}</p>
            <p><span className="font-medium">Email de Contato:</span> {partner.contact_email || "Não informado"}</p>
            <p><span className="font-medium">Telefone:</span> {partner.contact_phone || "Não informado"}</p>
            <p><span className="font-medium">Tipo de Negócio:</span> {partner.business_type}</p>
            <p><span className="font-medium">Website:</span> {partner.website || "Não informado"}</p>
            <p><span className="font-medium">Endereço:</span> {partner.address || "Não informado"}</p>
            <p><span className="font-medium">Status da Verificação:</span> {partner.is_verified ? "Verificado" : "Não verificado"}</p>
          </div>
        ) : (
          <p>Carregando informações do perfil...</p>
        )}
      </div>
    </PartnerLayout>
  );
};

export default PartnerProfile;
