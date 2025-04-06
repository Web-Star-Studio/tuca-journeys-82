
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const ResetPassword = () => {
  const { resetPassword, isLoading } = useAuth();
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
    },
  });
  
  const onSubmit = async (data: { email: string }) => {
    try {
      await resetPassword(data.email);
      setResetEmailSent(true);
      toast({
        title: "Email enviado",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      });
    } catch (error: any) {
      console.error("Error in password reset:", error);
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro ao enviar o email de redefinição de senha.",
        variant: "destructive",
      });
    }
  };
  
  if (resetEmailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Email enviado</h1>
            <p className="mt-2 text-gray-600">
              Enviamos instruções para redefinir sua senha.
              Verifique sua caixa de entrada.
            </p>
          </div>
          <div className="mt-6">
            <Button
              className="w-full"
              onClick={() => navigate("/login")}
            >
              Voltar para o login
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Esqueceu sua senha?</h1>
          <p className="mt-2 text-gray-600">
            Enviaremos um link para redefinir sua senha.
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1">
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="seu@email.com"
                {...register("email", {
                  required: "Email é obrigatório",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Endereço de email inválido"
                  }
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>
          
          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar link de redefinição"
              )}
            </Button>
          </div>
          
          <div className="text-center">
            <Button
              variant="link"
              type="button"
              onClick={() => navigate("/login")}
              className="text-tuca-ocean-blue"
            >
              Voltar para o login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
