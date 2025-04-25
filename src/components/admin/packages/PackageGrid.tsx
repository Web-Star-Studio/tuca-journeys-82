
import React from "react";
import PackageCard from "./PackageCard";
import { Skeleton } from "@/components/ui/skeleton";

interface PackageGridProps {
  packages: any[];
  isLoading: boolean;
  onEditClick: (pkg: any) => void;
  onDeleteClick: (pkg: any) => void;
}

const PackageGrid = ({ packages, isLoading, onEditClick, onDeleteClick }: PackageGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="space-y-3">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (!packages || packages.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">Nenhum pacote encontrado</h3>
        <p className="text-muted-foreground">
          Tente ajustar os filtros ou adicione novos pacotes.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {packages.map((pkg) => (
        <PackageCard
          key={pkg.id}
          pkg={pkg}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </div>
  );
};

export default PackageGrid;
