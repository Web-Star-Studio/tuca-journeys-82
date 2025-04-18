
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PartnerLayout from "@/components/partner/PartnerLayout";
import { useCurrentPartner } from "@/hooks/use-partner";
import { CalendarIcon, DollarSign, Package, Users, Smile, AlertTriangle } from "lucide-react";

const StatCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}> = ({ title, value, icon, description, trend, trendValue }) => {
  const trendColor = trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-gray-500";
  const trendIcon = trend === "up" ? "↑" : trend === "down" ? "↓" : "•";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <div className="rounded-md bg-blue-50 p-2 text-tuca-ocean-blue">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
        {trendValue && (
          <div className={`text-xs mt-2 ${trendColor} flex items-center`}>
            <span>{trendIcon}</span>
            <span className="ml-1">{trendValue} desde o mês passado</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const PartnerDashboard: React.FC = () => {
  const { data: partner } = useCurrentPartner();

  return (
    <PartnerLayout pageTitle="Dashboard">
      <div className="grid gap-4 md:gap-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            Bem-vindo, {partner?.business_name}
          </h1>
          <div className="flex items-center gap-2">
            {!partner?.is_verified && (
              <div className="bg-amber-50 text-amber-600 px-3 py-1 rounded-md text-sm flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1" /> Aguardando verificação
              </div>
            )}
            {partner?.is_verified && (
              <div className="bg-green-50 text-green-600 px-3 py-1 rounded-md text-sm flex items-center">
                <Smile className="w-4 h-4 mr-1" /> Verificado
              </div>
            )}
          </div>
        </div>

        {!partner?.is_verified && (
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <AlertTriangle className="h-8 w-8 text-amber-600" />
                <div>
                  <h3 className="text-lg font-semibold text-amber-800">Perfil em análise</h3>
                  <p className="text-amber-700">
                    Seu cadastro como parceiro está sob análise. Você receberá uma notificação quando for aprovado.
                    Enquanto isso, você já pode cadastrar seus produtos e serviços.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Reservas do Mês"
            value="0"
            icon={<CalendarIcon className="h-4 w-4" />}
            description="Total de reservas neste mês"
          />
          <StatCard
            title="Faturamento do Mês"
            value="R$ 0"
            icon={<DollarSign className="h-4 w-4" />}
            description="Receita total neste mês"
          />
          <StatCard
            title="Produtos Cadastrados"
            value="0"
            icon={<Package className="h-4 w-4" />}
            description="Total de itens cadastrados"
          />
          <StatCard
            title="Clientes Atendidos"
            value="0"
            icon={<Users className="h-4 w-4" />}
            description="Total de clientes únicos"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Próximos Passos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-blue-100 p-2 text-blue-700">1</div>
                  <div>
                    <h3 className="font-semibold">Complete seu perfil</h3>
                    <p className="text-sm text-gray-500">
                      Adicione mais informações, logotipo e imagens de capa para tornar seu perfil mais atrativo.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-blue-100 p-2 text-blue-700">2</div>
                  <div>
                    <h3 className="font-semibold">Cadastre seus produtos ou serviços</h3>
                    <p className="text-sm text-gray-500">
                      Adicione seus produtos, serviços, hospedagens ou passeios à plataforma para começar a receber reservas.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-blue-100 p-2 text-blue-700">3</div>
                  <div>
                    <h3 className="font-semibold">Configure métodos de pagamento</h3>
                    <p className="text-sm text-gray-500">
                      Configure suas opções de pagamento para receber os valores das reservas diretamente.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PartnerLayout>
  );
};

export default PartnerDashboard;
