import React from "react";
import { Link } from "react-router-dom";
import AuthButtons from "../user-menu/AuthButtons";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { CalendarCheck } from "lucide-react";
import { toast } from "sonner";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation = ({ isOpen, onClose }: MobileNavigationProps) => {
  const { user } = useAuth();
  
  if (!isOpen) return null;

  const handleReservarClick = () => {
    onClose();
    if (!user) {
      toast.error("Você precisa estar logado para fazer uma reserva");
    }
  };

  return (
    <div className="md:hidden bg-white text-gray-900 shadow-lg p-4 animate-fade-in">
      <nav className="flex flex-col space-y-4">
        <Link
          to="/"
          className="px-4 py-2 rounded hover:bg-gray-100"
          onClick={onClose}
        >
          Home
        </Link>
        <Link
          to="/passeios"
          className="px-4 py-2 rounded hover:bg-gray-100"
          onClick={onClose}
        >
          Passeios
        </Link>
        <Link
          to="/hospedagens"
          className="px-4 py-2 rounded hover:bg-gray-100"
          onClick={onClose}
        >
          Hospedagens
        </Link>
        <Link
          to="/pacotes"
          className="px-4 py-2 rounded hover:bg-gray-100"
          onClick={onClose}
        >
          Pacotes
        </Link>
        <Link
          to="/loja"
          className="px-4 py-2 rounded hover:bg-gray-100"
          onClick={onClose}
        >
          Loja
        </Link>
        <Link
          to="/eventos"
          className="px-4 py-2 rounded hover:bg-gray-100"
          onClick={onClose}
        >
          Eventos
        </Link>
        <Link
          to="/mapa"
          className="px-4 py-2 rounded hover:bg-gray-100"
          onClick={onClose}
        >
          Mapa
        </Link>
        <Link
          to="/parceiros"
          className="px-4 py-2 rounded hover:bg-gray-100"
          onClick={onClose}
        >
          Parceiros
        </Link>
        <Link
          to="/sobre"
          className="px-4 py-2 rounded hover:bg-gray-100"
          onClick={onClose}
        >
          Sobre
        </Link>
        <Link
          to="/contato"
          className="px-4 py-2 rounded hover:bg-gray-100"
          onClick={onClose}
        >
          Contato
        </Link>
        <Link
          to="/lista-de-desejos"
          className="px-4 py-2 rounded hover:bg-gray-100"
          onClick={onClose}
        >
          Lista de Desejos
        </Link>
        
        <Link
          to={user ? "/reservar" : "/login?returnTo=/reservar"}
          className="px-4 py-2 bg-gradient-to-r from-tuca-deep-blue to-tuca-ocean-blue text-white rounded-full flex items-center justify-center"
          onClick={handleReservarClick}
        >
          <CalendarCheck className="w-4 h-4 mr-2" />
          Reservar
        </Link>
        
        {/* Botões de autenticação (apenas mostrar se o usuário não estiver logado) */}
        {!user && (
          <div className="mt-4 border-t pt-4">
            <AuthButtons />
          </div>
        )}
      </nav>
    </div>
  );
};

export default MobileNavigation;
