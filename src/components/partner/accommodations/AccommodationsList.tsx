
import React from "react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Pencil, Trash2, Eye } from "lucide-react";
import { Accommodation } from "@/types/database";

interface AccommodationsListProps {
  accommodations: Accommodation[];
  isLoading: boolean;
}

const AccommodationsList = ({ accommodations, isLoading }: AccommodationsListProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (accommodations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Nenhuma Hospedagem Encontrada</CardTitle>
          <CardDescription>
            Você ainda não cadastrou nenhuma hospedagem. Clique no botão "Nova Hospedagem" para começar.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {accommodations.map((accommodation) => (
        <Card key={accommodation.id} className="overflow-hidden">
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
                    R$ {accommodation.price.toLocaleString('pt-BR')} /noite
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
      ))}
    </div>
  );
};

export default AccommodationsList;
