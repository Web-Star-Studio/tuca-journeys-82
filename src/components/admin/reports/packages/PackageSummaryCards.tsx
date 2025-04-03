
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PackageSummaryCardsProps {
  packageSalesData: {
    name: string;
    vendas: number;
    receita: number;
  }[];
  categorySalesData: {
    name: string;
    value: number;
  }[];
}

const PackageSummaryCards = ({ packageSalesData, categorySalesData }: PackageSummaryCardsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Total de Pacotes</CardTitle>
          <CardDescription>Número de pacotes vendidos no período</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{categorySalesData.reduce((acc, curr) => acc + curr.value, 0)}</div>
          <p className="text-xs text-muted-foreground">
            +{Math.floor(Math.random() * 30) + 5}% em relação ao período anterior
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Receita Total</CardTitle>
          <CardDescription>Valor total gerado no período</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            R$ {packageSalesData.reduce((acc, curr) => acc + curr.receita, 0).toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            +{Math.floor(Math.random() * 20) + 10}% em relação ao período anterior
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Ticket Médio</CardTitle>
          <CardDescription>Valor médio por venda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            R$ {Math.floor(
              packageSalesData.reduce((acc, curr) => acc + curr.receita, 0) / 
              packageSalesData.reduce((acc, curr) => acc + curr.vendas, 0)
            ).toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            +{Math.floor(Math.random() * 15) + 2}% em relação ao período anterior
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PackageSummaryCards;
