
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RevenueReport from "@/components/admin/reports/RevenueReport";
import BookingsReportContainer from "@/components/admin/reports/bookings/BookingsReportContainer";
import UsersReport from "@/components/admin/reports/UsersReport";
import PackagesReport from "@/components/admin/reports/PackagesReport";
import ReportFilters from "@/components/admin/reports/ReportFilters";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const Reports = () => {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // First day of current month
    to: new Date(),
  });

  const [selectedReport, setSelectedReport] = useState("revenue");

  const handleExportReport = () => {
    // In a real application, this would generate and download 
    // a CSV or PDF file with the current report data
    alert("Relatório exportado com sucesso!");
  };

  return (
    <AdminLayout pageTitle="Relatórios">
      <div className="flex flex-col gap-6 pb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Relatórios & Análises</h1>
            <p className="text-muted-foreground">
              Visualize e exporte dados sobre vendas, reservas, pacotes e usuários
            </p>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <ReportFilters dateRange={dateRange} setDateRange={setDateRange} />
            
            <Button 
              variant="outline" 
              className="w-full md:w-auto" 
              onClick={handleExportReport}
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        <Tabs value={selectedReport} onValueChange={setSelectedReport} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="revenue">Receita</TabsTrigger>
            <TabsTrigger value="bookings">Reservas</TabsTrigger>
            <TabsTrigger value="packages">Pacotes</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
          </TabsList>
          
          <TabsContent value="revenue" className="space-y-4 pt-2">
            <RevenueReport dateRange={dateRange} />
          </TabsContent>
          
          <TabsContent value="bookings" className="space-y-4 pt-2">
            <BookingsReportContainer dateRange={dateRange} />
          </TabsContent>
          
          <TabsContent value="packages" className="space-y-4 pt-2">
            <PackagesReport dateRange={dateRange} />
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4 pt-2">
            <UsersReport dateRange={dateRange} />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Reports;
