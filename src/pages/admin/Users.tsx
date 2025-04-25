
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import UserFilters from "@/components/admin/users/UserFilters";
import UsersTable from "@/components/admin/users/UsersTable";
import DeleteUserDialog from "@/components/admin/users/DeleteUserDialog";
import UserFormDialog from "@/components/admin/users/UserFormDialog";
import { User } from "@/components/admin/users/types";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<string | undefined>(undefined);
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Fetch users from Supabase
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // First get users from auth.users using admin functions
      const { data: profiles, error } = await supabase
        .from('user_profiles')
        .select('*');
      
      if (error) throw error;
      
      // Get roles for each user
      const usersWithRoles = await Promise.all(profiles.map(async (profile) => {
        try {
          const { data: roles } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', profile.id);
          
          const role = roles && roles.length > 0 
            ? roles[0].role 
            : 'customer';
            
          return {
            id: profile.id,
            name: profile.name || 'User',
            email: profile.email || '',
            role: role,
            status: profile.status || 'active', // Add fallback for status
            created_at: profile.created_at,
            avatar: null // You could add an avatar field to profiles
          };
        } catch (e) {
          console.error("Error fetching user role:", e);
          return {
            id: profile.id,
            name: profile.name || 'User',
            email: profile.email || '',
            role: 'customer',
            status: 'active',
            created_at: profile.created_at,
            avatar: null
          };
        }
      }));
      
      setUsers(usersWithRoles);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Erro ao carregar usuários");
    } finally {
      setIsLoading(false);
    }
  };

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle user actions
  const handleEmailClick = (user: User) => {
    window.open(`mailto:${user.email}`);
  };

  const handleEditClick = (user: User) => {
    setUserToEdit(user.id);
    setFormDialogOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    
    try {
      // Delete user_roles first
      const { error: roleError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userToDelete.id);
      
      if (roleError) throw roleError;
      
      // Then delete user profile
      const { error: profileError } = await supabase
        .from('user_profiles')
        .delete()
        .eq('id', userToDelete.id);
      
      if (profileError) throw profileError;
      
      // Finally, remove from our local state
      setUsers(users.filter(user => user.id !== userToDelete.id));
      toast.success("Usuário removido com sucesso");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Erro ao remover usuário");
    } finally {
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  // Handle adding new user
  const handleAddNewUser = () => {
    setUserToEdit(undefined);
    setFormDialogOpen(true);
  };

  // Handle form success
  const handleFormSuccess = () => {
    fetchUsers();
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
        isLoading={isLoading}
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
