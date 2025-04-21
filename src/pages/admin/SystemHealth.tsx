
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import SupabaseHealthCheck from '@/components/admin/system/SupabaseHealthCheck';

const SystemHealth = () => {
  return (
    <AdminLayout pageTitle="System Health">
      <div className="grid gap-6">
        <div className="col-span-1">
          <SupabaseHealthCheck />
        </div>
      </div>
    </AdminLayout>
  );
};

export default SystemHealth;
