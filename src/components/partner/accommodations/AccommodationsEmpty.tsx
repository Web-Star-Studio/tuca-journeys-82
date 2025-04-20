
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const AccommodationsEmpty = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nenhuma Hospedagem Encontrada</CardTitle>
        <CardDescription>
          Você ainda não cadastrou nenhuma hospedagem. Clique no botão "Nova
          Hospedagem" para começar.
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default AccommodationsEmpty;
