
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { verifySupabaseIntegration } from '@/utils/supabase-health';

const SupabaseHealthCheck = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<any>(null);

  const runHealthCheck = async () => {
    setIsChecking(true);
    try {
      const checkResults = await verifySupabaseIntegration();
      setResults(checkResults);
    } catch (error) {
      console.error("Error during health check:", error);
      setResults({
        error: "Failed to complete health check",
        connection: { success: false, connected: false }
      });
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    // Run a check on component mount
    runHealthCheck();
  }, []);

  const getStatusIcon = (status: boolean | undefined) => {
    if (status === undefined) return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    return status ? 
      <CheckCircle className="h-5 w-5 text-green-500" /> : 
      <XCircle className="h-5 w-5 text-red-500" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Supabase Integration Health</CardTitle>
        <CardDescription>
          Check the status of the Supabase integration
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isChecking ? (
          <div className="flex items-center justify-center p-6">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500 mr-2" />
            <span>Checking Supabase integration...</span>
          </div>
        ) : !results ? (
          <div className="text-center text-gray-500 p-6">
            No results available
          </div>
        ) : results.error ? (
          <div className="bg-red-50 border border-red-200 rounded p-4 text-red-700">
            <p className="font-semibold">Error performing health check:</p>
            <p>{results.error}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-2 border-b">
              <span className="font-medium">Supabase Connection:</span>
              <div className="flex items-center">
                {getStatusIcon(results.connection?.connected)}
                <span className="ml-2">
                  {results.connection?.connected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Database Tables:</h3>
              {results.tables && Object.entries(results.tables).map(([table, status]) => (
                <div key={table} className="flex items-center justify-between pl-4 pr-2">
                  <span>{table}</span>
                  {getStatusIcon(status as boolean)}
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between p-2 border-b">
              <span className="font-medium">Authentication:</span>
              <div className="flex items-center">
                {getStatusIcon(results.auth)}
                <span className="ml-2">
                  {results.auth ? 'Working' : 'Issues detected'}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={runHealthCheck} 
          disabled={isChecking}
          className="ml-auto"
        >
          {isChecking ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking...
            </>
          ) : (
            'Run Health Check'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SupabaseHealthCheck;
