
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DatabaseSeedStep } from "./steps/DatabaseSeedStep";
import { AdminCreationStep } from "./steps/AdminCreationStep";
import { SetupCompletion } from "./steps/SetupCompletion";

const InitialSetup = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSeeding, setIsSeeding] = useState(false);
  const [isCreatingAdmin, setIsCreatingAdmin] = useState(false);
  const [seedingComplete, setSeedingComplete] = useState(false);
  const [adminComplete, setAdminComplete] = useState(false);
  
  const handleSeedComplete = () => {
    setSeedingComplete(true);
    setIsSeeding(false);
  };

  const handleAdminComplete = () => {
    setAdminComplete(true);
    setIsCreatingAdmin(false);
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
            <DatabaseSeedStep
              isSeeding={isSeeding}
              seedingComplete={seedingComplete}
              onSeedComplete={handleSeedComplete}
            />
            
            <AdminCreationStep
              isCreatingAdmin={isCreatingAdmin}
              adminComplete={adminComplete}
              adminEmail={adminEmail}
              adminPassword={adminPassword}
              confirmPassword={confirmPassword}
              onEmailChange={setAdminEmail}
              onPasswordChange={setAdminPassword}
              onConfirmPasswordChange={setConfirmPassword}
              onAdminComplete={handleAdminComplete}
            />
          </CardContent>
          
          <CardFooter className="justify-between border-t pt-4">
            <SetupCompletion isComplete={seedingComplete && adminComplete} />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default InitialSetup;
