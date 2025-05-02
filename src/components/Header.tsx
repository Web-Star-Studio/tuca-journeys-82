
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import UserMenu from "./UserMenu";
import Logo from "./header/Logo";
import WishlistIcon from "./header/WishlistIcon";
import { useScrollPosition } from "./header/useScrollPosition";
import NavigationMenu from "./header/NavigationMenu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "./ui/sheet";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollPosition } = useScrollPosition();
  const location = useLocation();
  
  // Determine if we're on the homepage
  const isHomePage = location.pathname === "/";
  
  // Apply transparent header on home page when at the top
  const isTransparent = isHomePage && scrollPosition < 30;

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

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
          <Logo />

          {/* User Menu and Burger Menu Button */}
          <div className="flex items-center space-x-4">
            <WishlistIcon isTransparent={isTransparent} />
            
            <UserMenu />
            
            <Sheet open={isOpen} onOpenChange={handleOpenChange}>
              <SheetTrigger asChild>
                <button
                  className="focus:outline-none flex items-center justify-center"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] py-6 px-0">
                <NavigationMenu onLinkClick={() => setIsOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
