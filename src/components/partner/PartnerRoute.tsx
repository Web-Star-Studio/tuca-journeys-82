
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { useCurrentPartner } from '@/hooks/use-partner';

interface PartnerRouteProps {
  children: React.ReactNode;
}

const PartnerRoute: React.FC<PartnerRouteProps> = ({ children }) => {
  const { user, isLoading: authLoading } = useAuth();
  const { data: partner, isLoading: partnerLoading } = useCurrentPartner();

  const isLoading = authLoading || partnerLoading;
  const isPartner = user?.user_metadata?.role === 'partner' || user?.app_metadata?.role === 'partner';

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-tuca-ocean-blue" />
      </div>
    );
  }

  if (!user || !isPartner || !partner) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PartnerRoute;
