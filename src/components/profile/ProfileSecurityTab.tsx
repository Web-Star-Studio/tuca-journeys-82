
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface PasswordChangeFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ProfileSecurityTab = () => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<PasswordChangeFormData>();
  
  const newPassword = watch("newPassword");
  
  const onSubmit = async (data: PasswordChangeFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulamos a alteração de senha (no ambiente real, seria via Supabase)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // const { error } = await supabase.auth.updateUser({
      //   password: data.newPassword
      // });
      // 
      // if (error) throw error;
      
      toast.success("Senha alterada com sucesso");
      reset();
    } catch (error) {
      console.error("Erro ao atualizar senha:", error);
      toast.error("Não foi possível alterar sua senha");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-2">Informações da Conta</h3>
          <p className="text-sm text-gray-500 mb-4">
            Gerencie suas informações de acesso e segurança.
          </p>
          
          <div className="space-y-4">
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-gray-500">Email</span>
              <span className="font-medium">{user?.email}</span>
            </div>
            
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-gray-500">Status da conta</span>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                <span className="font-medium">Ativa</span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-gray-500">Último acesso</span>
              <span className="font-medium">
                {new Date().toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Alterar Senha</h3>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Senha atual</Label>
              <Input
                id="currentPassword"
                type="password"
                {...register("currentPassword", {
                  required: "A senha atual é obrigatória",
                })}
              />
              {errors.currentPassword && (
                <p className="text-sm text-red-500">{errors.currentPassword.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nova senha</Label>
              <Input
                id="newPassword"
                type="password"
                {...register("newPassword", {
                  required: "A nova senha é obrigatória",
                  minLength: {
                    value: 8,
                    message: "A senha deve ter pelo menos 8 caracteres",
                  },
                })}
              />
              {errors.newPassword && (
                <p className="text-sm text-red-500">{errors.newPassword.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword", {
                  required: "Confirme sua nova senha",
                  validate: value =>
                    value === newPassword || "As senhas não coincidem",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
            
            <div className="pt-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Alterando...
                  </>
                ) : (
                  "Alterar Senha"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-2">Dispositivos conectados</h3>
          <p className="text-sm text-gray-500 mb-4">
            Dispositivos que foram usados para acessar sua conta recentemente.
          </p>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border rounded-md">
              <div>
                <div className="font-medium">Este dispositivo</div>
                <div className="text-sm text-gray-500">
                  Último acesso: {new Date().toLocaleString('pt-BR')}
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm">Sessão atual</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Button variant="outline" className="text-red-500">
              Encerrar todas as outras sessões
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSecurityTab;
