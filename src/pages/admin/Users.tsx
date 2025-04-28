import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import UserFilters from "@/components/admin/users/UserFilters";
import UsersTable from "@/components/admin/users/UsersTable";
import DeleteUserDialog from "@/components/admin/users/DeleteUserDialog";
import UserFormDialog from "@/components/admin/users/UserFormDialog";
import { User } from "@/components/admin/users/types";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { hasPermission, grantPermission, revokePermission, revokeAllPermissions } from "@/lib/role-helpers";
import { auditService, AuditAction } from "@/services/audit-service";
import { useAuth } from "@/contexts/AuthContext";

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
  const [userPermissions, setUserPermissions] = useState<Record<string, string[]>>({});
  
  const { user: currentUser } = useAuth();
  const [isMasterUser, setIsMasterUser] = useState(false);

  // Define permission types
  const standardPermissions = ['read', 'write', 'delete', 'admin', 'master'];

  // Check if current user is a master
  useEffect(() => {
    const checkMasterStatus = async () => {
      if (currentUser) {
        const isMaster = await hasPermission(currentUser.id, 'master');
        setIsMasterUser(isMaster);
      }
    };
    
    checkMasterStatus();
  }, [currentUser]);

  // Fetch users from Supabase
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // First get users from user_profiles
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
          
          // Get user permissions
          // Instead of directly querying, check each permission type
          const permissionsList = await Promise.all(
            standardPermissions.map(async (perm) => {
              const { data } = await supabase.rpc('user_has_permission', {
                user_id: profile.id, 
                required_permission: perm
              });
              return data ? perm : null;
            })
          );
          
          // Filter out null values
          const userPerms = permissionsList.filter(Boolean) as string[];
          
          // Store permissions for each user
          setUserPermissions(prev => ({
            ...prev,
            [profile.id]: userPerms
          }));
          
          // Add a status field (active/inactive)
          const status = 'active'; // Default all users to active
            
          return {
            id: profile.id,
            name: profile.name || 'User',
            email: profile.email || '',
            role: role,
            status: status,
            created_at: profile.created_at,
            avatar: profile.avatar_url || null
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
            avatar: profile.avatar_url || null
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
      // Delete user_permissions first using the RPC function
      await revokeAllPermissions(userToDelete.id);
      
      // Delete user_roles next
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
      
      // Log the deletion
      if (currentUser) {
        await auditService.addAuditLog(
          currentUser,
          AuditAction.DELETE,
          'user_profiles',
          userToDelete.id,
          { id: userToDelete.id, name: userToDelete.name, email: userToDelete.email },
          null
        );
      }
      
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

  // Handle role change
  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      // Get current role
      const { data: currentRoles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);
      
      const currentRole = currentRoles && currentRoles.length > 0 ? currentRoles[0].role : null;
      
      // If the role is the same, do nothing
      if (currentRole === newRole) return;
      
      // Delete current role
      if (currentRole) {
        const { error: deleteError } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId);
        
        if (deleteError) throw deleteError;
      }
      
      // Insert new role
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert([{ user_id: userId, role: newRole }]);
      
      if (insertError) throw insertError;
      
      // Log role change
      if (currentUser) {
        await auditService.logRoleChange(currentUser, userId, currentRole, newRole);
      }
      
      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
      
      toast.success(`Papel do usuário alterado para ${newRole}`);
    } catch (error) {
      console.error("Error changing user role:", error);
      toast.error("Erro ao alterar papel do usuário");
    }
  };

  // Handle permission grant/revoke
  const handlePermissionToggle = async (userId: string, permission: string, hasPermission: boolean) => {
    try {
      if (hasPermission) {
        // Revoke permission
        const success = await revokePermission(userId, permission);
        if (!success) throw new Error("Failed to revoke permission");
        
        // Log permission revoke
        if (currentUser) {
          await auditService.logPermissionChange(currentUser, 'revoke', userId, permission);
        }
        
        // Update local state
        setUserPermissions(prev => ({
          ...prev,
          [userId]: prev[userId].filter(p => p !== permission)
        }));
        
        toast.success(`Permissão '${permission}' revogada`);
      } else {
        // Grant permission
        const success = await grantPermission(userId, permission);
        if (!success) throw new Error("Failed to grant permission");
        
        // Log permission grant
        if (currentUser) {
          await auditService.logPermissionChange(currentUser, 'grant', userId, permission);
        }
        
        // Update local state
        setUserPermissions(prev => ({
          ...prev,
          [userId]: [...(prev[userId] || []), permission]
        }));
        
        toast.success(`Permissão '${permission}' concedida`);
      }
    } catch (error) {
      console.error("Error toggling permission:", error);
      toast.error("Erro ao modificar permissão");
    }
  };

  // Promote user to master (only if no master exists yet)
  const handlePromoteMaster = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .rpc('promote_to_master', { target_user_id: userId });
      
      if (error) throw error;
      
      if (data) {
        // Success - master user was created
        toast.success("Usuário promovido a Master");
        
        // Log the promotion
        if (currentUser) {
          await auditService.logRoleChange(currentUser, userId, 'admin', 'master');
        }
        
        // Update local state
        setUsers(users.map(user => 
          user.id === userId ? { ...user, role: 'master' } : user
        ));
      } else {
        // Failed - a master user already exists
        toast.error("Já existe um usuário Master no sistema");
      }
    } catch (error) {
      console.error("Error promoting to master:", error);
      toast.error("Erro ao promover usuário para Master");
    }
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
    <AdminLayout pageTitle="Gerenciar Usuários" requiresMaster={false}>
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
        permissions={userPermissions}
        isMasterUser={isMasterUser}
        actions={{
          onEmailClick: handleEmailClick,
          onEditClick: handleEditClick,
          onDeleteClick: handleDeleteClick,
          onRoleChange: handleRoleChange,
          onPermissionToggle: handlePermissionToggle,
          onPromoteMaster: handlePromoteMaster
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
