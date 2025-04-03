
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const YearlyComparison = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Comparativo Anual</CardTitle>
        <CardDescription>
          Comparação com o mesmo período do ano anterior
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Dados disponíveis a partir de Janeiro/2023</p>
          <p className="mt-2">Comparativo anual será habilitado em 2024</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default YearlyComparison;
