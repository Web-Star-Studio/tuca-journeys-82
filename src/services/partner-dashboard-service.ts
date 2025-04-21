
import { BaseApiService } from './base-api';
import { 
  Partner, 
  PartnerDashboardData, 
  AccommodationPartnerData, 
  TourPartnerData, 
  EventPartnerData,
  VehiclePartnerData,
  RestaurantPartnerData,
  ProductPartnerData
} from '@/types/partner';

/**
 * Serviço para gerenciar o dashboard do parceiro
 */
export class PartnerDashboardService extends BaseApiService {
  /**
   * Obtem dados do dashboard para o parceiro
   */
  async getDashboardData(partnerId: string): Promise<PartnerDashboardData> {
    // Em um ambiente de produção, isso buscaria dados reais do Supabase
    // Para demonstração, estamos retornando dados simulados
    return {
      totalBookings: Math.floor(Math.random() * 100) + 50,
      totalRevenue: Math.floor(Math.random() * 10000) + 5000,
      pendingBookings: Math.floor(Math.random() * 20),
      totalCustomers: Math.floor(Math.random() * 200) + 100,
      recentBookings: this.generateMockBookings(),
      customersByRegion: [
        { region: "Nordeste", count: 45 },
        { region: "Sudeste", count: 35 },
        { region: "Sul", count: 15 },
        { region: "Centro-Oeste", count: 10 },
        { region: "Norte", count: 5 }
      ],
      monthlySales: this.generateMonthlySales()
    };
  }

  /**
   * Obtém dados específicos para parceiros de hospedagem
   */
  async getAccommodationData(partnerId: string): Promise<AccommodationPartnerData> {
    return {
      totalRooms: Math.floor(Math.random() * 50) + 10,
      occupancyRate: Math.floor(Math.random() * 40) + 60,
      averageStayDuration: Math.floor(Math.random() * 3) + 2,
      peakSeasonDates: [
        { 
          start: new Date(new Date().getFullYear(), 11, 15).toISOString(), 
          end: new Date(new Date().getFullYear() + 1, 1, 15).toISOString() 
        },
        { 
          start: new Date(new Date().getFullYear(), 5, 15).toISOString(), 
          end: new Date(new Date().getFullYear(), 7, 15).toISOString() 
        }
      ]
    };
  }

  /**
   * Obtém dados específicos para parceiros de passeio
   */
  async getTourData(partnerId: string): Promise<TourPartnerData> {
    return {
      totalTours: Math.floor(Math.random() * 15) + 5,
      totalParticipants: Math.floor(Math.random() * 500) + 200,
      mostPopularTour: "Passeio de barco ao pôr do sol",
      upcomingTours: Math.floor(Math.random() * 10) + 3
    };
  }

  /**
   * Obtém dados específicos para parceiros de eventos
   */
  async getEventData(partnerId: string): Promise<EventPartnerData> {
    return {
      totalEvents: Math.floor(Math.random() * 10) + 5,
      totalAttendees: Math.floor(Math.random() * 1000) + 300,
      upcomingEvents: Math.floor(Math.random() * 5) + 1,
      averageAttendance: Math.floor(Math.random() * 50) + 30
    };
  }

  /**
   * Obtém dados específicos para parceiros de veículos
   */
  async getVehicleData(partnerId: string): Promise<VehiclePartnerData> {
    return {
      totalVehicles: Math.floor(Math.random() * 20) + 10,
      availableVehicles: Math.floor(Math.random() * 15) + 5,
      reservedVehicles: Math.floor(Math.random() * 10),
      mostRequestedVehicle: "SUV Compacto"
    };
  }

  /**
   * Obtém dados específicos para parceiros de restaurantes
   */
  async getRestaurantData(partnerId: string): Promise<RestaurantPartnerData> {
    return {
      totalTables: Math.floor(Math.random() * 20) + 10,
      averageReservationTime: Math.floor(Math.random() * 60) + 60, // em minutos
      peakHours: ["19:00", "20:00", "21:00"],
      topSellingItems: ["Prato Executivo", "Camarão ao Molho", "Filé Mignon"]
    };
  }

  /**
   * Obtém dados específicos para parceiros de produtos
   */
  async getProductData(partnerId: string): Promise<ProductPartnerData> {
    return {
      totalProducts: Math.floor(Math.random() * 50) + 20,
      topSellingProducts: ["Camiseta Local", "Chapéu de Praia", "Artesanato"],
      lowStockProducts: Math.floor(Math.random() * 5) + 3,
      outOfStockProducts: Math.floor(Math.random() * 3),
      totalOrders: Math.floor(Math.random() * 100) + 50
    };
  }

  /**
   * Gera dados de reservas simulados
   * @private
   */
  private generateMockBookings(): any[] {
    const statuses = ["confirmed", "pending", "cancelled"];
    const names = ["João Silva", "Maria Santos", "Carlos Oliveira", "Ana Pereira", "Pedro Costa"];
    const items = ["Quarto Deluxe", "Passeio de Barco", "Veículo SUV", "Workshop de Fotografia", "Combo Souvenirs"];
    
    return Array.from({ length: 5 }, (_, i) => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30));
      
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 5) + 1);
      
      return {
        id: i + 1,
        customerName: names[Math.floor(Math.random() * names.length)],
        item: items[Math.floor(Math.random() * items.length)],
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        amount: Math.floor(Math.random() * 500) + 100
      };
    });
  }

  /**
   * Gera dados de vendas mensais simulados
   * @private
   */
  private generateMonthlySales(): { month: string; value: number }[] {
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    return months.map(month => ({
      month,
      value: Math.floor(Math.random() * 5000) + 1000
    }));
  }
}

export const partnerDashboardService = new PartnerDashboardService();
