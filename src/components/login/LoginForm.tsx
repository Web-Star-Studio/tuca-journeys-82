
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import QuickAccessButtons from "./QuickAccessButtons";
import { Loader2 } from "lucide-react";

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginFormProps {
  onSuccessfulLogin?: (redirectToAdmin: boolean) => void;
}

const LoginForm = ({ onSuccessfulLogin }: LoginFormProps) => {
  const { signIn, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError(null);
    setIsSubmitting(true);
    
    try {
      const result = await signIn(data.email, data.password);
      
      if (result.error) {
        throw result.error;
      }
      
      // If successful login and callback exists, call it
      // Check if it's an admin login
      const isAdmin = data.email === "admin@tucanoronha.com";
      if (onSuccessfulLogin) {
        onSuccessfulLogin(isAdmin);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || "Falha no login. Verifique seu email e senha.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white py-8 px-6 shadow-md rounded-lg">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Entrar</h1>
        <p className="mt-2 text-sm text-gray-600">
          Acesse sua conta para gerenciar suas reservas
        </p>
      </div>
      
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email", {
              required: "Email é obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              },
            })}
            className="mt-1"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Senha
          </label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register("password", {
              required: "Senha é obrigatória",
              minLength: {
                value: 6,
                message: "A senha deve ter pelo menos 6 caracteres",
              },
            })}
            className="mt-1"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Checkbox id="rememberMe" />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-sm text-gray-900"
            >
              Lembrar-me
            </label>
          </div>
          <div className="text-sm">
            <Link
              to="/recuperar-senha"
              className="font-medium text-tuca-ocean-blue hover:text-tuca-ocean-blue/80"
            >
              Esqueceu a senha?
            </Link>
          </div>
        </div>

        <div>
          <Button type="submit" className="w-full" disabled={isLoading || isSubmitting}>
            {isLoading || isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{" "}
            <Link
              to="/cadastro"
              className="font-medium text-tuca-ocean-blue hover:text-tuca-ocean-blue/80"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </form>

      <div className="mt-6">
        <QuickAccessButtons />
      </div>
    </div>
  );
};

export default LoginForm;
