
import React, { useState, useCallback } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportFilters from "@/components/admin/reports/ReportFilters";
import RevenueReport from "@/components/admin/reports/RevenueReport";
import BookingsReportContainer from "@/components/admin/reports/bookings/BookingsReportContainer";
import UsersReport from "@/components/admin/reports/UsersReport";
import PackagesReport from "@/components/admin/reports/PackagesReport";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";

const Reports = () => {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const [activeTab, setActiveTab] = useState("revenue");
  const [error, setError] = useState<string | null>(null);

  const handleDateRangeChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    setDateRange(range);
  };

  const handleError = useCallback((error: Error) => {
    console.error("Report error:", error);
    setError(error.message || "Ocorreu um erro ao carregar os relatórios");
    toast.error("Erro ao carregar dados do relatório");
  }, []);

  const clearError = () => {
    setError(null);
  };

  return (
    <AdminLayout pageTitle="Relatórios">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Tabs
            defaultValue={activeTab}
            value={activeTab}
            onValueChange={(value) => {
              clearError();
              setActiveTab(value);
            }}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-xl">
              <TabsTrigger value="revenue">Receitas</TabsTrigger>
              <TabsTrigger value="bookings">Reservas</TabsTrigger>
              <TabsTrigger value="users">Usuários</TabsTrigger>
              <TabsTrigger value="packages">Pacotes</TabsTrigger>
            </TabsList>
          </Tabs>

          <ReportFilters dateRange={dateRange} onDateRangeChange={handleDateRangeChange} />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="pt-4">
          <TabsContent value="revenue" className="mt-0">
            <RevenueReport dateRange={dateRange} onError={handleError} />
          </TabsContent>

          <TabsContent value="bookings" className="mt-0">
            <BookingsReportContainer dateRange={dateRange} onError={handleError} />
          </TabsContent>

          <TabsContent value="users" className="mt-0">
            <UsersReport dateRange={dateRange} onError={handleError} />
          </TabsContent>

          <TabsContent value="packages" className="mt-0">
            <PackagesReport dateRange={dateRange} onError={handleError} />
          </TabsContent>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Reports;
