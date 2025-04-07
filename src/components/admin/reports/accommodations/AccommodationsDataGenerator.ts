
// Tipos de dados para o relatório de hospedagens
export interface AccommodationTrendData {
  month: string;
  ocupacao: number;
  reservas: number;
  avaliacao: number;
}

export interface AccommodationTypeData {
  name: string;
  value: number;
  color: string;
}

export interface AccommodationRegionData {
  name: string;
  value: number;
  percent: number;
}

export interface AccommodationChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

// Dados fictícios de tendência de hospedagens
const accommodationTrendData: AccommodationTrendData[] = [
  { month: "Jan", ocupacao: 72, reservas: 40, avaliacao: 4.5 },
  { month: "Fev", ocupacao: 85, reservas: 55, avaliacao: 4.6 },
  { month: "Mar", ocupacao: 68, reservas: 38, avaliacao: 4.7 },
  { month: "Abr", ocupacao: 75, reservas: 45, avaliacao: 4.6 },
  { month: "Mai", ocupacao: 82, reservas: 50, avaliacao: 4.8 },
  { month: "Jun", ocupacao: 90, reservas: 60, avaliacao: 4.7 },
];

// Dados de distribuição por tipo de hospedagem
const accommodationTypeData: AccommodationTypeData[] = [
  { name: "Pousada", value: 35, color: "#2563eb" },
  { name: "Casa", value: 25, color: "#10b981" },
  { name: "Apartamento", value: 20, color: "#f59e0b" },
  { name: "Resort", value: 15, color: "#8b5cf6" },
  { name: "Villa", value: 5, color: "#ef4444" },
];

// Dados de distribuição por região
const accommodationRegionData: AccommodationRegionData[] = [
  { name: "Praia do Sueste", value: 18, percent: 25 },
  { name: "Vila dos Remédios", value: 22, percent: 30 },
  { name: "Baía do Sancho", value: 15, percent: 20 },
  { name: "Praia do Leão", value: 10, percent: 15 },
  { name: "Praia da Conceição", value: 7, percent: 10 },
];

// Configuração dos gráficos
const chartConfig: AccommodationChartConfig = {
  ocupacao: { label: "Taxa de Ocupação (%)", color: "#2563eb" },
  reservas: { label: "Reservas", color: "#10b981" },
  avaliacao: { label: "Avaliação Média", color: "#f59e0b" },
};

// Interface para os dados do relatório completo
export interface AccommodationsReportData {
  trendData: AccommodationTrendData[];
  typeData: AccommodationTypeData[];
  regionData: AccommodationRegionData[];
  chartConfig: AccommodationChartConfig;
  summaryData: {
    totalAccommodations: number;
    avgOccupancy: number;
    avgRating: number;
    totalReservations: number;
    avgPricePerNight: number;
  };
}

/**
 * Gera dados fictícios para o relatório de hospedagens
 */
export function generateAccommodationsReportData(): AccommodationsReportData {
  try {
    // Calcular médias e totais
    const totalAccommodations = 48;
    const avgOccupancy = accommodationTrendData.reduce((sum, item) => sum + item.ocupacao, 0) / accommodationTrendData.length;
    const avgRating = accommodationTrendData.reduce((sum, item) => sum + item.avaliacao, 0) / accommodationTrendData.length;
    const totalReservations = accommodationTrendData.reduce((sum, item) => sum + item.reservas, 0);
    const avgPricePerNight = 850;

    return {
      trendData: accommodationTrendData,
      typeData: accommodationTypeData,
      regionData: accommodationRegionData,
      chartConfig: chartConfig,
      summaryData: {
        totalAccommodations,
        avgOccupancy,
        avgRating,
        totalReservations,
        avgPricePerNight
      }
    };
  } catch (error) {
    console.error("Erro ao gerar dados de hospedagens:", error);
    // Dados de fallback em caso de erro
    return {
      trendData: [],
      typeData: [],
      regionData: [],
      chartConfig: chartConfig,
      summaryData: {
        totalAccommodations: 0,
        avgOccupancy: 0,
        avgRating: 0,
        totalReservations: 0,
        avgPricePerNight: 0
      }
    };
  }
}
