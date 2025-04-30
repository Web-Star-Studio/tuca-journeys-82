
import React from "react";
import { Link } from "react-router-dom";

const DesktopNavigation = () => {
  return (
    <nav className="hidden md:flex gap-1">
      <Link to="/" className="px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors">
        Home
      </Link>
      <Link to="/tours" className="px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors">
        Passeios
      </Link>
      <Link to="/hospedagens" className="px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors">
        Hospedagens
      </Link>
      <Link to="/eventos" className="px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors">
        Eventos
      </Link>
      <Link to="/mapa" className="px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors">
        Mapa Turístico
      </Link>
      <Link to="/pacotes" className="px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors">
        Pacotes
      </Link>
      <Link to="/loja" className="px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors">
        Lojinha
      </Link>
      <Link to="/about" className="px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors">
        Sobre Nós
      </Link>
    </nav>
  );
};

export default DesktopNavigation;
