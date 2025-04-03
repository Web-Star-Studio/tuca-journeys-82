
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package } from "@/data/types/packageTypes";
import { useIsMobile } from "@/hooks/use-mobile";

interface PackagePerformanceTableProps {
  packageSalesData: {
    name: string;
    vendas: number;
    receita: number;
  }[];
  packages: Package[];
}

const PackagePerformanceTable = ({ packageSalesData, packages }: PackagePerformanceTableProps) => {
  const isMobile = useIsMobile();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Desempenho por Pacote</CardTitle>
        <CardDescription>
          Lista dos pacotes mais vendidos no período
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 sm:px-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pacote</TableHead>
                {!isMobile && <TableHead>Preço</TableHead>}
                <TableHead>Vendas</TableHead>
                <TableHead>Receita</TableHead>
                <TableHead>% do Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packageSalesData.slice(0, 5).map((pkg, index) => {
                const totalSales = packageSalesData.reduce((acc, curr) => acc + curr.vendas, 0);
                const percentage = ((pkg.vendas / totalSales) * 100).toFixed(1);
                
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {isMobile && pkg.name.length > 15 
                        ? pkg.name.substring(0, 15) + '...' 
                        : pkg.name}
                    </TableCell>
                    {!isMobile && (
                      <TableCell>
                        R$ {packages.find(p => p.title === pkg.name)?.price.toLocaleString()}
                      </TableCell>
                    )}
                    <TableCell>{pkg.vendas}</TableCell>
                    <TableCell>R$ {pkg.receita.toLocaleString()}</TableCell>
                    <TableCell>{percentage}%</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PackagePerformanceTable;
