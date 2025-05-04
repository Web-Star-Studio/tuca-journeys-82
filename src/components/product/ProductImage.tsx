
import React from "react";
import SafeImage from "@/components/ui/safe-image";

interface ProductImageProps {
  image: string;
  name: string;
  className?: string;
}

const ProductImage = ({ image, name, className = "" }: ProductImageProps) => {
  return (
    <div className={`rounded-xl overflow-hidden bg-gray-100 ${className}`}>
      <SafeImage 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover"
        fallbackSrc="/placeholder.svg"
      />
    </div>
  );
};

export default ProductImage;
