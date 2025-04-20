
import { useQuery } from '@tanstack/react-query';
import { customerService } from '@/services';
import { useCurrentPartner } from './use-partner';

export const useCustomers = () => {
  const { data: partner } = useCurrentPartner();

  return useQuery({
    queryKey: ['customers', partner?.id],
    queryFn: () => partner?.id ? customerService.getCustomersByPartnerId(partner.id) : [],
    enabled: !!partner?.id,
  });
};
