
import React from "react";
import { TrendingUp, BarChart, ExternalLink } from "lucide-react";

const UserRegionInsights = () => {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-blue-50 rounded-lg border border-blue-100 p-4 transition-transform hover:scale-[1.02] duration-300">
        <div className="flex justify-between items-start mb-3">
          <div className="text-sm font-medium text-blue-800">
            Região com Mais Usuários
          </div>
          <BarChart className="text-blue-500 h-5 w-5" />
        </div>
        <div className="mt-2">
          <div className="font-bold text-xl text-blue-800">Sudeste</div>
          <div className="text-sm text-blue-600">280 usuários (35%)</div>
        </div>
      </div>
      
      <div className="bg-amber-50 rounded-lg border border-amber-100 p-4 transition-transform hover:scale-[1.02] duration-300">
        <div className="flex justify-between items-start mb-3">
          <div className="text-sm font-medium text-amber-800">
            Maior Crescimento
          </div>
          <TrendingUp className="text-amber-500 h-5 w-5" />
        </div>
        <div className="mt-2">
          <div className="font-bold text-xl text-amber-800">Nordeste</div>
          <div className="text-sm text-amber-600">+32% no último mês</div>
        </div>
      </div>
      
      <div className="bg-purple-50 rounded-lg border border-purple-100 p-4 transition-transform hover:scale-[1.02] duration-300">
        <div className="flex justify-between items-start mb-3">
          <div className="text-sm font-medium text-purple-800">
            Maior Conversão
          </div>
          <ExternalLink className="text-purple-500 h-5 w-5" />
        </div>
        <div className="mt-2">
          <div className="font-bold text-xl text-purple-800">Sul</div>
          <div className="text-sm text-purple-600">34% de taxa de conversão</div>
        </div>
      </div>
    </div>
  );
};

export default UserRegionInsights;
