
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MetricItem from "./MetricItem";
import { Globe, Clock, Search, Zap } from "lucide-react";

const SitePerformance = () => {
  const metrics = [
    {
      icon: <Zap className="h-4 w-4 text-amber-500" />,
      label: "Taxa de Conversão",
      value: "8.2%",
      change: "+1.2%",
      positive: true
    },
    {
      icon: <Search className="h-4 w-4 text-blue-500" />,
      label: "Tráfego Orgânico",
      value: "3.2k",
      change: "+15%",
      positive: true
    },
    {
      icon: <Clock className="h-4 w-4 text-green-500" />,
      label: "Tempo Médio",
      value: "4m 32s",
      change: "+0:42",
      positive: true
    },
    {
      icon: <Globe className="h-4 w-4 text-purple-500" />,
      label: "Taxa de Rejeição",
      value: "32.5%",
      change: "-4.3%",
      positive: true
    }
  ];

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Desempenho do Site</CardTitle>
        <CardDescription>
          Métricas importantes do mês atual
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {metrics.map((metric, index) => (
          <MetricItem
            key={index}
            icon={metric.icon}
            label={metric.label}
            value={metric.value}
            change={metric.change}
            positive={metric.positive}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default SitePerformance;
