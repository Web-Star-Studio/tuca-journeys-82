
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRestaurants, useRestaurantAdmin } from '@/hooks/use-restaurants';
import RestaurantsList from '@/components/admin/restaurant/RestaurantsList';
import RestaurantSearch from '@/components/admin/restaurant/RestaurantSearch';
import RestaurantFormDialog from '@/components/admin/restaurant/RestaurantFormDialog';
import DeleteRestaurantDialog from '@/components/admin/restaurant/DeleteRestaurantDialog';
import type { Restaurant } from '@/types/restaurant';

const RestaurantManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { restaurants, isLoading } = useRestaurants({ searchQuery });
  const { deleteRestaurant } = useRestaurantAdmin();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

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
    <AdminLayout pageTitle="Restaurant Management">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Restaurant Management</h1>
          <Button onClick={() => {
            setSelectedRestaurant(null);
            setIsDialogOpen(true);
          }}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Restaurant
          </Button>
        </div>

        <RestaurantSearch 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Restaurants</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <RestaurantsList
              restaurants={restaurants || []}
              isLoading={isLoading}
              onEdit={handleEditRestaurant}
              onDelete={handleDeleteRestaurant}
            />
          </TabsContent>
          <TabsContent value="active">
            <RestaurantsList
              restaurants={(restaurants || []).filter(r => r.is_active)}
              isLoading={isLoading}
              onEdit={handleEditRestaurant}
              onDelete={handleDeleteRestaurant}
            />
          </TabsContent>
          <TabsContent value="featured">
            <RestaurantsList
              restaurants={(restaurants || []).filter(r => r.is_featured)}
              isLoading={isLoading}
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
