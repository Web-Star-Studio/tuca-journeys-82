
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface QuickAccessButtonsProps {
  onSuccessfulLogin: (redirectToAdmin: boolean) => void;
}

const QuickAccessButtons = ({ onSuccessfulLogin }: QuickAccessButtonsProps) => {
  const { loading, signIn } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [buttonClicked, setButtonClicked] = React.useState<string | null>(null);

  const handleLogin = async (email: string, password: string, isAdmin: boolean, buttonType: string) => {
    setIsLoading(true);
    setButtonClicked(buttonType);
    
    try {
      console.log(`Attempting ${buttonType} login with email: ${email}`);
      await signIn(email, password);
      console.log(`${buttonType} login successful, redirecting to ${isAdmin ? 'admin' : 'home'}`);
      
      // Slight delay to ensure state updates are processed
      setTimeout(() => {
        onSuccessfulLogin(isAdmin);
      }, 100);
    } catch (error) {
      console.error(`${buttonType} login error:`, error);
      // Reset loading state since the toast is already shown in signIn function
    } finally {
      setIsLoading(false);
      setButtonClicked(null);
    }
  };

  const handleDemoLogin = () => {
    const demoEmail = "demo@tucanoronha.com";
    const demoPassword = "demo123456";
    handleLogin(demoEmail, demoPassword, false, "demo");
  };

  const handleAdminDemoLogin = () => {
    const adminEmail = "admin@tucanoronha.com";
    const adminPassword = "admin123456";
    handleLogin(adminEmail, adminPassword, true, "admin");
  };

  const handleQuickLogin = () => {
    const quickEmail = "user@example.com";
    const quickPassword = "password";
    handleLogin(quickEmail, quickPassword, false, "quick");
  };

  const getButtonContent = (buttonType: string, label: string) => {
    if (isLoading && buttonClicked === buttonType) {
      return <Loader2 className="h-4 w-4 animate-spin" />;
    }
    return label;
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
        disabled={isLoading || loading}
      >
        <div className="flex items-center">
          <ShieldCheck className="mr-2 h-4 w-4 text-tuca-deep-blue" />
          <span>Acessar Painel Admin</span>
        </div>
        {isLoading && buttonClicked === "admin" ? (
          <Loader2 className="h-4 w-4 animate-spin text-tuca-deep-blue" />
        ) : (
          <span className="bg-tuca-light-blue text-tuca-deep-blue px-2 py-0.5 rounded-full text-xs">Rápido</span>
        )}
      </Button>
      
      <div className="grid grid-cols-2 gap-2 mt-2">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleQuickLogin}
          disabled={isLoading || loading}
        >
          {getButtonContent("quick", "Login Rápido")}
        </Button>
        
        <Button
          variant="outline"
          className="w-full"
          onClick={handleDemoLogin}
          disabled={isLoading || loading}
        >
          {getButtonContent("demo", "Acesso Demo")}
        </Button>
      </div>
    </div>
  );
};

export default QuickAccessButtons;
