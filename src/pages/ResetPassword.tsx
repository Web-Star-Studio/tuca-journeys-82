
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Loader2 } from "lucide-react";

const ResetPassword = () => {
  const { resetPassword, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await resetPassword(email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">
                  Recuperar Senha
                </CardTitle>
                <CardDescription className="text-center">
                  Digite seu email para receber um link de recuperação de senha
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="text-center py-4">
                    <h3 className="text-lg font-medium mb-2">Email Enviado!</h3>
                    <p className="text-muted-foreground mb-4">
                      Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
                    </p>
                    <Link to="/login">
                      <Button variant="outline">Voltar para Login</Button>
                    </Link>
                  </div>
                ) : (
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
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        "Enviar Link de Recuperação"
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-center text-sm text-muted-foreground">
                  Lembrou a senha?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Voltar para Login
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPassword;
