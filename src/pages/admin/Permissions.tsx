import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Search } from "lucide-react";
import { hasPermission, grantPermission, revokePermission } from "@/lib/role-helpers";
import { auditService } from "@/services/audit-service";
import { useAuth } from "@/contexts/AuthContext";
import { User } from "@/components/admin/users/types";

// Define permission types
const standardPermissions = ['read', 'write', 'delete', 'admin', 'master'];

const Permissions = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [userPermissions, setUserPermissions] = useState<Record<string, string[]>>({});
  
  const { user: currentUser } = useAuth();
  
  // Fetch users
  const fetchUsers = async () => {
    setIsLoading(true);
    
    try {
      // Get user profiles
      const { data: profiles, error } = await supabase
        .from('user_profiles')
        .select('*');
      
      if (error) throw error;
      
      // Get roles and build user objects
      const usersWithRoles = await Promise.all(profiles.map(async (profile) => {
        // Get role
        const { data: roles } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', profile.id);
        
        const role = roles && roles.length > 0 ? roles[0].role : 'customer';
        
        // Get permissions using RPC function for each permission type
        const permissionsList = await Promise.all(
          standardPermissions.map(async (perm) => {
            const { data } = await supabase.rpc('user_has_permission', {
              user_id: profile.id, 
              required_permission: perm
            });
            return data ? perm : null;
          })
        );
        
        // Filter out null values and update permissions state
        const userPerms = permissionsList.filter(Boolean) as string[];
        
        setUserPermissions(prev => ({
          ...prev,
          [profile.id]: userPerms
        }));
        
        return {
          id: profile.id,
          name: profile.name || 'User',
          email: profile.email || '',
          role: role,
          status: 'active', // Default all users to active
          created_at: profile.created_at,
          avatar: profile.avatar_url || null
        };
      }));
      
      setUsers(usersWithRoles);
      setFilteredUsers(usersWithRoles);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Erro ao carregar usuários");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load users on mount
  useEffect(() => {
    fetchUsers();
  }, []);
  
  // Filter users when search or role filter changes
  useEffect(() => {
    if (!users.length) return;
    
    const filtered = users.filter(user => {
      const matchesSearch = searchQuery 
        ? (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           user.email.toLowerCase().includes(searchQuery.toLowerCase()))
        : true;
      
      const matchesRole = roleFilter !== 'all' 
        ? user.role === roleFilter 
        : true;
      
      return matchesSearch && matchesRole;
    });
    
    setFilteredUsers(filtered);
  }, [searchQuery, roleFilter, users]);
  
  // Handle permission toggle
  const handlePermissionToggle = async (userId: string, permission: string) => {
    try {
      const userPermList = userPermissions[userId] || [];
      const hasThisPermission = userPermList.includes(permission);
      
      if (hasThisPermission) {
        // Revoke permission
        const success = await revokePermission(userId, permission);
        
        if (!success) {
          throw new Error(`Failed to revoke ${permission} permission`);
        }
        
        // Update local state
        setUserPermissions(prev => ({
          ...prev,
          [userId]: prev[userId].filter(p => p !== permission)
        }));
        
        // Log the change
        if (currentUser) {
          await auditService.logPermissionChange(currentUser, 'revoke', userId, permission);
        }
        
        toast.success(`Permissão ${permission} revogada com sucesso`);
      } else {
        // Grant permission
        const success = await grantPermission(userId, permission);
        
        if (!success) {
          throw new Error(`Failed to grant ${permission} permission`);
        }
        
        // Update local state
        setUserPermissions(prev => ({
          ...prev,
          [userId]: [...(prev[userId] || []), permission]
        }));
        
        // Log the change
        if (currentUser) {
          await auditService.logPermissionChange(currentUser, 'grant', userId, permission);
        }
        
        toast.success(`Permissão ${permission} concedida com sucesso`);
      }
    } catch (error) {
      console.error("Error toggling permission:", error);
      toast.error("Erro ao alterar permissão");
    }
  };
  
  return (
    <AdminLayout pageTitle="Gerenciar Permissões" requiresMaster={true}>
      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>
            Filtre usuários por nome, email ou papel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar por nome ou email"
                className="pl-9 w-full md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select
              value={roleFilter}
              onValueChange={setRoleFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por papel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os papéis</SelectItem>
                <SelectItem value="master">Master</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="partner">Parceiro</SelectItem>
                <SelectItem value="customer">Cliente</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setRoleFilter('all');
            }}>
              Limpar filtros
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Permissions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tabela de Permissões</CardTitle>
          <CardDescription>
            Gerencie as permissões dos usuários no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Nenhum usuário encontrado
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Papel</TableHead>
                    {standardPermissions.map(permission => (
                      <TableHead key={permission} className="text-center">
                        {permission}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium
                          ${user.role === 'master' ? 'bg-yellow-100 text-yellow-800' : ''}
                          ${user.role === 'admin' ? 'bg-blue-100 text-blue-800' : ''}
                          ${user.role === 'partner' ? 'bg-purple-100 text-purple-800' : ''}
                          ${user.role === 'customer' ? 'bg-green-100 text-green-800' : ''}
                        `}>
                          {user.role}
                        </span>
                      </TableCell>
                      
                      {/* Permission switches */}
                      {standardPermissions.map(permission => {
                        // Determine if this permission is granted by role
                        const grantedByRole = 
                          (permission === 'read' && ['admin', 'master'].includes(user.role)) ||
                          (permission === 'write' && ['admin', 'master'].includes(user.role)) ||
                          (permission === 'delete' && ['admin', 'master'].includes(user.role)) ||
                          (permission === 'admin' && ['admin', 'master'].includes(user.role)) ||
                          (permission === 'master' && user.role === 'master');
                        
                        // Determine if this permission is explicitly granted
                        const explicitlyGranted = 
                          userPermissions[user.id]?.includes(permission);
                        
                        // User has this permission if it's granted by role or explicitly granted
                        const hasPermission = grantedByRole || explicitlyGranted;
                        
                        // Disable the toggle if the permission is granted by role or if it's the master permission for non-master users
                        const disabled = grantedByRole || (permission === 'master' && user.role !== 'master');
                        
                        return (
                          <TableCell key={`${user.id}-${permission}`} className="text-center">
                            <Switch
                              checked={hasPermission}
                              onCheckedChange={() => handlePermissionToggle(user.id, permission)}
                              disabled={disabled}
                            />
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Legend */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Legenda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <h3 className="font-medium mb-2">Papéis dos Usuários</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mr-2">
                    master
                  </span>
                  <span>Acesso total ao sistema, incluindo gerenciamento de permissões</span>
                </li>
                <li className="flex items-center">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                    admin
                  </span>
                  <span>Acesso administrativo ao sistema</span>
                </li>
                <li className="flex items-center">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mr-2">
                    partner
                  </span>
                  <span>Parceiros com acesso limitado</span>
                </li>
                <li className="flex items-center">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                    customer
                  </span>
                  <span>Usuários comuns do sistema</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Permissões</h3>
              <ul className="space-y-2">
                <li><strong>read</strong>: Permite visualizar recursos</li>
                <li><strong>write</strong>: Permite criar e editar recursos</li>
                <li><strong>delete</strong>: Permite excluir recursos</li>
                <li><strong>admin</strong>: Concede acesso administrativo</li>
                <li><strong>master</strong>: Concede acesso total ao sistema</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Notas</h3>
              <ul className="space-y-2">
                <li>As caixas desativadas indicam permissões concedidas pelo papel do usuário</li>
                <li>Usuários admin têm permissões de leitura, escrita e exclusão por padrão</li>
                <li>Apenas um usuário pode ter o papel master no sistema</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default Permissions;
