
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const DEMO_ACCOUNTS = [
  { email: "user@example.com", password: "password", label: "Acessar como Usuário" },
  { email: "admin@tucanoronha.com", password: "admin123456", label: "Acessar como Admin" },
  { email: "partner@demo.com", password: "partner123", label: "Acessar como Parceiro" }
];

const QuickAccessButtons = () => {
  const { signIn } = useAuth();
  const [loggingIn, setLoggingIn] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDemoLogin = async (email: string, password: string) => {
    setLoggingIn(email);
    try {
      await signIn(email, password);
      
      // Redirect based on user type
      if (email.includes("admin")) {
        navigate("/admin/dashboard");
      } else if (email.includes("partner")) {
        navigate("/parceiro/dashboard");
      } else {
        navigate("/dashboard");
      }
      
      toast({
        title: "Acesso Demo",
        description: `Você está acessando como ${
          email.includes("admin") ? "administrador" 
          : email.includes("partner") ? "parceiro" 
          : "usuário"
        } demo.`,
      });
    } catch (error: any) {
      console.error("Demo login error:", error);
      toast({
        title: "Erro",
        description: "Falha no acesso demo. Tente novamente.",
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
          <span className="px-2 bg-white text-gray-500">Acesso Rápido para Desenvolvimento</span>
        </div>
      </div>

      <div className="space-y-2">
        {DEMO_ACCOUNTS.map((account) => (
          <Button
            key={account.email}
            variant="default"
            className="w-full bg-tuca-ocean-blue hover:bg-tuca-deep-blue"
            disabled={!!loggingIn}
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
