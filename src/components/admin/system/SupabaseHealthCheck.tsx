
import React from 'react';
import HealthCheck from '@/pages/api/health';

const SupabaseHealthCheck: React.FC = () => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Supabase Integration Health</h2>
      <div className="mb-4">
        <p className="text-gray-500">
          This report checks the health of your Supabase integration, including database connectivity, 
          table access permissions, and authentication service.
        </p>
      </div>
      <HealthCheck />
    </div>
  );
};

export default SupabaseHealthCheck;
