import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase-client';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Accommodation } from '@/types/database';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";

const AccommodationsAdmin = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: accommodations, isLoading, error } = useQuery({
    queryKey: ['admin-accommodations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('accommodations')
        .select('*');

      if (error) throw error;
      return data as Accommodation[];
    },
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [accommodationToDelete, setAccommodationToDelete] = React.useState<number | null>(null);

  const deleteAccommodationMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('accommodations')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-accommodations'] });
      toast({
        title: "Hospedagem excluída",
        description: "Hospedagem excluída com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Erro ao excluir",
        description: error.message,
      });
    },
  });

  const handleDelete = (id: number) => {
    setAccommodationToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (accommodationToDelete !== null) {
      deleteAccommodationMutation.mutate(accommodationToDelete);
      setDeleteDialogOpen(false);
      setAccommodationToDelete(null);
    }
  };

  const columns: ColumnDef<Accommodation>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "title",
      header: "Título",
    },
    {
      accessorKey: "type",
      header: "Tipo",
    },
    {
      accessorKey: "price_per_night",
      header: "Preço por noite",
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price_per_night"));
        const formatted = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price);
        return <div className="font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "bedrooms",
      header: "Quartos",
    },
    {
      accessorKey: "max_guests",
      header: "Max. Hóspedes",
    },
    {
      accessorKey: "rating",
      header: "Avaliação",
    },
    {
      accessorKey: "address", // Use address instead of location
      header: "Localização",
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Link to={`/parceiro/hospedagens/${row.original.id}/disponibilidade`}>
            <Button variant="ghost" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => handleDelete(row.original.id)}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ),
    },
  ]

  const table = useReactTable({
    data: accommodations || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <AdminLayout pageTitle="Gerenciar Hospedagens">
        <div>Carregando...</div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout pageTitle="Gerenciar Hospedagens">
        <div>Erro ao carregar as hospedagens.</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout pageTitle="Gerenciar Hospedagens">
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Hospedagens</CardTitle>
          <CardDescription>
            Visualize, edite e exclua as hospedagens cadastradas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Lista de hospedagens cadastradas.</TableCaption>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4">
            <Link to="/admin/nova-hospedagem">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Hospedagem
              </Button>
            </Link>
          </div>
        </CardContent>
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação é irreversível. Tem certeza que deseja excluir esta
                hospedagem?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setAccommodationToDelete(null)}>
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} disabled={deleteAccommodationMutation.isPending}>
                {deleteAccommodationMutation.isPending ? 'Excluindo...' : 'Excluir'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Card>
    </AdminLayout>
  );
};

export default AccommodationsAdmin;
