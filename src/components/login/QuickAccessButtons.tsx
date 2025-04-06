
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DEMO_ACCOUNTS = [
  { email: "user@example.com", password: "password", label: "Entrar como Usuário Demo" },
  { email: "admin@tucanoronha.com", password: "admin123456", label: "Entrar como Admin Demo" },
];

const QuickAccessButtons = () => {
  const { signIn, isLoading } = useAuth();
  const [loggingIn, setLoggingIn] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDemoLogin = async (email: string, password: string) => {
    setLoggingIn(email);
    try {
      await signIn(email, password);
      toast({
        title: "Login de demonstração",
        description: `Você está acessando como ${email === "admin@tucanoronha.com" ? "administrador" : "usuário"} demo.`,
      });
    } catch (error: any) {
      console.error("Demo login error:", error);
      toast({
        title: "Erro",
        description: error.message || "Falha no login de demonstração.",
        variant: "destructive",
      });
    } finally {
      setLoggingIn(null);
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Acesso rápido</span>
        </div>
      </div>

      <div className="space-y-2">
        {DEMO_ACCOUNTS.map((account) => (
          <Button
            key={account.email}
            variant="outline"
            className="w-full"
            disabled={isLoading || !!loggingIn}
            onClick={() => handleDemoLogin(account.email, account.password)}
          >
            {loggingIn === account.email ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : (
              account.label
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickAccessButtons;
