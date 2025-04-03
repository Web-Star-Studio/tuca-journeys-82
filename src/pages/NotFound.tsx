
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home,
  Search,
  Map,
  Hotel,
  Package,
  ShoppingBag,
  Contact,
  ArrowLeft
} from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-blue-100">
      {/* Navigation */}
      <div className="container mx-auto p-4">
        <Link to="/" className="inline-flex items-center gap-2 text-tuca-ocean-blue hover:underline">
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar para o início</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 px-4 text-center">
        <div className="max-w-3xl">
          {/* Error Illustration */}
          <div className="mb-8 relative">
            <img
              src="/placeholder.svg"
              alt="Ilustração de página não encontrada"
              className="mx-auto h-48 md:h-64"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl md:text-9xl font-bold text-tuca-ocean-blue/20">404</span>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Página não encontrada
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Parece que você se perdeu em Fernando de Noronha. A página que você
            está procurando não existe ou foi removida.
          </p>

          {/* Primary Action */}
          <div className="mb-12">
            <Button asChild size="lg" className="px-8">
              <Link to="/">
                <Home className="mr-2 h-5 w-5" />
                Voltar para o Início
              </Link>
            </Button>
          </div>

          {/* Suggested Links */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Talvez você esteja procurando por:
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link
                to="/passeios"
                className="flex flex-col items-center p-4 rounded-lg bg-white shadow-sm hover:bg-blue-50 transition-colors"
              >
                <Map className="h-8 w-8 text-tuca-ocean-blue mb-2" />
                <span className="text-sm font-medium">Passeios</span>
              </Link>
              <Link
                to="/hospedagens"
                className="flex flex-col items-center p-4 rounded-lg bg-white shadow-sm hover:bg-blue-50 transition-colors"
              >
                <Hotel className="h-8 w-8 text-tuca-ocean-blue mb-2" />
                <span className="text-sm font-medium">Hospedagens</span>
              </Link>
              <Link
                to="/pacotes"
                className="flex flex-col items-center p-4 rounded-lg bg-white shadow-sm hover:bg-blue-50 transition-colors"
              >
                <Package className="h-8 w-8 text-tuca-ocean-blue mb-2" />
                <span className="text-sm font-medium">Pacotes</span>
              </Link>
              <Link
                to="/loja"
                className="flex flex-col items-center p-4 rounded-lg bg-white shadow-sm hover:bg-blue-50 transition-colors"
              >
                <ShoppingBag className="h-8 w-8 text-tuca-ocean-blue mb-2" />
                <span className="text-sm font-medium">Loja</span>
              </Link>
            </div>
          </div>

          {/* Help Section */}
          <div className="text-gray-600">
            <p className="mb-2">Ainda não encontrou o que procura?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contato" className="flex items-center justify-center gap-2 text-tuca-ocean-blue hover:underline">
                <Contact className="h-4 w-4" />
                <span>Entre em contato</span>
              </Link>
              <Link to="/" className="flex items-center justify-center gap-2 text-tuca-ocean-blue hover:underline">
                <Search className="h-4 w-4" />
                <span>Buscar no site</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-6 bg-white mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Tuca Viagens. Todos os direitos reservados.
        </div>
      </div>
    </div>
  );
};

export default NotFound;
