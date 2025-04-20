
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Eye } from "lucide-react";
import { Accommodation } from "@/types/database";

interface AccommodationItemProps {
  accommodation: Accommodation;
}

const AccommodationItem = ({ accommodation }: AccommodationItemProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-medium">{accommodation.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {accommodation.description}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={accommodation.is_available ? "default" : "secondary"}>
                {accommodation.is_available ? "Disponível" : "Indisponível"}
              </Badge>
              <span className="text-sm text-muted-foreground">
                R$ {accommodation.price_per_night.toLocaleString('pt-BR')} /noite
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccommodationItem;
