
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RevenueReport from "@/components/admin/reports/RevenueReport";
import BookingsReportContainer from "@/components/admin/reports/bookings/BookingsReportContainer";
import UsersReport from "@/components/admin/reports/UsersReport";
import PackagesReport from "@/components/admin/reports/PackagesReport";
import ReportFilters from "@/components/admin/reports/ReportFilters";
import { BarChart2, Calendar, Users, Package, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
    toast.success("Relatório exportado com sucesso!");
  };

  return (
    <AdminLayout pageTitle="Relatórios">
      <div className="flex flex-col gap-6 pb-6 animate-fade-in">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">Relatórios & Análises</h1>
              <p className="text-muted-foreground mt-1">
                Visualize e exporte dados sobre vendas, reservas, pacotes e usuários
              </p>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
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
        </div>

        <Tabs value={selectedReport} onValueChange={setSelectedReport} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1 bg-muted">
            <TabsTrigger value="revenue" className="flex items-center gap-2 h-10">
              <BarChart2 className="h-4 w-4" />
              <span className="hidden sm:inline">Receita</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2 h-10">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Reservas</span>
            </TabsTrigger>
            <TabsTrigger value="packages" className="flex items-center gap-2 h-10">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Pacotes</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2 h-10">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Usuários</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="revenue" className="space-y-6 pt-2">
            <RevenueReport dateRange={dateRange} />
          </TabsContent>
          
          <TabsContent value="bookings" className="space-y-6 pt-2">
            <BookingsReportContainer dateRange={dateRange} />
          </TabsContent>
          
          <TabsContent value="packages" className="space-y-6 pt-2">
            <PackagesReport dateRange={dateRange} />
          </TabsContent>
          
          <TabsContent value="users" className="space-y-6 pt-2">
            <UsersReport dateRange={dateRange} />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Reports;
