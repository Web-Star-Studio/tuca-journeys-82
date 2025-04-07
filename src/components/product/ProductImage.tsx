
import React from "react";

interface ProductImageProps {
  image: string;
  name: string;
}

const ProductImage = ({ image, name }: ProductImageProps) => {
  return (
    <div className="rounded-xl overflow-hidden bg-gray-100">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default ProductImage;
