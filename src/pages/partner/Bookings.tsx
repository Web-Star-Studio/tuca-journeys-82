
import React from "react";
import PartnerLayout from "@/components/partner/PartnerLayout";

const PartnerBookings: React.FC = () => {
  return (
    <PartnerLayout pageTitle="Minhas Reservas">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Reservas do Parceiro</h2>
        {/* TODO: Implement partner bookings list */}
        <p>Nenhuma reserva encontrada.</p>
      </div>
    </PartnerLayout>
  );
};

export default PartnerBookings;
