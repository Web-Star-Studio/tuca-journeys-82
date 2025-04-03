
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import UserFilters from "@/components/admin/users/UserFilters";
import UsersTable from "@/components/admin/users/UsersTable";
import DeleteUserDialog from "@/components/admin/users/DeleteUserDialog";
import UserFormDialog from "@/components/admin/users/UserFormDialog";
import { User } from "@/components/admin/users/types";

// Sample user data (would come from API in real implementation)
const dummyUsers: User[] = [
  {
    id: 1,
    name: "Maria Silva",
    email: "maria@example.com",
    role: "customer",
    status: "active",
    created_at: "2023-06-15",
    avatar: null,
  },
  {
    id: 2,
    name: "João Oliveira",
    email: "joao@example.com",
    role: "customer",
    status: "active",
    created_at: "2023-07-22",
    avatar: null,
  },
  {
    id: 3,
    name: "Ana Souza",
    email: "ana@example.com",
    role: "admin",
    status: "active",
    created_at: "2023-05-10",
    avatar: null,
  },
  {
    id: 4,
    name: "Carlos Pereira",
    email: "carlos@example.com",
    role: "customer",
    status: "inactive",
    created_at: "2023-08-05",
    avatar: null,
  },
];

const Users = () => {
  const [users] = useState(dummyUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<number | undefined>(undefined);
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Handle user actions
  const handleEmailClick = (user: User) => {
    console.log("Email user:", user.email);
    // Implement email functionality
  };

  const handleEditClick = (user: User) => {
    setUserToEdit(user.id);
    setFormDialogOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log("Deleting user:", userToDelete?.id);
    // Here we would call the API to delete the user
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  // Handle adding new user
  const handleAddNewUser = () => {
    setUserToEdit(undefined);
    setFormDialogOpen(true);
  };

  // Handle form success
  const handleFormSuccess = () => {
    // Refresh user data
    console.log("User saved successfully");
  };

  // Filter users based on search query, role and status
  const filteredUsers = users.filter(
    (user) => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const matchesStatus = statusFilter === "all" || user.status === statusFilter;
      
      return matchesSearch && matchesRole && matchesStatus;
    }
  );

  return (
    <AdminLayout pageTitle="Gerenciar Usuários">
      <UserFilters 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        onAddUserClick={handleAddNewUser}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      
      <UsersTable 
        users={filteredUsers}
        actions={{
          onEmailClick: handleEmailClick,
          onEditClick: handleEditClick,
          onDeleteClick: handleDeleteClick,
        }}
      />

      <DeleteUserDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        user={userToDelete}
        onConfirmDelete={confirmDelete}
      />

      <UserFormDialog 
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        userId={userToEdit}
        onSuccess={handleFormSuccess}
      />
    </AdminLayout>
  );
};

export default Users;
