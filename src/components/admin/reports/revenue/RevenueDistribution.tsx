
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { chartConfig } from "./RevenueDataGenerator";

interface RevenueDistributionProps {
  totalRevenue: number;
  passeiosTotal: number;
  hospedagensTotal: number;
  pacotesTotal: number;
  produtosTotal: number;
}

const RevenueDistribution = ({
  totalRevenue,
  passeiosTotal,
  hospedagensTotal,
  pacotesTotal,
  produtosTotal
}: RevenueDistributionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição de Receita</CardTitle>
        <CardDescription>
          Proporção de cada categoria na receita total
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: chartConfig.passeios.color }}></div>
                <span>Passeios</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">R$ {passeiosTotal.toLocaleString('pt-BR')}</span>
                <span className="text-sm text-muted-foreground">
                  ({((passeiosTotal / totalRevenue) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="h-2.5 rounded-full" 
                style={{ 
                  width: `${(passeiosTotal / totalRevenue) * 100}%`,
                  backgroundColor: chartConfig.passeios.color 
                }}
              ></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: chartConfig.hospedagens.color }}></div>
                <span>Hospedagens</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">R$ {hospedagensTotal.toLocaleString('pt-BR')}</span>
                <span className="text-sm text-muted-foreground">
                  ({((hospedagensTotal / totalRevenue) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="h-2.5 rounded-full" 
                style={{ 
                  width: `${(hospedagensTotal / totalRevenue) * 100}%`,
                  backgroundColor: chartConfig.hospedagens.color 
                }}
              ></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: chartConfig.pacotes.color }}></div>
                <span>Pacotes</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">R$ {pacotesTotal.toLocaleString('pt-BR')}</span>
                <span className="text-sm text-muted-foreground">
                  ({((pacotesTotal / totalRevenue) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="h-2.5 rounded-full" 
                style={{ 
                  width: `${(pacotesTotal / totalRevenue) * 100}%`,
                  backgroundColor: chartConfig.pacotes.color 
                }}
              ></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: chartConfig.produtos.color }}></div>
                <span>Produtos</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">R$ {produtosTotal.toLocaleString('pt-BR')}</span>
                <span className="text-sm text-muted-foreground">
                  ({((produtosTotal / totalRevenue) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="h-2.5 rounded-full" 
                style={{ 
                  width: `${(produtosTotal / totalRevenue) * 100}%`,
                  backgroundColor: chartConfig.produtos.color 
                }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueDistribution;
