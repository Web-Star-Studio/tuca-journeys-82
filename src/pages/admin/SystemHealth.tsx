
import React from 'react';
import AdminLayout from "@/components/admin/AdminLayout";
import SupabaseHealthCheck from '@/components/admin/system/SupabaseHealthCheck';

const SystemHealth = () => {
  return (
    <AdminLayout pageTitle="System Health">
      <div className="space-y-6">
        <div className="prose dark:prose-invert">
          <p>
            This page provides diagnostics about the system's health and connectivity.
            Use this information to troubleshoot issues with Supabase integration and database access.
          </p>
        </div>
        
        <SupabaseHealthCheck />
      </div>
    </AdminLayout>
  );
};

export default SystemHealth;
