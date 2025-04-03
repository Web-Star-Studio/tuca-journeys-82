
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import UserMenu from "./UserMenu";
import DesktopNavigation from "./header/DesktopNavigation";
import MobileNavigation from "./header/MobileNavigation";
import Logo from "./header/Logo";
import WishlistIcon from "./header/WishlistIcon";
import { useScrollPosition } from "./header/useScrollPosition";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollPosition } = useScrollPosition(); // Destructure to get just the scrollPosition
  const location = useLocation();
  
  // Determine if we're on the homepage
  const isHomePage = location.pathname === "/";
  
  // Apply transparent header on home page when at the top, but account for the NewsLine height
  const isTransparent = isHomePage && scrollPosition < 50;

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 mt-7 ${
        isTransparent
          ? "bg-transparent text-white"
          : "bg-white/90 backdrop-blur-md text-gray-900 shadow-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <DesktopNavigation />

          {/* User Menu and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <WishlistIcon isTransparent={isTransparent} />
            
            <UserMenu />
            
            <button
              className="md:hidden focus:outline-none"
              onClick={handleMenuToggle}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation isOpen={isMenuOpen} onClose={handleCloseMenu} />
    </header>
  );
};

export default Header;
