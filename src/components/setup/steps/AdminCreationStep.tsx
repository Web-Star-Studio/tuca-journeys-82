
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Check } from "lucide-react";
import { createInitialAdmin } from "@/utils/seedDatabase";
import { toast } from "sonner";

interface AdminCreationStepProps {
  isCreatingAdmin: boolean;
  adminComplete: boolean;
  adminEmail: string;
  adminPassword: string;
  confirmPassword: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onConfirmPasswordChange: (password: string) => void;
  onAdminComplete: () => void;
}

export const AdminCreationStep: React.FC<AdminCreationStepProps> = ({
  isCreatingAdmin,
  adminComplete,
  adminEmail,
  adminPassword,
  confirmPassword,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onAdminComplete,
}) => {
  const handleCreateAdmin = async () => {
    if (adminComplete) {
      toast.info("Administrador já foi criado");
      return;
    }
    
    if (!adminEmail || !adminPassword) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }
    
    if (adminPassword !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }
    
    if (adminPassword.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }
    
    try {
      const result = await createInitialAdmin(adminEmail, adminPassword);
      if (result.success) {
        toast.success("Administrador criado com sucesso!");
        onAdminComplete();
      } else {
        toast.error("Erro ao criar administrador");
      }
    } catch (error) {
      console.error("Error creating admin:", error);
      toast.error("Erro ao criar administrador");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">2. Criar Administrador</h3>
        {adminComplete ? <Check className="h-5 w-5 text-green-500" /> : null}
      </div>
      
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="admin-email">Email do Administrador</Label>
          <Input
            id="admin-email"
            type="email"
            value={adminEmail}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="admin@tucanoronha.com"
          />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="admin-password">Senha</Label>
          <Input
            id="admin-password"
            type="password"
            value={adminPassword}
            onChange={(e) => onPasswordChange(e.target.value)}
          />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="confirm-password">Confirmar Senha</Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => onConfirmPasswordChange(e.target.value)}
          />
        </div>
        
        <Button 
          onClick={handleCreateAdmin}
          disabled={isCreatingAdmin || adminComplete || !adminEmail || !adminPassword || adminPassword !== confirmPassword}
          className="w-full"
        >
          {isCreatingAdmin ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Criando...
            </>
          ) : adminComplete ? (
            "Administrador Criado"
          ) : (
            "Criar Administrador"
          )}
        </Button>
      </div>
    </div>
  );
};
