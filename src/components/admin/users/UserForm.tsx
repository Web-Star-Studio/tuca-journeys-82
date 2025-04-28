import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { User } from "@/components/admin/users/types";
import { userService } from "@/services/user-service";
import { useAuth } from "@/contexts/AuthContext";
import { auditService, AuditAction } from "@/services/audit-service";

interface UserFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId?: string;
  onSuccess?: () => void;
}

const UserFormDialog: React.FC<UserFormDialogProps> = ({ 
  open, 
  onOpenChange, 
  userId, 
  onSuccess 
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string>("customer");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user: currentUser } = useAuth();
  const [showMaster, setShowMaster] = useState(false);
  
  useEffect(() => {
    const checkMaster = async () => {
      if (currentUser) {
        const { data: roles } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', currentUser.id);
        
        const isMaster = roles?.some(r => r.role === 'master') || false;
        setShowMaster(isMaster);
      }
    };
    
    checkMaster();
  }, [currentUser]);

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        setIsLoading(true);
        try {
          const { data: profile, error } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', userId)
            .single();
          
          if (error) throw error;
          
          const { data: roles } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', userId);
          
          const role = roles && roles.length > 0 ? roles[0].role : 'customer';
          
          setName(profile.name || "");
          setEmail(profile.email || "");
          setRole(role);
          setAvatarUrl(profile.avatar_url || null);
        } catch (error) {
          console.error("Error fetching user:", error);
          toast({
            title: "Erro",
            description: "Falha ao carregar os detalhes do usuário.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      } else {
        setName("");
        setEmail("");
        setRole("customer");
        setAvatarUrl(null);
      }
    };

    fetchUser();
  }, [userId, toast]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (!name || !email) {
        toast({
          title: "Erro",
          description: "Por favor, preencha todos os campos.",
          variant: "destructive",
        });
        return;
      }
      
      // Create or update user profile
      const profileData = {
        id: userId || crypto.randomUUID(),
        name,
        email,
        avatar_url: avatarUrl
      };
      
      await userService.createOrUpdateUserProfile(profileData);
      
      // Update user role
      if (userId) {
        // Delete existing role
        const { error: deleteError } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId);
        
        if (deleteError) throw deleteError;
      }
      
      // Insert new role
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert([{ user_id: profileData.id, role: role }]);
      
      if (insertError) throw insertError;
      
      // Log the action
      if (currentUser) {
        const action = userId ? AuditAction.UPDATE : AuditAction.CREATE;
        await auditService.addAuditLog(
          currentUser,
          action,
          'user_profiles',
          profileData.id,
          null,
          { name, email, role }
        );
      }

      toast({
        title: "Sucesso",
        description: `Usuário ${userId ? "atualizado" : "criado"} com sucesso!`,
      });
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erro",
        description: "Falha ao salvar o usuário.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{userId ? "Editar Usuário" : "Adicionar Usuário"}</DialogTitle>
          <DialogDescription>
            {userId
              ? "Edite os detalhes do usuário."
              : "Crie um novo usuário inserindo as informações abaixo."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Papel
              </Label>
              <Select 
                value={role} 
                onValueChange={(value) => setRole(value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione um papel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">Cliente</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="partner">Parceiro</SelectItem>
                  {showMaster && <SelectItem value="master">Master</SelectItem>}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="avatar" className="text-right">
                Avatar URL
              </Label>
              <Input
                type="text"
                id="avatar"
                value={avatarUrl || ""}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="col-span-3"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserFormDialog;
