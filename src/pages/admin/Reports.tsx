
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
import { useIsMobile } from "@/hooks/use-mobile";

const Reports = () => {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const [activeTab, setActiveTab] = useState("revenue");
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();

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
        <div className="flex flex-col space-y-4">
          {/* Here we properly wrap everything in a single Tabs component */}
          <Tabs
            defaultValue={activeTab}
            value={activeTab}
            onValueChange={(value) => {
              clearError();
              setActiveTab(value);
            }}
            className="w-full overflow-hidden"
          >
            {/* Tabs header and date filter in one row on desktop */}
            <div className={`${isMobile ? "flex flex-col space-y-4" : "flex items-center justify-between"}`}>
              <div className={`${isMobile ? "w-full" : "w-auto"}`}>
                <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-xl">
                  <TabsTrigger value="revenue">Receitas</TabsTrigger>
                  <TabsTrigger value="bookings">Reservas</TabsTrigger>
                  <TabsTrigger value="users">Usuários</TabsTrigger>
                  <TabsTrigger value="packages">Pacotes</TabsTrigger>
                </TabsList>
              </div>
              <div className={`${isMobile ? "w-full" : "w-auto"}`}>
                <ReportFilters dateRange={dateRange} onDateRangeChange={handleDateRangeChange} />
              </div>
            </div>

            {/* Error alert */}
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {/* Tabs content */}
            <TabsContent value="revenue" className="mt-4 overflow-x-auto">
              <div className="min-w-[320px]">
                <RevenueReport dateRange={dateRange} onError={handleError} />
              </div>
            </TabsContent>

            <TabsContent value="bookings" className="mt-4 overflow-x-auto">
              <div className="min-w-[320px]">
                <BookingsReportContainer dateRange={dateRange} onError={handleError} />
              </div>
            </TabsContent>

            <TabsContent value="users" className="mt-4 overflow-x-auto">
              <div className="min-w-[320px]">
                <UsersReport dateRange={dateRange} onError={handleError} />
              </div>
            </TabsContent>

            <TabsContent value="packages" className="mt-4 overflow-x-auto">
              <div className="min-w-[320px]">
                <PackagesReport dateRange={dateRange} onError={handleError} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Reports;
