
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className={`font-serif text-2xl font-bold ${isScrolled ? 'text-tuca-deep-blue' : 'text-white'}`}>
            Tuca Noronha
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/pacotes" 
            className={`font-medium hover:text-tuca-ocean-blue transition-colors ${isScrolled ? 'text-foreground' : 'text-white'}`}
          >
            Pacotes
          </Link>
          <Link 
            to="/passeios" 
            className={`font-medium hover:text-tuca-ocean-blue transition-colors ${isScrolled ? 'text-foreground' : 'text-white'}`}
          >
            Passeios
          </Link>
          <Link 
            to="/hospedagens" 
            className={`font-medium hover:text-tuca-ocean-blue transition-colors ${isScrolled ? 'text-foreground' : 'text-white'}`}
          >
            Hospedagens
          </Link>
          <Link 
            to="/loja" 
            className={`font-medium hover:text-tuca-ocean-blue transition-colors ${isScrolled ? 'text-foreground' : 'text-white'}`}
          >
            Loja
          </Link>
          <Link 
            to="/sobre" 
            className={`font-medium hover:text-tuca-ocean-blue transition-colors ${isScrolled ? 'text-foreground' : 'text-white'}`}
          >
            Sobre
          </Link>
          <Link 
            to="/contato" 
            className={`font-medium hover:text-tuca-ocean-blue transition-colors ${isScrolled ? 'text-foreground' : 'text-white'}`}
          >
            Contato
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/carrinho">
            <Button variant="ghost" size="icon" className={isScrolled ? 'text-foreground' : 'text-white'}>
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/reservar">
            <Button className="bg-tuca-coral hover:bg-tuca-coral/90 text-white">
              Reserve Agora
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={`h-6 w-6 ${isScrolled ? 'text-foreground' : 'text-white'}`} />
          ) : (
            <Menu className={`h-6 w-6 ${isScrolled ? 'text-foreground' : 'text-white'}`} />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white pt-16">
          <nav className="flex flex-col p-4 space-y-4">
            <Link
              to="/pacotes"
              className="text-lg font-medium py-2 border-b border-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pacotes
            </Link>
            <Link
              to="/passeios"
              className="text-lg font-medium py-2 border-b border-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Passeios
            </Link>
            <Link
              to="/hospedagens"
              className="text-lg font-medium py-2 border-b border-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hospedagens
            </Link>
            <Link
              to="/loja"
              className="text-lg font-medium py-2 border-b border-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Loja
            </Link>
            <Link
              to="/sobre"
              className="text-lg font-medium py-2 border-b border-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link
              to="/contato"
              className="text-lg font-medium py-2 border-b border-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contato
            </Link>
            <Link to="/carrinho" className="flex items-center py-2">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Carrinho
            </Link>
            <Link to="/reservar" className="mt-4">
              <Button className="w-full bg-tuca-coral hover:bg-tuca-coral/90 text-white">
                Reserve Agora
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
