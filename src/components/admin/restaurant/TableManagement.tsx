
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useRestaurantDetails, useRestaurantAdmin } from '@/hooks/use-restaurants';
import TableList from '@/components/admin/restaurant/TableList';
import TableFormDialog from '@/components/admin/restaurant/TableFormDialog';
import TableVisualMap from '@/components/admin/restaurant/TableVisualMap';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { RestaurantTable } from '@/types/restaurant';

const TableManagement: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const restaurantId = id ? parseInt(id) : 0;
  
  const { restaurant, tables, isLoading } = useRestaurantDetails(restaurantId);
  const { addTable, updateTable, deleteTable } = useRestaurantAdmin();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<RestaurantTable | null>(null);
  const [view, setView] = useState<'list' | 'visual'>('list');

  const handleEditTable = (table: RestaurantTable) => {
    setSelectedTable(table);
    setIsDialogOpen(true);
  };

  const handleDeleteTable = async (tableId: number) => {
    if (confirm('Tem certeza que deseja excluir esta mesa?')) {
      deleteTable(tableId);
    }
  };

  if (isLoading) {
    return <div className="text-center p-8">Carregando...</div>;
  }

  if (!restaurant) {
    return <div className="text-center p-8">Restaurante não encontrado</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciamento de Mesas - {restaurant.name}</h2>
        <Button onClick={() => {
          setSelectedTable(null);
          setIsDialogOpen(true);
        }}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Mesa
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Mesas do Restaurante</CardTitle>
            <Tabs value={view} onValueChange={(v) => setView(v as 'list' | 'visual')}>
              <TabsList>
                <TabsTrigger value="list">Lista</TabsTrigger>
                <TabsTrigger value="visual">Visual</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <TabsContent value="list" className="mt-0">
            <TableList 
              tables={tables || []}
              onEdit={handleEditTable}
              onDelete={handleDeleteTable}
            />
          </TabsContent>
          <TabsContent value="visual" className="mt-0">
            <TableVisualMap 
              tables={tables || []}
              onSelectTable={handleEditTable}
            />
          </TabsContent>
        </CardContent>
      </Card>

      <TableFormDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        table={selectedTable}
        restaurantId={restaurantId}
        onSave={selectedTable ? updateTable : addTable}
      />
    </div>
  );
};

export default TableManagement;
