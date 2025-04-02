
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface QuickAccessButtonsProps {
  onSuccessfulLogin: (redirectToAdmin: boolean) => void;
}

const QuickAccessButtons = ({ onSuccessfulLogin }: QuickAccessButtonsProps) => {
  const { loading, signIn } = useAuth();

  const handleDemoLogin = async () => {
    const demoEmail = "demo@tucanoronha.com";
    const demoPassword = "demo123456";
    
    await signIn(demoEmail, demoPassword);
    onSuccessfulLogin(false);
  };

  const handleAdminDemoLogin = async () => {
    const adminEmail = "admin@tucanoronha.com";
    const adminPassword = "admin123456";
    
    await signIn(adminEmail, adminPassword);
    onSuccessfulLogin(true);
  };

  const handleQuickLogin = async () => {
    const quickEmail = "user@example.com";
    const quickPassword = "password";
    
    await signIn(quickEmail, quickPassword);
    onSuccessfulLogin(false);
  };

  return (
    <div className="my-4">
      <Separator className="my-4">
        <span className="mx-2 text-xs text-muted-foreground">ACESSO RÁPIDO</span>
      </Separator>
      
      <Button
        variant="outline"
        className="w-full mt-2 mb-2 flex justify-between items-center"
        onClick={handleAdminDemoLogin}
        disabled={loading}
      >
        <div className="flex items-center">
          <ShieldCheck className="mr-2 h-4 w-4 text-tuca-deep-blue" />
          <span>Acessar Painel Admin</span>
        </div>
        <span className="bg-tuca-light-blue text-tuca-deep-blue px-2 py-0.5 rounded-full text-xs">Rápido</span>
      </Button>
      
      <div className="grid grid-cols-2 gap-2 mt-2">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleQuickLogin}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Login Rápido"
          )}
        </Button>
        
        <Button
          variant="outline"
          className="w-full"
          onClick={handleDemoLogin}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Acesso Demo"
          )}
        </Button>
      </div>
    </div>
  );
};

export default QuickAccessButtons;
