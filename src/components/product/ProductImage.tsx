
import React, { useState } from 'react';
import { Product } from '@/types/product';

interface ProductImageProps {
  product: Product;
}

const ProductImage: React.FC<ProductImageProps> = ({ product }) => {
  const [mainImage, setMainImage] = useState(product.image_url);
  
  // Combine main image with gallery images
  const allImages = [
    product.image_url,
    ...(product.gallery || [])
  ];
  
  return (
    <div className="space-y-4">
      <div className="aspect-square overflow-hidden rounded-lg border">
        <img 
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.jpg";
          }}
        />
      </div>
      
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {allImages.map((image, index) => (
            <button 
              key={index}
              className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${
                image === mainImage ? 'border-tuca-ocean-blue' : 'border-gray-200'
              }`}
              onClick={() => setMainImage(image)}
            >
              <img 
                src={image} 
                alt={`${product.name} - imagem ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.jpg";
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImage;
