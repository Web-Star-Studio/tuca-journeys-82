
import { useQuery } from '@tanstack/react-query';
import { partnerDashboardService } from '@/services/partner-dashboard-service';
import { useCurrentPartner } from './use-partner';
import { useMemo } from 'react';

export const usePartnerDashboard = () => {
  const { data: partner, isLoading: isPartnerLoading } = useCurrentPartner();
  const partnerId = partner?.id;
  
  // Dashboard data query - only runs when partnerId is available
  const { 
    data: dashboardData, 
    isLoading: isDashboardLoading, 
    error: dashboardError 
  } = useQuery({
    queryKey: ['partnerDashboard', partnerId],
    queryFn: () => partnerId ? partnerDashboardService.getDashboardData(partnerId) : null,
    enabled: !!partnerId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });

  // Specific data query - only runs when partnerId and business_type are available
  const { 
    data: specificData, 
    isLoading: isSpecificDataLoading,
    error: specificError
  } = useQuery({
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
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });

  // Memoized error state
  const error = useMemo(() => {
    return dashboardError || specificError;
  }, [dashboardError, specificError]);

  // Combined loading state
  const isLoading = isPartnerLoading || isDashboardLoading || isSpecificDataLoading;

  return {
    dashboardData,
    specificData,
    isLoading,
    error,
  };
};
