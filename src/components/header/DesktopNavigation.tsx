
import React from "react";
import { Link, useLocation } from "react-router-dom";

const DesktopNavigation = () => {
  const location = useLocation();
  
  return (
    <nav className="hidden md:flex space-x-8">
      <Link
        to="/"
        className={`hover:opacity-75 transition-opacity ${
          location.pathname === "/" ? "font-medium" : ""
        }`}
      >
        Home
      </Link>
      <Link
        to="/passeios"
        className={`hover:opacity-75 transition-opacity ${
          location.pathname.includes("/passeios") ? "font-medium" : ""
        }`}
      >
        Passeios
      </Link>
      <Link
        to="/hospedagens"
        className={`hover:opacity-75 transition-opacity ${
          location.pathname.includes("/hospedagens") ? "font-medium" : ""
        }`}
      >
        Hospedagens
      </Link>
      <Link
        to="/pacotes"
        className={`hover:opacity-75 transition-opacity ${
          location.pathname.includes("/pacotes") ? "font-medium" : ""
        }`}
      >
        Pacotes
      </Link>
      <Link
        to="/loja"
        className={`hover:opacity-75 transition-opacity ${
          location.pathname.includes("/loja") ? "font-medium" : ""
        }`}
      >
        Loja
      </Link>
      <Link
        to="/eventos"
        className={`hover:opacity-75 transition-opacity ${
          location.pathname.includes("/eventos") ? "font-medium" : ""
        }`}
      >
        Eventos
      </Link>
      <Link
        to="/parceiros"
        className={`hover:opacity-75 transition-opacity ${
          location.pathname.includes("/parceiros") ? "font-medium" : ""
        }`}
      >
        Parceiros
      </Link>
      <Link
        to="/sobre"
        className={`hover:opacity-75 transition-opacity ${
          location.pathname.includes("/sobre") ? "font-medium" : ""
        }`}
      >
        Sobre
      </Link>
      <Link
        to="/contato"
        className={`hover:opacity-75 transition-opacity ${
          location.pathname.includes("/contato") ? "font-medium" : ""
        }`}
      >
        Contato
      </Link>
    </nav>
  );
};

export default DesktopNavigation;
