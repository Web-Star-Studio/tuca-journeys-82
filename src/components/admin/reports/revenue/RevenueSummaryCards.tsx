
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon, DollarSign, TrendingUp, Calendar } from "lucide-react";
import { CalculatorIcon } from "./CalculatorIcon";

interface RevenueSummaryCardsProps {
  totalRevenue: number;
  lastMonthRevenue: number;
  growthRate: number;
  isPositiveGrowth: boolean;
  avgMonthlyRevenue: number;
}

const RevenueSummaryCards = ({
  totalRevenue,
  lastMonthRevenue,
  growthRate,
  isPositiveGrowth,
  avgMonthlyRevenue
}: RevenueSummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Receita Total
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="font-bold text-2xl">R$ {totalRevenue.toLocaleString('pt-BR')}</div>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Crescimento Mensal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="font-bold text-2xl">
                {growthRate.toFixed(1)}%
              </span>
              {isPositiveGrowth ? (
                <ArrowUpIcon className="h-4 w-4 ml-1 text-green-500" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 ml-1 text-red-500" />
              )}
            </div>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Mês Atual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="font-bold text-2xl">
              R$ {lastMonthRevenue.toLocaleString('pt-BR')}
            </div>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Receita Média Mensal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="font-bold text-2xl">
              R$ {Math.round(avgMonthlyRevenue).toLocaleString('pt-BR')}
            </div>
            <CalculatorIcon className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueSummaryCards;
