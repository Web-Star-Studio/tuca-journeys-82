
import React, { useEffect, useState } from 'react';
import { verifySupabaseIntegration } from '@/utils/supabase-health';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

// Define TypeScript interface for health data
interface HealthData {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  details: {
    connection: {
      success: boolean;
      error?: string;
      connected: boolean;
    };
    tables: Record<string, boolean>;
    auth: boolean;
    permissions?: boolean;
  };
}

const HealthCheck: React.FC = () => {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const healthResults = await verifySupabaseIntegration();
        
        // Calculate overall health status
        const isHealthy = 
          healthResults.connection.success &&
          Object.values(healthResults.tables).every(status => status === true) &&
          healthResults.auth;
        
        setHealthData({
          status: isHealthy ? 'healthy' : 'unhealthy',
          timestamp: new Date().toISOString(),
          details: healthResults
        });
      } catch (err: any) {
        setError(err.message || 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-6">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500 mr-2" />
            <span>Checking system health...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>System Health Error</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-500">
            <XCircle className="h-8 w-8 mb-2" />
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Health</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center">
          <span className="text-lg font-medium mr-2">Status:</span>
          {healthData?.status === 'healthy' ? (
            <span className="flex items-center text-green-500">
              <CheckCircle className="h-5 w-5 mr-1" /> Healthy
            </span>
          ) : (
            <span className="flex items-center text-red-500">
              <XCircle className="h-5 w-5 mr-1" /> Unhealthy
            </span>
          )}
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-2">
            Last checked: {healthData ? new Date(healthData.timestamp).toLocaleString() : ''}
          </p>
          <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
            {JSON.stringify(healthData?.details, null, 2)}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthCheck;
