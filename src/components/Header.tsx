
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useUI } from '@/contexts/UIContext';
import { ShoppingCart, Heart, User, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet"

const navigationLinks = [
  { name: 'Home', href: '/' },
  { name: 'Atividades', href: '/atividades' },
  { name: 'Eventos', href: '/eventos' },
  { name: 'Restaurantes', href: '/restaurantes' },
  { name: 'Acomodações', href: '/acomodacoes' },
  { name: 'Sobre', href: '/sobre' },
  { name: 'Contato', href: '/contato' },
];

const Header = () => {
  const { user, signOut } = useAuth();
  const { wishlist } = useWishlist();
  const { isCartOpen, toggleCart, isWishlistOpen, toggleWishlist } = useUI();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-tuca-ocean-blue">
          Lovable
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navigationLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) =>
                isActive
                  ? 'text-tuca-ocean-blue font-medium'
                  : 'text-gray-700 hover:text-tuca-ocean-blue transition-colors'
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleWishlist}
            className="relative hover:text-tuca-ocean-blue transition-colors"
            aria-label="Abrir lista de desejos"
          >
            <Heart className="h-6 w-6" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-tuca-coral text-white text-xs rounded-full px-2 py-0">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            onClick={toggleCart}
            className="relative hover:text-tuca-ocean-blue transition-colors"
            aria-label="Abrir carrinho de compras"
          >
            <ShoppingCart className="h-6 w-6" />
          </button>

          {user ? (
            <div className="relative group">
              <button className="flex items-center hover:text-tuca-ocean-blue transition-colors">
                <User className="h-6 w-6" />
                <span className="ml-2 hidden md:inline-block">{user.user_metadata?.name}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-md hidden group-hover:block">
                <Link to="/perfil" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                  Meu Perfil
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Sair
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="text-gray-700 hover:text-tuca-ocean-blue transition-colors hidden md:inline-block">
              Entrar
            </Link>
          )}

          {/* Mobile menu button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="sm:w-2/3 md:w-1/2 lg:w-1/3">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Explore o Lovable e planeje sua viagem
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                {navigationLinks.map((link) => (
                  <Link key={link.name} to={link.href} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                    {link.name}
                  </Link>
                ))}
                {user ? (
                  <>
                    <Link to="/perfil" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                      Meu Perfil
                    </Link>
                    <Button variant="outline" onClick={() => signOut()}>Sair</Button>
                  </>
                ) : (
                  <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                    Entrar
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
