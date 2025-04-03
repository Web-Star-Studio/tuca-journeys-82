
import React from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2, ExternalLink } from "lucide-react";
import { Package } from "@/data/types/packageTypes";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import SafeImage from "@/components/ui/safe-image";
import { Loader2 } from "lucide-react";

interface PackageTableProps {
  packages: Package[];
  isLoading: boolean;
  error: Error | null;
  onEditClick: (packageId: number) => void;
  onDeleteClick: (packageId: number) => void;
}

const PackageTable: React.FC<PackageTableProps> = ({
  packages,
  isLoading,
  error,
  onEditClick,
  onDeleteClick,
}) => {
  // Get category badge styling
  const getCategoryBadge = (pkg: Package) => {
    let category = "";
    let variant: "default" | "secondary" | "outline" | "destructive" = "default";
    
    if (pkg.id >= 1 && pkg.id <= 2 || pkg.id === 6) {
      category = "Romântico";
      variant = "default";
    } else if (pkg.id >= 3 && pkg.id <= 4) {
      category = "Aventura";
      variant = "secondary";
    } else if (pkg.id === 5) {
      category = "Família";
      variant = "outline";
    } else if (pkg.id === 6) {
      category = "Premium";
      variant = "destructive";
    } else {
      category = "Econômico";
      variant = "outline";
    }
    
    return <Badge variant={variant}>{category}</Badge>;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-tuca-ocean-blue" />
        <span className="ml-2 text-lg">Carregando pacotes...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md border bg-white p-8 text-center">
        <p className="text-red-500">Erro ao carregar pacotes. Por favor, tente novamente.</p>
        <p className="text-sm text-gray-500 mt-2">{String(error)}</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Imagem</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Dias</TableHead>
            <TableHead>Pessoas</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Avaliação</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packages.length > 0 ? (
            packages.map((pkg) => (
              <TableRow key={pkg.id}>
                <TableCell className="font-medium">{pkg.id}</TableCell>
                <TableCell>
                  <SafeImage
                    src={pkg.image}
                    alt={pkg.title}
                    className="h-10 w-16 object-cover rounded"
                    fallbackSrc="/placeholder.svg"
                  />
                </TableCell>
                <TableCell className="font-medium">{pkg.title}</TableCell>
                <TableCell>{getCategoryBadge(pkg)}</TableCell>
                <TableCell>{pkg.days} dias</TableCell>
                <TableCell>{pkg.persons} pessoas</TableCell>
                <TableCell>R$ {pkg.price.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="mr-1 text-yellow-500">★</span>
                    {pkg.rating}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="h-8 w-8"
                    >
                      <Link to={`/pacotes/${pkg.id}`} target="_blank">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-blue-600"
                      onClick={() => onEditClick(pkg.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-600"
                      onClick={() => onDeleteClick(pkg.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="h-24 text-center">
                Nenhum pacote encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PackageTable;
