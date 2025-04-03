
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, TrendingUp, DollarSign } from "lucide-react";
import MetricItem from "./MetricItem";

const SitePerformance = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Desempenho do Site</CardTitle>
        <CardDescription>Métricas do site nos últimos 30 dias</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <MetricItem 
            icon={<Eye className="text-tuca-ocean-blue" />} 
            label="Visualizações de Página" 
            value="24,562" 
            change="+15.6%" 
            positive
          />
          <MetricItem 
            icon={<TrendingUp className="text-tuca-ocean-blue" />} 
            label="Taxa de Conversão" 
            value="3.2%" 
            change="+0.8%" 
            positive
          />
          <MetricItem 
            icon={<DollarSign className="text-tuca-ocean-blue" />} 
            label="Receita Total" 
            value="R$ 125.670,00" 
            change="+23.5%" 
            positive
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SitePerformance;
