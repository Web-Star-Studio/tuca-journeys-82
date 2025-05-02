
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRestaurants, useRestaurantAdmin } from '@/hooks/use-restaurants';
import RestaurantsList from '@/components/admin/restaurant/RestaurantsList';
import RestaurantSearch from '@/components/admin/restaurant/RestaurantSearch';
import RestaurantFormDialog from '@/components/admin/restaurant/RestaurantFormDialog';
import DeleteRestaurantDialog from '@/components/admin/restaurant/DeleteRestaurantDialog';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { Restaurant } from '@/types/restaurant';

const RestaurantManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { restaurants, isLoading } = useRestaurants({ searchQuery });
  const { deleteRestaurant } = useRestaurantAdmin();
  const navigate = useNavigate();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const handleViewRestaurant = (restaurant: Restaurant) => {
    navigate(`/admin/restaurants/${restaurant.id}`);
  };

  const handleEditRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsDialogOpen(true);
  };

  const handleDeleteRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedRestaurant) {
      deleteRestaurant(selectedRestaurant.id);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <AdminLayout pageTitle="Gestão de Restaurantes">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gestão de Restaurantes</h1>
          <Button onClick={() => {
            setSelectedRestaurant(null);
            setIsDialogOpen(true);
          }}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Restaurante
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative mb-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar restaurantes..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="active">Ativos</TabsTrigger>
            <TabsTrigger value="featured">Destaque</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <RestaurantsList
              restaurants={restaurants || []}
              isLoading={isLoading}
              onView={handleViewRestaurant}
              onEdit={handleEditRestaurant}
              onDelete={handleDeleteRestaurant}
            />
          </TabsContent>
          <TabsContent value="active">
            <RestaurantsList
              restaurants={(restaurants || []).filter(r => r.is_active)}
              isLoading={isLoading}
              onView={handleViewRestaurant}
              onEdit={handleEditRestaurant}
              onDelete={handleDeleteRestaurant}
            />
          </TabsContent>
          <TabsContent value="featured">
            <RestaurantsList
              restaurants={(restaurants || []).filter(r => r.is_featured)}
              isLoading={isLoading}
              onView={handleViewRestaurant}
              onEdit={handleEditRestaurant}
              onDelete={handleDeleteRestaurant}
            />
          </TabsContent>
        </Tabs>

        {/* Restaurant Form Dialog */}
        <RestaurantFormDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          restaurant={selectedRestaurant}
        />

        {/* Delete Confirmation Dialog */}
        <DeleteRestaurantDialog
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          restaurant={selectedRestaurant}
          onConfirmDelete={confirmDelete}
        />
      </div>
    </AdminLayout>
  );
};

export default RestaurantManagement;
