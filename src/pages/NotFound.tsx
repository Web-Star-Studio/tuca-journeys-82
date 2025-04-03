
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Sugestões inteligentes baseadas na URL
  const getSuggestions = () => {
    const path = location.pathname.toLowerCase();
    
    if (path.includes("admin")) {
      return [
        { label: "Painel de Admin", path: "/admin" },
        { label: "Gerenciar Pacotes", path: "/admin/packages" },
        { label: "Gerenciar Usuários", path: "/admin/users" },
      ];
    }
    
    if (path.includes("pacote") || path.includes("package")) {
      return [
        { label: "Pacotes", path: "/pacotes" },
        { label: "Passeios", path: "/passeios" },
        { label: "Hospedagens", path: "/hospedagens" }
      ];
    }
    
    if (path.includes("hospeda") || path.includes("hotel") || path.includes("accommodation")) {
      return [
        { label: "Hospedagens", path: "/hospedagens" },
        { label: "Pacotes", path: "/pacotes" },
        { label: "Contato", path: "/contato" }
      ];
    }
    
    // Default suggestions
    return [
      { label: "Página Inicial", path: "/" },
      { label: "Pacotes", path: "/pacotes" },
      { label: "Contato", path: "/contato" }
    ];
  };

  const suggestions = getSuggestions();

  return (
    <div className="min-h-screen bg-gradient-to-b from-tuca-light-blue/20 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-tuca-ocean-blue p-6 text-white text-center">
          <AlertTriangle className="h-16 w-16 mx-auto mb-2" />
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-lg opacity-90">Página não encontrada</p>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 mb-6 text-center">
            Não foi possível encontrar a página <span className="font-semibold text-tuca-ocean-blue">{location.pathname}</span>
          </p>
          
          <div className="space-y-4">
            <h3 className="font-medium text-gray-800 flex items-center">
              <Search className="h-4 w-4 mr-2" />
              Você pode estar procurando:
            </h3>
            
            <div className="grid gap-2">
              {suggestions.map((suggestion, index) => (
                <Link 
                  key={index} 
                  to={suggestion.path}
                  className="block p-3 bg-gray-50 hover:bg-tuca-light-blue/30 rounded-md transition-colors"
                >
                  {suggestion.label}
                </Link>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              
              <Button asChild className="w-full">
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  Página Inicial
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
