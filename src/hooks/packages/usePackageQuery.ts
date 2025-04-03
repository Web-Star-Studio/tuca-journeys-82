
import { useQuery } from '@tanstack/react-query';
import { Package } from '@/data/types/packageTypes';

// Mock data for packages
const mockPackages: Package[] = [
  {
    id: 1,
    title: "Lua de Mel em Noronha",
    description: "Pacote perfeito para casais em lua de mel",
    image: "/package-romantic.jpg",
    price: 4999,
    days: 5,
    persons: 2,
    rating: 4.9,
    highlights: ["Jantar à luz de velas", "Passeio de barco ao pôr do sol"],
    includes: ["Hospedagem", "Café da manhã", "Traslados"],
    excludes: ["Passagem aérea", "Refeições não especificadas"],
    itinerary: [
      { day: 1, title: "Chegada", description: "Check-in e dia livre" },
      { day: 2, title: "Passeio de barco", description: "Tour pelas ilhas" }
    ],
    dates: ["01/06/2025 - 05/06/2025", "20/07/2025 - 24/07/2025"]
  },
  {
    id: 2,
    title: "Aventura em Noronha",
    description: "Pacote para os amantes de aventura",
    image: "/package-adventure.jpg",
    price: 3999,
    days: 4,
    persons: 1,
    rating: 4.7,
    highlights: ["Trilhas", "Mergulho", "Rapel"],
    includes: ["Hospedagem", "Equipamentos"],
    excludes: ["Passagem aérea", "Alimentação"],
    itinerary: [
      { day: 1, title: "Chegada", description: "Check-in e dia livre" },
      { day: 2, title: "Trilha", description: "Trilha dos Golfinhos" }
    ],
    dates: ["10/06/2025 - 13/06/2025", "15/08/2025 - 18/08/2025"]
  }
];

/**
 * Custom hook to fetch packages data
 * @param category Optional category filter
 * @returns Query result with packages
 */
export const usePackageQuery = (category?: string) => {
  return useQuery({
    queryKey: ['packages', category],
    queryFn: async () => {
      // In a real application, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      
      // Filter by category if provided
      if (category) {
        return mockPackages.filter(pkg => pkg.category === category);
      }
      
      return mockPackages;
    }
  });
};

/**
 * Custom hook to fetch a single package by ID
 * @param id Package ID
 * @returns Query result with package details
 */
export const usePackageDetail = (id: number) => {
  return useQuery({
    queryKey: ['package', id],
    enabled: id > 0,
    queryFn: async () => {
      // In a real application, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
      
      const pkg = mockPackages.find(p => p.id === id);
      if (!pkg) {
        throw new Error(`Package with ID ${id} not found.`);
      }
      
      return pkg;
    }
  });
};
