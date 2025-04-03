
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RevenueReport from "@/components/admin/reports/RevenueReport";
import BookingsReport from "@/components/admin/reports/BookingsReport";
import UsersReport from "@/components/admin/reports/UsersReport";
import ReportFilters from "@/components/admin/reports/ReportFilters";
import { CalendarIcon, Download } from "lucide-react";
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
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Relatórios & Análises</h1>
            <p className="text-muted-foreground">
              Visualize e exporte dados sobre vendas, reservas e usuários
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

        <Tabs value={selectedReport} onValueChange={setSelectedReport}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="revenue">Receita</TabsTrigger>
            <TabsTrigger value="bookings">Reservas</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
          </TabsList>
          
          <TabsContent value="revenue">
            <RevenueReport dateRange={dateRange} />
          </TabsContent>
          
          <TabsContent value="bookings">
            <BookingsReport dateRange={dateRange} />
          </TabsContent>
          
          <TabsContent value="users">
            <UsersReport dateRange={dateRange} />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Reports;
