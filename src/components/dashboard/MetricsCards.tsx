
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <Card className="bg-white hover:shadow-md transition-all duration-300">
        <CardHeader className="pb-2 text-center">
          <CardTitle className="text-lg flex items-center justify-center gap-2">
            <Calendar className="h-5 w-5 text-tuca-ocean-blue" />
            Reservas Ativas
          </CardTitle>
          <CardDescription className="text-center">Seus agendamentos atuais</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">{metrics.reservasAtivas}</span>
          </div>
          <p className="text-sm mt-2 text-gray-500">
            Próxima viagem em {metrics.diasAteProximaViagem} dias
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-white hover:shadow-md transition-all duration-300">
        <CardHeader className="pb-2 text-center">
          <CardTitle className="text-lg flex items-center justify-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Pontos Acumulados
          </CardTitle>
          <CardDescription className="text-center">Programa de fidelidade</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">{metrics.pontosAcumulados}</span>
          </div>
          <p className="text-sm mt-2 text-gray-500">
            Faltam 250 pontos para o próximo nível
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-white hover:shadow-md transition-all duration-300 sm:col-span-2 lg:col-span-1">
        <CardHeader className="pb-2 text-center">
          <CardTitle className="text-lg flex items-center justify-center gap-2">
            <Activity className="h-5 w-5 text-amber-500" />
            Perfil
          </CardTitle>
          <CardDescription className="text-center">Status de preenchimento</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex flex-col items-center justify-center mb-2">
            <span className="text-3xl font-bold">{metrics.statusPerfil}%</span>
          </div>
          <Progress value={metrics.statusPerfil} className="h-2" indicatorClassName="bg-blue-500" />
          <p className="text-sm mt-2 text-gray-500">
            Complete seu perfil para melhores recomendações
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsCards;
