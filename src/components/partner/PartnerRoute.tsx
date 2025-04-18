
import React from 'react';
import { Loader2 } from 'lucide-react';
import { useCurrentPartner } from '@/hooks/use-partner';

interface PartnerRouteProps {
  children: React.ReactNode;
}

const PartnerRoute: React.FC<PartnerRouteProps> = ({ children }) => {
  const { data: partner, isLoading: partnerLoading } = useCurrentPartner();

  if (partnerLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-tuca-ocean-blue" />
      </div>
    );
  }

  // Allow access even without partner data during development
  return <>{children}</>;
};

export default PartnerRoute;
