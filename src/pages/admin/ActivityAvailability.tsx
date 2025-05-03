
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";

const ActivityAvailability: React.FC = () => {
  return (
    <AdminLayout pageTitle="Gerenciar Disponibilidade de Atividades">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Disponibilidade de Atividades</h2>
          <p className="text-muted-foreground">
            Gerencie a disponibilidade e preços especiais para datas específicas
          </p>
        </div>

        <div className="bg-white p-6 rounded-md shadow-sm">
          <p>Esta página está em desenvolvimento.</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ActivityAvailability;
