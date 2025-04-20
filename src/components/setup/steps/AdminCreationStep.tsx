
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

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
  const { signUp } = useAuth();
  const [adminName, setAdminName] = useState("Administrador");
  
  const handleCreateAdmin = async () => {
    if (adminComplete) {
      toast.info("Administrador já foi criado");
      return;
    }
    
    // Validar email
    if (!validateEmail(adminEmail)) {
      toast.error("Email inválido");
      return;
    }
    
    // Validar senha
    if (adminPassword.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }
    
    // Verificar se as senhas conferem
    if (adminPassword !== confirmPassword) {
      toast.error("As senhas não conferem");
      return;
    }
    
    try {
      // Em um ambiente real, chamaríamos o Supabase
      // await signUp(adminEmail, adminPassword, adminName);
      
      // Simulamos a criação para demonstração
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Administrador criado com sucesso!");
      onAdminComplete();
      
      // Salvando no localStorage para demonstração
      localStorage.setItem('adminEmail', adminEmail);
    } catch (error: any) {
      console.error("Error creating admin:", error);
      toast.error(error.message || "Erro ao criar administrador");
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">2. Criar Conta de Administrador</h3>
        {adminComplete ? <Check className="h-5 w-5 text-green-500" /> : null}
      </div>
      
      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="adminName">Nome</Label>
          <Input
            id="adminName"
            placeholder="Nome do Administrador"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
            disabled={isCreatingAdmin || adminComplete}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="adminEmail">Email</Label>
          <Input
            id="adminEmail"
            type="email"
            placeholder="exemplo@tucanoronha.com"
            value={adminEmail}
            onChange={(e) => onEmailChange(e.target.value)}
            disabled={isCreatingAdmin || adminComplete}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="adminPassword">Senha</Label>
          <Input
            id="adminPassword"
            type="password"
            placeholder="•••••••••"
            value={adminPassword}
            onChange={(e) => onPasswordChange(e.target.value)}
            disabled={isCreatingAdmin || adminComplete}
          />
          {adminPassword && adminPassword.length < 6 && (
            <p className="text-xs text-amber-600 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              A senha deve ter pelo menos 6 caracteres
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar Senha</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="•••••••••"
            value={confirmPassword}
            onChange={(e) => onConfirmPasswordChange(e.target.value)}
            disabled={isCreatingAdmin || adminComplete}
          />
          {adminPassword && confirmPassword && adminPassword !== confirmPassword && (
            <p className="text-xs text-amber-600 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              As senhas não conferem
            </p>
          )}
        </div>
        
        <Button 
          onClick={handleCreateAdmin}
          disabled={isCreatingAdmin || adminComplete}
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

// Helper para validar email
function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
