
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RevenueReport from "@/components/admin/reports/RevenueReport";
import BookingsReportContainer from "@/components/admin/reports/bookings/BookingsReportContainer";
import UsersReport from "@/components/admin/reports/UsersReport";
import PackagesReport from "@/components/admin/reports/PackagesReport";
import ReportFilters from "@/components/admin/reports/ReportFilters";
import { BarChart2, Calendar, Users, Package, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Reports = () => {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // Primeiro dia do mês atual
    to: new Date(),
  });

  const [selectedReport, setSelectedReport] = useState("revenue");

  const handleExportReport = () => {
    // Em uma aplicação real, isso geraria e baixaria
    // um arquivo CSV ou PDF com os dados do relatório atual
    toast.success("Relatório exportado com sucesso!");
  };

  return (
    <AdminLayout pageTitle="Relatórios">
      <div className="flex flex-col gap-4 pb-6 animate-fade-in">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-tuca-ocean-blue" />
                <h1 className="text-xl md:text-2xl font-bold">Relatórios & Análises</h1>
              </div>
              <p className="text-sm text-muted-foreground">
                Visualize e exporte dados sobre vendas, reservas, pacotes e usuários
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <ReportFilters dateRange={dateRange} setDateRange={setDateRange} />
              
              <Button 
                variant="outline" 
                className="w-full sm:w-auto bg-white hover:bg-gray-50 flex items-center justify-center" 
                onClick={handleExportReport}
              >
                <Download className="h-4 w-4 mr-2 text-tuca-ocean-blue" />
                Exportar
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <Tabs 
            value={selectedReport} 
            onValueChange={setSelectedReport} 
            className="flex flex-col"
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1 bg-muted border-b border-gray-100 rounded-none">
              <TabsTrigger value="revenue" className="flex items-center gap-2 h-12 rounded-md">
                <BarChart2 className="h-4 w-4" />
                <span className="hidden xs:inline">Receita</span>
              </TabsTrigger>
              <TabsTrigger value="bookings" className="flex items-center gap-2 h-12 rounded-md">
                <Calendar className="h-4 w-4" />
                <span className="hidden xs:inline">Reservas</span>
              </TabsTrigger>
              <TabsTrigger value="packages" className="flex items-center gap-2 h-12 rounded-md">
                <Package className="h-4 w-4" />
                <span className="hidden xs:inline">Pacotes</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2 h-12 rounded-md">
                <Users className="h-4 w-4" />
                <span className="hidden xs:inline">Usuários</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="p-4 md:p-6">
              <TabsContent value="revenue" className="mt-0">
                <RevenueReport dateRange={dateRange} />
              </TabsContent>
              
              <TabsContent value="bookings" className="mt-0">
                <BookingsReportContainer dateRange={dateRange} />
              </TabsContent>
              
              <TabsContent value="packages" className="mt-0">
                <PackagesReport dateRange={dateRange} />
              </TabsContent>
              
              <TabsContent value="users" className="mt-0">
                <UsersReport dateRange={dateRange} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Reports;
