
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSetupInitialized } from '@/hooks/use-setup-initialized';
import { Loader2 } from 'lucide-react';

interface RequireSetupProps {
  children: React.ReactNode;
}

const RequireSetup: React.FC<RequireSetupProps> = ({ children }) => {
  const { isInitialized, isLoading } = useSetupInitialized();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!isInitialized) {
    return <Navigate to="/setup" replace />;
  }

  return <>{children}</>;
};

export default RequireSetup;
