
import { supabase } from "@/lib/supabase";

export interface UserGrowthData {
  month: string;
  usuarios: number;
}

export interface UserRegionData {
  name: string;
  value: number;
  percent: number;
}

export interface UserDeviceData {
  name: string;
  value: number;
  color: string;
}

export interface UserChartConfig {
  usuarios: {
    label: string;
    color: string;
  };
}

// Dados de crescimento de usuários mês a mês
export const userGrowthData: UserGrowthData[] = [
  { month: "Jan", usuarios: 120 },
  { month: "Fev", usuarios: 132 },
  { month: "Mar", usuarios: 145 },
  { month: "Abr", usuarios: 155 },
  { month: "Mai", usuarios: 165 },
  { month: "Jun", usuarios: 172 },
];

// Dados de distribuição de usuários por região
export const userRegionData: UserRegionData[] = [
  { name: "Sudeste", value: 280, percent: 35 },
  { name: "Nordeste", value: 240, percent: 30 },
  { name: "Sul", value: 160, percent: 20 },
  { name: "Centro-Oeste", value: 80, percent: 10 },
  { name: "Norte", value: 40, percent: 5 },
];

// Dados de dispositivos utilizados pelos usuários
export const userDeviceData: UserDeviceData[] = [
  { name: "Desktop", value: 42, color: "#2563eb" },
  { name: "Mobile", value: 48, color: "#10b981" },
  { name: "Tablet", value: 10, color: "#f59e0b" },
];

// Configuração do gráfico
export const userChartConfig: UserChartConfig = {
  usuarios: { label: "Usuários", color: "#2563eb" },
};

// Função para gerar dados de usuários
export function getUserData() {
  try {
    // Em um ambiente real, estes dados viriam da API ou banco de dados
    return {
      growthData: userGrowthData,
      regionData: userRegionData,
      deviceData: userDeviceData,
      config: userChartConfig
    };
  } catch (error) {
    console.error("Erro ao gerar dados de usuários:", error);
    // Retornar dados de fallback em caso de erro
    return {
      growthData: [],
      regionData: [],
      deviceData: [],
      config: userChartConfig
    };
  }
}
