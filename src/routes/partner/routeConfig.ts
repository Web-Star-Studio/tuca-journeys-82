
import { baseRoutes } from './baseRoutes';
import { accommodationRoutes } from './accommodationRoutes';
import { tourRoutes } from './tourRoutes';
import { vehicleRoutes } from './vehicleRoutes';
import { eventRoutes } from './eventRoutes';
import { productRoutes } from './productRoutes';
import { Partner } from '@/types/partner';

export const getPartnerRoutes = (businessType?: Partner['business_type']) => {
  let typeSpecificRoutes = [];
  
  switch (businessType) {
    case 'accommodation':
      typeSpecificRoutes = accommodationRoutes;
      break;
    case 'tour':
      typeSpecificRoutes = tourRoutes;
      break;
    case 'vehicle':
      typeSpecificRoutes = vehicleRoutes;
      break;
    case 'event':
      typeSpecificRoutes = eventRoutes;
      break;
    case 'product':
      typeSpecificRoutes = productRoutes;
      break;
    default:
      typeSpecificRoutes = [];
  }

  return [...baseRoutes, ...typeSpecificRoutes];
};

