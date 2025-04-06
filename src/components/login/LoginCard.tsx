
import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./LoginForm";

interface LoginCardProps {
  onSuccessfulLogin?: (redirectToAdmin: boolean) => void;
}

const LoginCard = ({ onSuccessfulLogin }: LoginCardProps) => {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Entrar</CardTitle>
        <CardDescription className="text-center">
          Durante o desenvolvimento, qualquer email e senha funcionarão
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm onSuccessfulLogin={onSuccessfulLogin} />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm text-muted-foreground">
          Não tem uma conta?{" "}
          <Link to="/cadastro" className="text-primary hover:underline">
            Cadastre-se
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginCard;
