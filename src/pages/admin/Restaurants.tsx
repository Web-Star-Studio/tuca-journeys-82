
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useRestaurants } from "@/hooks/use-restaurants";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import RestaurantFormDialog from "@/components/admin/restaurant/RestaurantFormDialog";
import RestaurantsList from "@/components/admin/restaurant/RestaurantsList";
import DeleteRestaurantDialog from "@/components/admin/restaurant/DeleteRestaurantDialog";

const Restaurants = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [restaurantToEdit, setRestaurantToEdit] = useState<number | undefined>(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [restaurantToDelete, setRestaurantToDelete] = useState<any | null>(null);

  const {
    restaurants,
    isLoading,
    error,
    deleteRestaurant,
    isDeleting,
  } = useRestaurants();

  const filteredRestaurants = restaurants?.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditClick = (restaurant: any) => {
    setRestaurantToEdit(restaurant.id);
    setFormDialogOpen(true);
  };

  const handleDeleteClick = (restaurant: any) => {
    setRestaurantToDelete(restaurant);
    setDeleteDialogOpen(true);
  };

  const handleFormClose = () => {
    setFormDialogOpen(false);
    setRestaurantToEdit(undefined);
  };

  const confirmDelete = async () => {
    if (!restaurantToDelete) return;
    
    try {
      await deleteRestaurant(restaurantToDelete.id);
      setDeleteDialogOpen(false);
      setRestaurantToDelete(null);
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };

  return (
    <AdminLayout pageTitle="Gerenciar Restaurantes">
      <div className="w-full space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold">Restaurantes</h2>
            <p className="text-sm text-muted-foreground">
              Gerencie os restaurantes disponíveis na plataforma
            </p>
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="flex items-center w-full sm:w-auto">
              <Input
                placeholder="Buscar restaurantes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="sm:w-[250px]"
              />
              <Button variant="ghost" size="icon" className="ml-1">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            
            <Button onClick={() => setFormDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Restaurante
            </Button>
          </div>
        </div>

        <RestaurantsList 
          restaurants={filteredRestaurants || []} 
          isLoading={isLoading}
          error={error}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />

        <RestaurantFormDialog
          open={formDialogOpen}
          onOpenChange={setFormDialogOpen}
          restaurantId={restaurantToEdit}
          onSuccess={handleFormClose}
        />

        <DeleteRestaurantDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirmDelete={confirmDelete}
          isDeleting={isDeleting}
          restaurantName={restaurantToDelete?.name || ""}
        />
      </div>
    </AdminLayout>
  );
};

export default Restaurants;
