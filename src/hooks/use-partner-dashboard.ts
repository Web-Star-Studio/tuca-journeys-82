
import { useQuery } from '@tanstack/react-query';
import { partnerDashboardService } from '@/services/partner-dashboard-service';
import { useCurrentPartner } from './use-partner';

export const usePartnerDashboard = () => {
  const { data: partner } = useCurrentPartner();
  const partnerId = partner?.id;

  const { data: dashboardData, isLoading: isDashboardLoading } = useQuery({
    queryKey: ['partnerDashboard', partnerId],
    queryFn: () => partnerId ? partnerDashboardService.getDashboardData(partnerId) : null,
    enabled: !!partnerId,
  });

  const { data: specificData, isLoading: isSpecificDataLoading } = useQuery({
    queryKey: ['partnerSpecificData', partnerId, partner?.business_type],
    queryFn: async () => {
      if (!partnerId || !partner?.business_type) return null;
      
      switch (partner.business_type) {
        case 'accommodation':
          return partnerDashboardService.getAccommodationData(partnerId);
        case 'tour':
          return partnerDashboardService.getTourData(partnerId);
        case 'event':
          return partnerDashboardService.getEventData(partnerId);
        case 'vehicle':
          return partnerDashboardService.getVehicleData(partnerId);
        case 'restaurant':
          return partnerDashboardService.getRestaurantData(partnerId);
        case 'product':
          return partnerDashboardService.getProductData(partnerId);
        default:
          return null;
      }
    },
    enabled: !!partnerId && !!partner?.business_type,
  });

  return {
    dashboardData,
    specificData,
    isLoading: isDashboardLoading || isSpecificDataLoading,
  };
};
