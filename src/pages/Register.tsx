import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import ConversationalForm from "@/components/registration/ConversationalForm";
import { TravelPreference } from "@/types/user-preferences";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase"; // Add the correct import

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  terms: boolean;
}

const Register = () => {
  const { signUp, user, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationStep, setRegistrationStep] = useState<'account' | 'preferences'>('account');
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const navigate = useNavigate();
  
  // Redirect if already logged in
  useEffect(() => {
    if (user && registrationComplete) {
      navigate("/dashboard");
    } else if (user && !registrationComplete) {
      setRegistrationStep('preferences');
    }
  }, [user, navigate, registrationComplete]);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      terms: false,
    },
  });

  const password = watch("password");
  
  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      await signUp(data.email, data.password, data.name);
      setRegistrationStep('preferences');
    } catch (error: any) {
      console.error("Registration error:", error);
      setError(error.message || "Erro ao criar conta. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreferencesSaved = async (preferences: TravelPreference) => {
    try {
      // Save preferences to user's profile
      const { data: userPreferences, error: preferencesError } = await supabase
        .from('travel_preferences')
        .insert([{
          user_id: user?.id,
          ...preferences,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .single();

      if (preferencesError) throw preferencesError;

      setRegistrationComplete(true);
      toast.success("Registro completo! Bem-vindo a Fernando de Noronha!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error: any) {
      console.error("Error saving preferences:", error);
      toast.error("Erro ao salvar preferências. Tente novamente.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-tuca-ocean-blue" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/hero-noronha-beach.jpg')] bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div 
          className="bg-white dark:bg-gray-900 bg-opacity-95 dark:bg-opacity-95 backdrop-blur-sm py-8 px-6 shadow-xl rounded-xl border border-gray-200 dark:border-gray-700"
        >
          {registrationStep === 'account' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Criar Conta</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Inicie sua jornada para Fernando de Noronha
                </p>
              </div>
              
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                    {error}
                  </div>
                )}
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nome completo
                  </label>
                  <Input
                    id="name"
                    type="text"
                    autoComplete="name"
                    {...register("name", {
                      required: "Nome é obrigatório",
                      minLength: {
                        value: 3,
                        message: "Nome deve ter pelo menos 3 caracteres",
                      },
                    })}
                    className="mt-1"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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
                        message: "Endereço de email inválido",
                      },
                    })}
                    className="mt-1"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Senha
                  </label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
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
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.password.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Confirmar senha
                  </label>
                  <Input
                    id="passwordConfirm"
                    type="password"
                    autoComplete="new-password"
                    {...register("passwordConfirm", {
                      required: "Confirme sua senha",
                      validate: (value) =>
                        value === password || "As senhas não conferem",
                    })}
                    className="mt-1"
                  />
                  {errors.passwordConfirm && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.passwordConfirm.message}</p>
                  )}
                </div>
                
                <div className="flex items-center">
                  <Checkbox id="terms" {...register("terms")} />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                    Eu concordo com os{" "}
                    <Link to="/termos" className="text-tuca-ocean-blue hover:underline">
                      Termos de Serviço
                    </Link>{" "}
                    e{" "}
                    <Link to="/privacidade" className="text-tuca-ocean-blue hover:underline">
                      Política de Privacidade
                    </Link>
                  </label>
                </div>

                <div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Criando conta...
                      </>
                    ) : (
                      "Criar conta"
                    )}
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Já tem uma conta?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-tuca-ocean-blue hover:text-tuca-ocean-blue/80"
                    >
                      Entrar
                    </Link>
                  </p>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ConversationalForm onComplete={handlePreferencesSaved} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
