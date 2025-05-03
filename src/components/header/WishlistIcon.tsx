
import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "@/contexts/WishlistContext";
import { Heart } from "lucide-react";

interface WishlistIconProps {
  isTransparent: boolean;
}

const WishlistIcon = ({ isTransparent }: WishlistIconProps) => {
  const { wishlist } = useWishlist();
  const hasItems = wishlist.length > 0;

  return (
    <Link
      to="/lista-de-desejos"
      className="relative flex items-center justify-center"
      aria-label="Lista de Desejos"
    >
      <Heart
        className={`h-6 w-6 ${
          isTransparent ? "text-white hover:text-white/80" : "text-gray-800 hover:text-gray-600"
        } transition-colors`}
      />
      {hasItems && (
        <span
          className={`absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center rounded-full bg-tuca-coral text-white text-xs font-medium`}
        >
          {wishlist.length}
        </span>
      )}
    </Link>
  );
};

export default WishlistIcon;
