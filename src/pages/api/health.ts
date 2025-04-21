
import { NextApiRequest, NextApiResponse } from 'next';
import { verifySupabaseIntegration } from '@/utils/supabase-health';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const healthResults = await verifySupabaseIntegration();
    
    // Calculate overall health status
    const isHealthy = 
      healthResults.connection.success &&
      Object.values(healthResults.tables).every(status => status === true) &&
      healthResults.auth;
    
    res.status(isHealthy ? 200 : 503).json({
      status: isHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      details: healthResults
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
}
