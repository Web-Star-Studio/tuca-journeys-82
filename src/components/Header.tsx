import React, { useState, useEffect } from "react";
import { Link, NavLink as RouterNavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useWindowScroll } from "usehooks-ts";
import { Menu, X } from "lucide-react";

interface NavLinkProps {
  to: string;
  isScrolled: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, isScrolled, children }) => {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "text-sm font-medium transition-colors hover:text-gray-500",
          isScrolled ? "text-gray-900" : "text-gray-50",
          isActive && "text-tuca-ocean-blue"
        )
      }
    >
      {children}
    </RouterNavLink>
  );
};

interface MobileNavLinkProps {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, onClick, children }) => {
  return (
    <RouterNavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "block py-2 text-base font-medium transition-colors hover:text-gray-500",
          "text-gray-900",
          isActive && "text-tuca-ocean-blue"
        )
      }
    >
      {children}
    </RouterNavLink>
  );
};

interface LogoProps {
  isScrolled: boolean;
}

const Logo: React.FC<LogoProps> = ({ isScrolled }) => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="font-bold text-xl md:text-2xl text-tuca-ocean-blue">
        Tuca
      </span>
      <span className={cn("font-semibold text-xl md:text-2xl", isScrolled ? "text-gray-900" : "text-gray-50")}>
        Noronha
      </span>
    </Link>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { y } = useWindowScroll();
  const isScrolled = y > 0;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent",
      isMenuOpen ? "bg-white" : ""
    )}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Logo isScrolled={isScrolled} />
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/" isScrolled={isScrolled}>Início</NavLink>
            <NavLink to="/sobre" isScrolled={isScrolled}>Sobre</NavLink>
            <NavLink to="/pacotes" isScrolled={isScrolled}>Pacotes</NavLink>
            <NavLink to="/passeios" isScrolled={isScrolled}>Passeios</NavLink>
            <NavLink to="/hospedagens" isScrolled={isScrolled}>Hospedagens</NavLink>
            <NavLink to="/contato" isScrolled={isScrolled}>Contato</NavLink>
            <NavLink to="/reservar" isScrolled={isScrolled}>Reservar</NavLink>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-900" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-3">
              <MobileNavLink to="/" onClick={closeMenu}>Início</MobileNavLink>
              <MobileNavLink to="/sobre" onClick={closeMenu}>Sobre</MobileNavLink>
              <MobileNavLink to="/pacotes" onClick={closeMenu}>Pacotes</MobileNavLink>
              <MobileNavLink to="/passeios" onClick={closeMenu}>Passeios</MobileNavLink>
              <MobileNavLink to="/hospedagens" onClick={closeMenu}>Hospedagens</MobileNavLink>
              <MobileNavLink to="/contato" onClick={closeMenu}>Contato</MobileNavLink>
              <MobileNavLink to="/reservar" onClick={closeMenu}>Reservar</MobileNavLink>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
