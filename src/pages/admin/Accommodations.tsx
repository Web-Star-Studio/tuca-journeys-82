
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAccommodations } from "@/hooks/use-accommodations";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";
import { Accommodation } from "@/types/database";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import AccommodationFormDialog from "@/components/admin/accommodations/AccommodationFormDialog";

const AdminAccommodations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editAccommodationId, setEditAccommodationId] = useState<number | undefined>(undefined);

  const { 
    accommodations, 
    isLoading, 
    error, 
    refetch 
  } = useAccommodations();

  // Filter accommodations based on search and type
  const filteredAccommodations = accommodations
    .filter((acc) =>
      acc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((acc) => typeFilter === "all" || acc.type === typeFilter);

  const accommodationTypes = [
    { value: "all", label: "Todos os tipos" },
    { value: "hotel", label: "Hotel" },
    { value: "pousada", label: "Pousada" },
    { value: "resort", label: "Resort" },
    { value: "apartamento", label: "Apartamento" },
    { value: "casa", label: "Casa" },
  ];

  // Handle accommodation edit
  const handleEditClick = (accommodation: Accommodation) => {
    setEditAccommodationId(accommodation.id);
    setShowForm(true);
  };

  return (
    <AdminLayout pageTitle="Gerenciar Hospedagens">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full flex-1 flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar hospedagens..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            value={typeFilter}
            onValueChange={setTypeFilter}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              {accommodationTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => {
          setEditAccommodationId(undefined);
          setShowForm(true);
        }}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Hospedagem
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center items-center h-60">
              <p>Carregando hospedagens...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-60">
              <p className="text-red-500">Erro ao carregar hospedagens. Por favor, tente novamente.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead className="text-right">Preço/Noite</TableHead>
                    <TableHead className="text-right">Avaliação</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAccommodations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        Nenhuma hospedagem encontrada
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAccommodations.map((accommodation) => (
                      <TableRow key={accommodation.id}>
                        <TableCell className="font-medium">{accommodation.title}</TableCell>
                        <TableCell className="capitalize">{accommodation.type}</TableCell>
                        <TableCell>{accommodation.address || accommodation.location}</TableCell>
                        <TableCell className="text-right">
                          R$ {accommodation.price_per_night.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">{accommodation.rating}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditClick(accommodation)}
                          >
                            Editar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AccommodationFormDialog
        open={showForm}
        onOpenChange={setShowForm}
        accommodationId={editAccommodationId}
        onSuccess={() => {
          setShowForm(false);
          refetch();
        }}
      />
    </AdminLayout>
  );
};

export default AdminAccommodations;
