
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { seedDatabase, createInitialAdmin } from "@/utils/seedDatabase";
import { Loader2, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export const InitialSetup = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSeeding, setIsSeeding] = useState(false);
  const [isCreatingAdmin, setIsCreatingAdmin] = useState(false);
  const [seedingComplete, setSeedingComplete] = useState(false);
  const [adminComplete, setAdminComplete] = useState(false);
  
  const handleSeedDatabase = async () => {
    if (seedingComplete) {
      toast.info("O banco de dados já foi inicializado");
      return;
    }
    
    setIsSeeding(true);
    try {
      const result = await seedDatabase();
      if (result.success) {
        toast.success("Banco de dados inicializado com sucesso!");
        setSeedingComplete(true);
      } else {
        toast.error("Erro ao inicializar o banco de dados");
      }
    } catch (error) {
      console.error("Error seeding database:", error);
      toast.error("Erro ao inicializar o banco de dados");
    } finally {
      setIsSeeding(false);
    }
  };
  
  const handleCreateAdmin = async () => {
    if (adminComplete) {
      toast.info("Administrador já foi criado");
      return;
    }
    
    // Validation
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
    
    setIsCreatingAdmin(true);
    try {
      const result = await createInitialAdmin(adminEmail, adminPassword);
      if (result.success) {
        toast.success("Administrador criado com sucesso!");
        setAdminComplete(true);
      } else {
        toast.error("Erro ao criar administrador");
      }
    } catch (error) {
      console.error("Error creating admin:", error);
      toast.error("Erro ao criar administrador");
    } finally {
      setIsCreatingAdmin(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Tuca Noronha</h1>
          <p className="text-gray-500 mt-2">Configuração Inicial</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Inicialização do Sistema</CardTitle>
            <CardDescription>
              Siga os passos abaixo para configurar o sistema para lançamento
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">1. Inicializar Banco de Dados</h3>
                {seedingComplete ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : null}
              </div>
              <Button 
                onClick={handleSeedDatabase}
                disabled={isSeeding || seedingComplete}
                className="w-full"
              >
                {isSeeding ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Inicializando...
                  </>
                ) : seedingComplete ? (
                  "Banco de Dados Inicializado"
                ) : (
                  "Inicializar Banco de Dados"
                )}
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">2. Criar Administrador</h3>
                {adminComplete ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : null}
              </div>
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="admin-email">Email do Administrador</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="admin@tucanoronha.com"
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="admin-password">Senha</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="confirm-password">Confirmar Senha</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
          </CardContent>
          
          <CardFooter className="justify-between border-t pt-4">
            {(seedingComplete && adminComplete) ? (
              <div className="flex items-center text-sm text-green-600 w-full">
                <Check className="mr-2 h-4 w-4" />
                Configuração concluída! Você já pode acessar o sistema.
              </div>
            ) : (
              <div className="flex items-center text-sm text-amber-600 w-full">
                <AlertCircle className="mr-2 h-4 w-4" />
                Complete todos os passos para continuar.
              </div>
            )}
          </CardFooter>
        </Card>
        
        {(seedingComplete && adminComplete) && (
          <div className="text-center mt-4">
            <Button asChild>
              <a href="/login">Acessar o Sistema</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
