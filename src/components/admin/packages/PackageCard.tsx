
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import SafeImage from "@/components/ui/safe-image";

interface PackageCardProps {
  pkg: {
    id: number;
    title: string;
    description: string;
    price: number;
    image_url: string;
    duration: number;
    max_guests: number;
  };
  onEditClick: (pkg: any) => void;
  onDeleteClick: (pkg: any) => void;
}

const PackageCard = ({ pkg, onEditClick, onDeleteClick }: PackageCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <SafeImage
          src={pkg.image_url}
          alt={pkg.title}
          className="w-full h-full object-cover"
          fallbackSrc="/placeholder.svg"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="font-semibold">
            {pkg.duration} dias
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2 truncate">{pkg.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
          {pkg.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">
            R$ {pkg.price.toLocaleString('pt-BR')}
          </span>
          <Badge variant="outline">
            até {pkg.max_guests} pessoas
          </Badge>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-end gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600"
          onClick={() => onEditClick(pkg)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-600"
          onClick={() => onDeleteClick(pkg)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PackageCard;
