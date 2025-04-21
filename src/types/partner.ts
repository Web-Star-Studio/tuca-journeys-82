
export interface Partner {
  id: string;
  user_id: string;
  business_name: string;
  business_type: 'accommodation' | 'tour' | 'vehicle' | 'event' | 'product' | 'restaurant' | 'service';
  description?: string;
  logo_url?: string;
  cover_image?: string;
  contact_email?: string;
  contact_phone?: string;
  website?: string;
  address?: string;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // Additional properties used in components
  name?: string; // For backward compatibility
  category?: string; // For backward compatibility
  featured?: boolean; // For backward compatibility
  discount_codes?: DiscountCode[]; // For backward compatibility
}

export interface DiscountCode {
  id: number;
  code: string;
  discount_percentage: number;
  expires_at: string;
  minimum_purchase?: number;
  max_uses?: number;
  current_uses: number;
  description: string;
}

export interface PartnerDashboardData {
  totalBookings: number;
  totalRevenue: number;
  pendingBookings: number;
  totalCustomers: number;
  recentBookings: any[];
  customersByRegion: { region: string; count: number }[];
  monthlySales: { month: string; value: number }[];
}

// Tipos específicos para cada categoria de parceiro
export interface AccommodationPartnerData {
  totalRooms: number;
  occupancyRate: number;
  averageStayDuration: number;
  peakSeasonDates: { start: string; end: string }[];
}

export interface TourPartnerData {
  totalTours: number;
  totalParticipants: number;
  mostPopularTour: string;
  upcomingTours: number;
}

export interface EventPartnerData {
  totalEvents: number;
  totalAttendees: number;
  upcomingEvents: number;
  averageAttendance: number;
}

export interface VehiclePartnerData {
  totalVehicles: number;
  availableVehicles: number;
  reservedVehicles: number;
  mostRequestedVehicle: string;
}

export interface RestaurantPartnerData {
  totalTables: number;
  averageReservationTime: number;
  peakHours: string[];
  topSellingItems: string[];
}

export interface ProductPartnerData {
  totalProducts: number;
  topSellingProducts: string[];
  lowStockProducts: number;
  outOfStockProducts: number;
  totalOrders: number;
}
