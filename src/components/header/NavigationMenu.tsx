
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavigationLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
  to,
  children,
  className,
  onClick,
}) => {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-primary h-9 px-4 py-2",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

const NavigationMenu: React.FC<{ className?: string; onLinkClick?: () => void }> = ({ 
  className,
  onLinkClick
}) => {
  return (
    <nav className={cn("flex gap-1", className)}>
      <NavigationLink to="/" onClick={onLinkClick}>
        Home
      </NavigationLink>
      <NavigationLink to="/tours" onClick={onLinkClick}>
        Tours
      </NavigationLink>
      <NavigationLink to="/accommodations" onClick={onLinkClick}>
        Hospedagem
      </NavigationLink>
      <NavigationLink to="/packages" onClick={onLinkClick}>
        Pacotes
      </NavigationLink>
      <NavigationLink to="/events" onClick={onLinkClick}>
        Eventos
      </NavigationLink>
      <NavigationLink to="/restaurantes" onClick={onLinkClick}>
        Restaurantes
      </NavigationLink>
      <NavigationLink to="/map" onClick={onLinkClick}>
        Mapa
      </NavigationLink>
      <NavigationLink to="/store" onClick={onLinkClick}>
        Loja
      </NavigationLink>
      <NavigationLink to="/about" onClick={onLinkClick}>
        Sobre
      </NavigationLink>
    </nav>
  );
};

export default NavigationMenu;
