
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useActivities } from "@/hooks/use-activities";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Loader2 } from "lucide-react";
import ActivityList from "@/components/admin/activity/ActivityList";
import ActivityFormDialog from "@/components/admin/activity/ActivityFormDialog";
import ActivityDeleteDialog from "@/components/admin/activity/ActivityDeleteDialog";
import { Activity } from "@/types/activity";
import { toast } from "sonner";

const AdminActivities = () => {
  // State management for UI
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [activityToEdit, setActivityToEdit] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState<Activity | null>(null);
  
  const { 
    activities,
    isLoading, 
    error,
    deleteActivity,
    isDeleting
  } = useActivities();

  // Filter activities based on search query
  const filteredActivities = activities?.filter(
    (activity) =>
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle activity edit
  const handleEditClick = (activity: Activity) => {
    setActivityToEdit(activity.id);
    setIsFormDialogOpen(true);
  };

  // Handle activity delete
  const handleDeleteClick = (activity: Activity) => {
    setActivityToDelete(activity);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!activityToDelete) return;
    
    try {
      await deleteActivity(activityToDelete.id);
      setDeleteDialogOpen(false);
      setActivityToDelete(null);
    } catch (error) {
      console.error("Error deleting activity:", error);
      toast.error("Failed to delete activity");
    }
  };

  const handleFormClose = () => {
    setIsFormDialogOpen(false);
    setActivityToEdit(null);
  };

  return (
    <AdminLayout pageTitle="Gerenciar Atividades">
      <div className="w-full space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold">Atividades</h2>
            <p className="text-sm text-muted-foreground">
              Gerencie as atividades disponíveis na plataforma
            </p>
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="flex items-center w-full sm:w-auto">
              <Input
                placeholder="Buscar atividades..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="sm:w-[250px]"
              />
              <Button variant="ghost" size="icon" className="ml-1">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            
            <Button onClick={() => setIsFormDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Atividade
            </Button>
          </div>
        </div>

        {/* Activities list */}
        {isLoading ? (
          <div className="flex justify-center items-center p-12">
            <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-md">
            Erro ao carregar atividades. Por favor, tente novamente mais tarde.
          </div>
        ) : (
          <ActivityList
            activities={filteredActivities || []}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        )}

        {/* Activity form dialog */}
        <ActivityFormDialog
          open={isFormDialogOpen}
          onOpenChange={setIsFormDialogOpen}
          activityId={activityToEdit}
          onSuccess={handleFormClose}
        />

        {/* Delete confirmation dialog */}
        <ActivityDeleteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirmDelete={confirmDelete}
          isDeleting={isDeleting}
          activityName={activityToDelete?.title || ""}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminActivities;
