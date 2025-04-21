
import { useAuth } from "@/contexts/AuthContext";
import { AuthService, UserRole } from "@/services/auth-service";
import { useQuery } from "@tanstack/react-query";
import { User } from "@supabase/supabase-js";

export const useAuthorization = () => {
  const { user } = useAuth();
  
  const { data: userRole, isLoading: roleLoading } = useQuery({
    queryKey: ['user-role', user?.id],
    queryFn: () => AuthService.getUserRole(user),
    enabled: !!user,
  });
  
  const { data: isAdmin, isLoading: adminLoading } = useQuery({
    queryKey: ['user-is-admin', user?.id],
    queryFn: () => AuthService.isAdmin(user),
    enabled: !!user,
  });
  
  const { data: isPartner, isLoading: partnerLoading } = useQuery({
    queryKey: ['user-is-partner', user?.id],
    queryFn: () => AuthService.isPartner(user),
    enabled: !!user,
  });
  
  const { data: isCustomer, isLoading: customerLoading } = useQuery({
    queryKey: ['user-is-customer', user?.id],
    queryFn: () => AuthService.isCustomer(user),
    enabled: !!user,
  });
  
  const hasRole = async (role: UserRole): Promise<boolean> => {
    if (!user) return false;
    return AuthService.hasRole(user, role);
  };
  
  return {
    userRole: userRole || null,
    isAdmin: isAdmin || false,
    isPartner: isPartner || false,
    isCustomer: isCustomer || false,
    hasRole,
    isLoading: roleLoading || adminLoading || partnerLoading || customerLoading,
  };
};
