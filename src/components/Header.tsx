
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

// Use custom hook to detect scroll position
const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);
  
  return scrollPosition;
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollPosition = useScrollPosition();
  const location = useLocation();
  
  // Determine if we're on the homepage
  const isHomePage = location.pathname === "/";
  
  // Apply transparent header on home page when at the top
  const isTransparent = isHomePage && scrollPosition < 50;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isTransparent
          ? "bg-transparent text-white"
          : "bg-white/90 backdrop-blur-md text-gray-900 shadow-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold font-serif tracking-tighter"
          >
            Tuca Noronha
          </Link>

          {/* Desktop Navigation */}
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
            <Link
              to="/reservar"
              className={`px-4 py-2 rounded-full bg-tuca-coral text-white hover:bg-tuca-coral/90 transition-colors ${
                location.pathname.includes("/reservar") ? "font-medium" : ""
              }`}
            >
              Reservar
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white text-gray-900 shadow-lg p-4 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              className="px-4 py-2 rounded hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/passeios"
              className="px-4 py-2 rounded hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Passeios
            </Link>
            <Link
              to="/hospedagens"
              className="px-4 py-2 rounded hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Hospedagens
            </Link>
            <Link
              to="/pacotes"
              className="px-4 py-2 rounded hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Pacotes
            </Link>
            <Link
              to="/sobre"
              className="px-4 py-2 rounded hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link
              to="/contato"
              className="px-4 py-2 rounded hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
            <Link
              to="/reservar"
              className="px-4 py-2 bg-tuca-coral text-white rounded-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Reservar
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
