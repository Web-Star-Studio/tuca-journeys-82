
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
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
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className={`text-xl font-medium tracking-tight transition-colors duration-300 ${isScrolled ? 'text-tuca-deep-blue' : 'text-white'}`}>
              Tuca Noronha
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/pacotes" 
              className={`text-sm font-medium transition-colors duration-300 link-hover ${isScrolled ? 'text-foreground' : 'text-white'}`}
            >
              Pacotes
            </Link>
            <Link 
              to="/passeios" 
              className={`text-sm font-medium transition-colors duration-300 link-hover ${isScrolled ? 'text-foreground' : 'text-white'}`}
            >
              Passeios
            </Link>
            <Link 
              to="/hospedagens" 
              className={`text-sm font-medium transition-colors duration-300 link-hover ${isScrolled ? 'text-foreground' : 'text-white'}`}
            >
              Hospedagens
            </Link>
            <Link 
              to="/loja" 
              className={`text-sm font-medium transition-colors duration-300 link-hover ${isScrolled ? 'text-foreground' : 'text-white'}`}
            >
              Loja
            </Link>
            <Link 
              to="/sobre" 
              className={`text-sm font-medium transition-colors duration-300 link-hover ${isScrolled ? 'text-foreground' : 'text-white'}`}
            >
              Sobre
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/carrinho">
              <Button variant="ghost" size="icon" className={`rounded-full ${isScrolled ? 'text-foreground' : 'text-white'}`}>
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/reservar">
              <Button className="rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-0 shadow-sm">
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
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-20 animate-slide-up">
          <nav className="flex flex-col p-6 space-y-6">
            <Link
              to="/pacotes"
              className="text-lg font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pacotes
            </Link>
            <Link
              to="/passeios"
              className="text-lg font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Passeios
            </Link>
            <Link
              to="/hospedagens"
              className="text-lg font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hospedagens
            </Link>
            <Link
              to="/loja"
              className="text-lg font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Loja
            </Link>
            <Link
              to="/sobre"
              className="text-lg font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link
              to="/contato"
              className="text-lg font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contato
            </Link>
            <div className="pt-6 flex items-center space-x-4">
              <Link to="/carrinho" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Carrinho
              </Link>
            </div>
            <Link to="/reservar" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="mt-4 w-full rounded-full bg-tuca-ocean-blue text-white">
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
