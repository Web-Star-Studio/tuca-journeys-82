
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Home, Compass, Hotel, Package, ShoppingBag, Calendar, Users, Info, Phone, Heart, Map, X } from "lucide-react";
import AuthButtons from "../user-menu/AuthButtons";
import { useAuth } from "@/contexts/AuthContext";
import { SheetClose } from "../ui/sheet";

interface NavigationMenuProps {
  onClose: () => void;
}

const NavigationMenu = ({ onClose }: NavigationMenuProps) => {
  const location = useLocation();
  const { user } = useAuth();
  
  const navigationItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/passeios", label: "Passeios", icon: Compass },
    { path: "/hospedagens", label: "Hospedagens", icon: Hotel },
    { path: "/pacotes", label: "Pacotes", icon: Package },
    { path: "/loja", label: "Loja", icon: ShoppingBag },
    { path: "/eventos", label: "Eventos", icon: Calendar },
    { path: "/mapa", label: "Mapa", icon: Map },
    { path: "/parceiros", label: "Parceiros", icon: Users },
    { path: "/sobre", label: "Sobre", icon: Info },
    { path: "/contato", label: "Contato", icon: Phone },
  ];
  
  return (
    <nav className="flex flex-col h-full">
      <div className="px-4 pb-4 flex justify-end">
        <SheetClose className="rounded-full p-2 hover:bg-gray-100">
          <X className="h-5 w-5" />
        </SheetClose>
      </div>
      
      <div className="flex flex-col space-y-1 px-2 overflow-y-auto flex-grow">
        {navigationItems.map((item) => {
          const isActive = item.path === "/"
            ? location.pathname === "/"
            : location.pathname.includes(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? "bg-tuca-light-blue text-tuca-ocean-blue font-medium" 
                  : "hover:bg-gray-100"
              }`}
              onClick={onClose}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span>{item.label}</span>
            </Link>
          );
        })}
        
        <Link
          to="/lista-de-desejos"
          className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
            location.pathname.includes("/lista-de-desejos") 
              ? "bg-tuca-light-blue text-tuca-ocean-blue font-medium" 
              : "hover:bg-gray-100"
          }`}
          onClick={onClose}
        >
          <Heart className="h-5 w-5 mr-3" />
          <span>Lista de Desejos</span>
        </Link>
      </div>
      
      <div className="mt-auto border-t pt-6 px-4 mb-4">
        <Link
          to="/reservar"
          className="w-full flex items-center justify-center px-4 py-3 bg-tuca-ocean-blue text-white rounded-lg hover:bg-tuca-deep-blue transition-colors"
          onClick={onClose}
        >
          Reservar
        </Link>
        
        {!user && (
          <div className="mt-4">
            <AuthButtons />
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationMenu;
