
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  onSuccessfulLogin: (redirectToAdmin: boolean) => void;
}

const LoginForm = ({ onSuccessfulLogin }: LoginFormProps) => {
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToAdmin, setRedirectToAdmin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log("Form submitted, attempting login with:", email);
      await signIn(email, password);
      
      console.log("Login successful, redirecting to", redirectToAdmin ? "admin" : "home");
      
      // Slight delay to ensure state updates are processed
      setTimeout(() => {
        onSuccessfulLogin(redirectToAdmin);
      }, 100);
    } catch (error) {
      // Error is already handled in the signIn function
      console.error("Login form submission error:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            className="pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting || loading}
          />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Senha</Label>
          <Link
            to="/recuperar-senha"
            className="text-sm text-primary hover:underline"
          >
            Esqueceu a senha?
          </Link>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            className="pl-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isSubmitting || loading}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="admin" 
          checked={redirectToAdmin}
          onCheckedChange={(checked) => {
            setRedirectToAdmin(checked === true);
          }}
          disabled={isSubmitting || loading}
        />
        <label
          htmlFor="admin"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Acessar como Administrador
        </label>
      </div>
      
      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || loading}
      >
        {isSubmitting || loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Entrando...
          </>
        ) : (
          "Entrar"
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
