
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuditAction, AuditLog, auditService } from "@/services/audit-service";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AuditLogs = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [userFilter, setUserFilter] = useState<string>("");
  const [tableFilter, setTableFilter] = useState<string>("");
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersMap, setUsersMap] = useState<Record<string, string>>({});
  
  const pageSize = 20;
  
  // Fetch logs
  const fetchLogs = async () => {
    setIsLoading(true);
    
    try {
      const filters: Record<string, any> = {};
      
      if (actionFilter && actionFilter !== "all") {
        filters.action = actionFilter;
      }
      
      if (userFilter) {
        filters.userId = userFilter;
      }
      
      if (tableFilter) {
        filters.tableName = tableFilter;
      }
      
      // Fetch audit logs with filters
      const { data: logsData, count } = await auditService.getAuditLogs(filters, currentPage, pageSize);
      
      if (logsData) {
        setLogs(logsData);
        setTotalCount(count || 0);
        
        // Collect all user IDs from the logs
        const userIds = new Set<string>();
        logsData.forEach(log => {
          if (log.user_id) userIds.add(log.user_id);
          if (log.target_user_id) userIds.add(log.target_user_id);
        });
        
        // Fetch user data for these IDs
        if (userIds.size > 0) {
          const { data: userData } = await supabase
            .from('user_profiles')
            .select('id, name, email')
            .in('id', Array.from(userIds));
            
          if (userData) {
            const userMap: Record<string, string> = {};
            userData.forEach(user => {
              userMap[user.id] = user.name || user.email || 'Unknown User';
            });
            setUsersMap(userMap);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching audit logs:", error);
      toast.error("Erro ao carregar logs de auditoria");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load logs when filters or page changes
  useEffect(() => {
    fetchLogs();
  }, [actionFilter, currentPage]);
  
  // Handle filter changes
  const handleFilterChange = () => {
    setCurrentPage(1); // Reset to first page when filters change
    fetchLogs();
  };
  
  // Format the log action for display
  const formatAction = (action: string) => {
    return action.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };
  
  // Format the timestamp for display
  const formatTimestamp = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true, locale: ptBR });
    } catch (e) {
      return timestamp;
    }
  };
  
  // Get user name from ID
  const getUserName = (userId: string | null) => {
    if (!userId) return 'Sistema';
    return usersMap[userId] || 'Usuário desconhecido';
  };
  
  // Get a summary of the log action
  const getActionSummary = (log: AuditLog) => {
    const actor = getUserName(log.user_id);
    
    switch (log.action) {
      case AuditAction.LOGIN:
        return `${actor} fez login no sistema`;
        
      case AuditAction.LOGOUT:
        return `${actor} saiu do sistema`;
        
      case AuditAction.CREATE:
        return `${actor} criou um registro em ${log.table_name}`;
        
      case AuditAction.UPDATE:
        return `${actor} atualizou um registro em ${log.table_name}`;
        
      case AuditAction.DELETE:
        return `${actor} excluiu um registro de ${log.table_name}`;
        
      case AuditAction.PERMISSION_GRANT:
      case 'permission_grant':
        const grantedPerm = log.change_details?.permission || '';
        const grantTarget = getUserName(log.target_user_id);
        return `${actor} concedeu permissão "${grantedPerm}" para ${grantTarget}`;
        
      case AuditAction.PERMISSION_REVOKE:
      case 'permission_revoke':
        const revokedPerm = log.change_details?.permission || '';
        const revokeTarget = getUserName(log.target_user_id);
        return `${actor} revogou permissão "${revokedPerm}" de ${revokeTarget}`;
        
      case AuditAction.ROLE_CHANGE:
      case 'role_change':
        const oldRole = log.change_details?.old_role || 'nenhum';
        const newRole = log.change_details?.new_role || 'desconhecido';
        const roleTarget = getUserName(log.target_user_id);
        return `${actor} alterou papel de ${roleTarget} de "${oldRole}" para "${newRole}"`;
        
      default:
        return `${actor} realizou ação ${log.action} em ${log.table_name || 'desconhecido'}`;
    }
  };
  
  return (
    <AdminLayout pageTitle="Logs de Auditoria" requiresMaster={true}>
      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-auto">
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Filtrar por ação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as ações</SelectItem>
                  <SelectItem value={AuditAction.CREATE}>Criação</SelectItem>
                  <SelectItem value={AuditAction.UPDATE}>Atualização</SelectItem>
                  <SelectItem value={AuditAction.DELETE}>Exclusão</SelectItem>
                  <SelectItem value={AuditAction.LOGIN}>Login</SelectItem>
                  <SelectItem value={AuditAction.LOGOUT}>Logout</SelectItem>
                  <SelectItem value="permission_grant">Concessão de permissão</SelectItem>
                  <SelectItem value="permission_revoke">Revogação de permissão</SelectItem>
                  <SelectItem value="role_change">Alteração de papel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-auto">
              <Input
                placeholder="Filtrar por tabela"
                value={tableFilter}
                onChange={(e) => setTableFilter(e.target.value)}
                className="w-full md:w-[200px]"
              />
            </div>
            
            <Button onClick={handleFilterChange}>
              Filtrar
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Registros de Auditoria</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Nenhum registro encontrado
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Ação</TableHead>
                    <TableHead>Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="whitespace-nowrap">
                        {formatTimestamp(log.created_at)}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium
                          ${log.action.includes('delete') || log.action.includes('revoke') ? 'bg-red-100 text-red-800' : ''}
                          ${log.action.includes('create') || log.action.includes('grant') ? 'bg-green-100 text-green-800' : ''}
                          ${log.action.includes('update') || log.action.includes('change') ? 'bg-blue-100 text-blue-800' : ''}
                          ${log.action.includes('login') ? 'bg-purple-100 text-purple-800' : ''}
                          ${log.action.includes('logout') ? 'bg-orange-100 text-orange-800' : ''}
                        `}>
                          {formatAction(log.action)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {getActionSummary(log)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          {/* Pagination */}
          {totalCount > pageSize && (
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                Mostrando {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalCount)} de {totalCount} registros
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage * pageSize >= totalCount}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Próximo
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AuditLogs;
