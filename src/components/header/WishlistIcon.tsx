
import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";

interface WishlistIconProps {
  isTransparent: boolean;
}

const WishlistIcon = ({ isTransparent }: WishlistIconProps) => {
  const { wishlistItems } = useWishlist();
  
  return (
    <Link 
      to="/lista-de-desejos"
      className={`relative hover:opacity-75 transition-opacity ${
        isTransparent ? "text-white" : "text-gray-900"
      }`}
    >
      <Heart className="h-6 w-6" />
      {wishlistItems.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-tuca-ocean-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {wishlistItems.length}
        </span>
      )}
    </Link>
  );
};

export default WishlistIcon;
