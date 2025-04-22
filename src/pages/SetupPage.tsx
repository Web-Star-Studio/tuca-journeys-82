
import React from "react";
import { Navigate } from "react-router-dom";
import InitialSetup from "@/components/setup/InitialSetup";
import { useSetupInitialized } from "@/hooks/use-setup-initialized";
import { Loader2 } from "lucide-react";

const SetupPage: React.FC = () => {
  const { isInitialized, isLoading } = useSetupInitialized();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (isInitialized) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <InitialSetup />
    </div>
  );
};

export default SetupPage;
