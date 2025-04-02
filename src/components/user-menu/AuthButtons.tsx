
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AuthButtons = () => {
  return (
    <div className="flex space-x-2">
      <Link to="/login">
        <Button 
          variant="secondary" 
          size="sm"
          className="text-tuca-ocean-blue hover:text-tuca-deep-blue font-medium"
        >
          Entrar
        </Button>
      </Link>
      <Link to="/cadastro">
        <Button 
          size="sm" 
          className="bg-gradient-to-r from-tuca-deep-blue to-tuca-ocean-blue hover:from-tuca-ocean-blue hover:to-tuca-deep-blue transition-all duration-300"
        >
          Cadastrar
        </Button>
      </Link>
    </div>
  );
};

export default AuthButtons;
