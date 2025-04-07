
import React from "react";
import { Calendar, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface UserMetrics {
  reservasAtivas: number;
  pontosAcumulados: number;
  diasAteProximaViagem: number;
  statusPerfil: number;
}

const MetricsCards = ({ metrics }: { metrics: UserMetrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Reservas Ativas</CardTitle>
          <CardDescription>Seus agendamentos atuais</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold">{metrics.reservasAtivas}</span>
            <Calendar className="h-8 w-8 text-tuca-ocean-blue opacity-80" />
          </div>
          <p className="text-sm mt-2 text-gray-500">
            Próxima viagem em {metrics.diasAteProximaViagem} dias
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Pontos Acumulados</CardTitle>
          <CardDescription>Programa de fidelidade</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold">{metrics.pontosAcumulados}</span>
            <TrendingUp className="h-8 w-8 text-green-500 opacity-80" />
          </div>
          <p className="text-sm mt-2 text-gray-500">
            Faltam 250 pontos para o próximo nível
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Perfil</CardTitle>
          <CardDescription>Status de preenchimento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl font-bold">{metrics.statusPerfil}%</span>
            <Activity className="h-8 w-8 text-amber-500 opacity-80" />
          </div>
          <Progress value={metrics.statusPerfil} className="h-2" />
          <p className="text-sm mt-2 text-gray-500">
            Complete seu perfil para melhores recomendações
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsCards;
