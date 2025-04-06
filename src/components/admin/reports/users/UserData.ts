
// Sample data types for the users report
export interface UserGrowthData {
  month: string;
  usuarios: number;
}

export interface UserRegionData {
  regiao: string;
  usuarios: number;
}

export interface UserDeviceData {
  name: string;
  value: number;
  color: string;
}

// Sample data for the users report (in a real app, this would come from an API)
export const userGrowthData: UserGrowthData[] = [
  { month: "Jan", usuarios: 50 },
  { month: "Fev", usuarios: 40 },
  { month: "Mar", usuarios: 60 },
  { month: "Abr", usuarios: 65 },
  { month: "Mai", usuarios: 70 },
  { month: "Jun", usuarios: 80 },
];

export const userRegionData: UserRegionData[] = [
  { regiao: "Sudeste", usuarios: 280 },
  { regiao: "Nordeste", usuarios: 180 },
  { regiao: "Sul", usuarios: 150 },
  { regiao: "Centro-Oeste", usuarios: 90 },
  { regiao: "Norte", usuarios: 60 },
  { regiao: "Internacional", usuarios: 40 },
];

export const userDeviceData: UserDeviceData[] = [
  { name: "Desktop", value: 45, color: "#2563eb" },
  { name: "Mobile", value: 50, color: "#f59e0b" },
  { name: "Tablet", value: 5, color: "#10b981" },
];

// Chart configuration
export const userChartConfig = {
  usuarios: { label: "Usuários", color: "#2563eb" },
  sudeste: { label: "Sudeste", color: "#2563eb" },
  nordeste: { label: "Nordeste", color: "#10b981" },
  sul: { label: "Sul", color: "#f59e0b" },
  centro: { label: "Centro-Oeste", color: "#8b5cf6" },
  norte: { label: "Norte", color: "#ec4899" },
  internacional: { label: "Internacional", color: "#6b7280" },
};

// Function to get all user data with error handling
export const getUserData = () => {
  try {
    return {
      growthData: userGrowthData,
      regionData: userRegionData,
      deviceData: userDeviceData,
      config: userChartConfig,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      growthData: [],
      regionData: [],
      deviceData: [],
      config: {},
    };
  }
};
