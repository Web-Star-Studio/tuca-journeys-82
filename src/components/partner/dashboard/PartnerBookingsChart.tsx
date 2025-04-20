
import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Partner } from "@/types/partner";

interface PartnerBookingsChartProps {
  businessType?: Partner["business_type"];
}

const PartnerBookingsChart: React.FC<PartnerBookingsChartProps> = ({ businessType }) => {
  // Demo data for the chart
  const generateDemoData = () => {
    const today = new Date();
    const data = [];
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      
      data.push({
        date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        value: Math.floor(Math.random() * 5)
      });
    }
    
    return data;
  };

  const data = generateDemoData();

  const getChartLabel = () => {
    switch (businessType) {
      case "accommodation": return "Quartos";
      case "tour": return "Passeios";
      case "vehicle": return "Veículos";
      case "event": return "Ingressos";
      case "product": return "Produtos";
      case "restaurant": return "Mesas";
      case "service": return "Serviços";
      default: return "Reservas";
    }
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: 12 }} 
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          allowDecimals={false}
          tick={{ fontSize: 12 }} 
          tickLine={false}
          axisLine={false}
        />
        <Tooltip 
          formatter={(value) => [`${value} ${getChartLabel()}`, 'Reservas']}
          labelFormatter={(label) => `Data: ${label}`}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#0EA5E9"
          strokeWidth={2}
          dot={{ r: 3, fill: "#0EA5E9" }}
          name="Reservas"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PartnerBookingsChart;
