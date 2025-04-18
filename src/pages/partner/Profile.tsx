
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
          <div>
            <p>Nome do Negócio: {partner.business_name}</p>
            <p>E-mail: {partner.email}</p>
            {/* Add more partner profile details */}
          </div>
        ) : (
          <p>Carregando informações do perfil...</p>
        )}
      </div>
    </PartnerLayout>
  );
};

export default PartnerProfile;
