
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2, Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRestaurants, useRestaurantAdmin } from '@/hooks/use-restaurants';

const RestaurantManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { restaurants, isLoading } = useRestaurants({ searchQuery });
  const { deleteRestaurant } = useRestaurantAdmin();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);

  const handleEditRestaurant = (restaurant: any) => {
    setSelectedRestaurant(restaurant);
    setIsDialogOpen(true);
  };

  const handleDeleteRestaurant = (restaurant: any) => {
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
    <AdminLayout>
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

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search restaurants..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {selectedRestaurant ? 'Edit Restaurant' : 'Add New Restaurant'}
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>Restaurant form will be implemented here.</p>
              <p>This is a placeholder for the restaurant form.</p>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the restaurant "{selectedRestaurant?.name}".
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                onClick={confirmDelete}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
};

interface RestaurantsListProps {
  restaurants: any[];
  isLoading: boolean;
  onEdit: (restaurant: any) => void;
  onDelete: (restaurant: any) => void;
}

const RestaurantsList: React.FC<RestaurantsListProps> = ({
  restaurants,
  isLoading,
  onEdit,
  onDelete
}) => {
  if (isLoading) {
    return <div className="text-center py-8">Loading restaurants...</div>;
  }

  if (restaurants.length === 0) {
    return (
      <div className="text-center py-8 bg-muted/20 rounded-lg">
        <p className="text-muted-foreground">No restaurants found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {restaurants.map(restaurant => (
        <Card key={restaurant.id}>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                <img
                  src={restaurant.image_url}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{restaurant.name}</h3>
                    <p className="text-sm text-muted-foreground">{restaurant.cuisine_type}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => onEdit(restaurant)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-red-500 hover:text-red-700" 
                      onClick={() => onDelete(restaurant)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-sm mt-2">{restaurant.location}</div>
                <div className="flex gap-2 mt-2">
                  {restaurant.is_featured && (
                    <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded">
                      Featured
                    </span>
                  )}
                  {!restaurant.is_active && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded">
                      Inactive
                    </span>
                  )}
                  <span className="bg-slate-100 text-slate-800 text-xs px-2 py-0.5 rounded">
                    {restaurant.price_range}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RestaurantManagement;
